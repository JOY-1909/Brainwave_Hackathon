import { Request, Response } from 'express';
import Job, { JobStatus } from '../models/Job';
import { sendSuccess, sendError } from '../utils/response';
import mongoose from 'mongoose';
import { socketService } from '../services/socket.service';
import JobSeekerProfile from '../models/JobSeekerProfile';
import User from '../models/User';

export const applyToJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Job ID
        // @ts-ignore
        const userId = req.user?._id;

        // @ts-ignore
        if (!userId || req.user?.role !== 'JOB_SEEKER') {
            return sendError(res, 403, 'Only Job Seekers can apply', 'ACCESS_DENIED');
        }

        const job = await Job.findById(id);
        if (!job) return sendError(res, 404, 'Job not found');

        if (job.status !== JobStatus.PUBLISHED) {
            return sendError(res, 400, 'This job is no longer accepting applications');
        }

        const { resumeUrl } = req.body;

        // Check availability
        const alreadyApplied = job.candidates.some(c => c.userId.toString() === userId.toString());
        if (alreadyApplied) {
            return sendError(res, 400, 'You have already applied to this job');
        }

        // Add Candidate
        job.candidates.push({
            userId: userId as mongoose.Types.ObjectId,
            status: 'APPLIED',
            appliedAt: new Date(),
            resumeUrl: resumeUrl || undefined
        });

        await job.save();

        // Real-Time Notification to Employer
        socketService.emitToUser(job.employerId.toString(), 'new_application', {
            jobId: job._id,
            jobTitle: job.title,
            applicantName: req.user.name || "A Candidate"
        });

        return sendSuccess(res, { status: 'APPLIED' }, 'Application submitted successfully');

    } catch (error) {
        console.error('Apply Error:', error);
        return sendError(res, 500, 'Failed to apply');
    }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
    try {
        const { id, userId } = req.params; // Job ID, Candidate User ID
        const { status } = req.body; // New Status

        // Ensure Employer owns the job
        // @ts-ignore
        const job = await Job.findOne({ _id: id, employerId: req.user?._id });
        if (!job) return sendError(res, 404, 'Job not found or access denied');

        // Find candidate
        const candidate = job.candidates.find(c => c.userId.toString() === userId);
        if (!candidate) return sendError(res, 404, 'Candidate not found in this job');

        // Update Status
        candidate.status = status;
        await job.save();

        // Real-Time Notification to Job Seeker
        socketService.emitToUser(userId, 'application_status_updated', {
            jobId: job._id,
            jobTitle: job.title,
            status: status,
            company: (job as any).companyProfileId?.companyName || "Company" // Might need populate if not present, but usually companyId is ref
        });

        return sendSuccess(res, { status }, 'Status updated successfully');

    } catch (error) {
        console.error('Update Status Error:', error);
        return sendError(res, 500, 'Failed to update status');
    }
};

export const getMyApplications = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user?._id;

        // Find jobs where candidates array contains userId
        const jobs = await Job.find({
            'candidates.userId': userId
        })
            .select('title companyProfileId candidates location type salary status createdAt')
            .populate('companyProfileId', 'companyName logoUrl')
            .lean();

        // Map to friendlier format
        const applications = jobs.map(job => {
            // @ts-ignore
            const myCandidate = job.candidates.find(c => c.userId.toString() === userId.toString());
            return {
                jobId: job._id,
                title: job.title,
                // @ts-ignore
                company: job.companyProfileId?.companyName || 'Unknown',
                // @ts-ignore
                logo: job.companyProfileId?.logoUrl,
                location: job.location,
                type: job.type,
                salary: job.salary,
                appliedAt: myCandidate?.appliedAt,
                status: myCandidate?.status || 'APPLIED',
                jobStatus: job.status
            };
        });

        // Sort by applied date desc
        applications.sort((a, b) => new Date(b.appliedAt as Date).getTime() - new Date(a.appliedAt as Date).getTime());

        return sendSuccess(res, applications, 'Applications fetched successfully');

    } catch (error) {
        console.error('Get Applications Error:', error);
        return sendError(res, 500, 'Failed to fetch applications');
    }
};

export const getJobCandidates = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // Job ID
        const userId = req.user?._id;

        const job = await Job.findOne({ _id: id, employerId: userId });
        if (!job) return sendError(res, 404, 'Job not found or access denied');

        // Allow fetching detailed candidates
        // We need: Name (User), Skills/Exp (Profile), Status (Job.candidates)

        const candidateUserIds = job.candidates.map(c => c.userId);

        // Fetch Profiles
        const profiles = await JobSeekerProfile.find({ userId: { $in: candidateUserIds } })
            .select('userId personalInfo.fullName personalInfo.profilePicture professionalProfile.skills professionalProfile.experience');

        // Map candidates to result
        const candidates = job.candidates.map(candidate => {
            const profile = profiles.find((p: any) => p.userId.toString() === candidate.userId.toString());
            return {
                userId: candidate.userId,
                status: candidate.status,
                appliedAt: candidate.appliedAt,
                name: profile?.personalInfo?.fullName || 'Unknown Candidate',
                avatar: profile?.personalInfo?.profilePicture || '',
                skills: profile?.professionalProfile?.skills || [],
                experience: profile?.professionalProfile?.experience || 0, // Years?
                matchScore: 0 // Ideally calculate this dynamically
            };
        });

        return sendSuccess(res, candidates, 'Candidates fetched successfully');

    } catch (error) {
        console.error('Get Candidates Error:', error);
        return sendError(res, 500, 'Failed to fetch candidates');
    }
};
