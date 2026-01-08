import { Search, Filter, MoreHorizontal, FileText, Mail, Loader2, CheckCircle2, XCircle, Calendar, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { fetchJobs, createJob } from '@/lib/auth-api';
import { fetchJobCandidates, updateApplicationStatus } from '@/lib/api/jobs';
import { useToast } from '@/hooks/use-toast';
import { useSocket } from '@/context/SocketContext';

export const Candidates = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [candidates, setCandidates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { socket } = useSocket();

  // Fetch Jobs on Mount
  useEffect(() => {
    const loadJobs = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        const data = await fetchJobs(token, 'PUBLISHED'); // Only published jobs
        setJobs(data);
        if (data.length > 0) {
          setSelectedJobId(data[0]._id); // Default to first job
        }
      }
    };
    loadJobs();
  }, []);

  // Fetch Candidates when Job Changes
  useEffect(() => {
    const loadCandidates = async () => {
      if (selectedJobId === 'all' || !selectedJobId) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const data = await fetchJobCandidates(selectedJobId, token);
          setCandidates(data);
        }
      } catch (error) {
        console.error(error);
        toast({ title: "Error", description: "Failed to load candidates", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    loadCandidates();
  }, [selectedJobId]);

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      await updateApplicationStatus(selectedJobId, userId, newStatus, token);

      // Optimistic Update
      setCandidates(prev => prev.map(c =>
        c.userId === userId ? { ...c, status: newStatus } : c
      ));

      toast({ title: "Updated", description: `Candidate status changed to ${newStatus}` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Candidates</h1>
          <p className="text-muted-foreground">Manage and track applicants.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex gap-4 bg-muted/20">
          <Select value={selectedJobId} onValueChange={setSelectedJobId}>
            <SelectTrigger className="w-[280px] bg-background">
              <SelectValue placeholder="Select Job" />
            </SelectTrigger>
            <SelectContent>
              {jobs.map(job => (
                <SelectItem key={job._id} value={job._id}>{job.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[300px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : candidates.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">No candidates found for this job.</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-4 font-semibold text-muted-foreground text-sm pl-6">Candidate</th>
                  <th className="p-4 font-semibold text-muted-foreground text-sm">Match</th>
                  <th className="p-4 font-semibold text-muted-foreground text-sm">Applied</th>
                  <th className="p-4 font-semibold text-muted-foreground text-sm">Stage</th>
                  <th className="p-4 font-semibold text-muted-foreground text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {candidates.map((candidate) => (
                  <tr key={candidate.userId} className="hover:bg-muted/30 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold overflow-hidden">
                          {candidate.avatar ? <img src={candidate.avatar} className="w-full h-full object-cover" /> : candidate.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">{candidate.experience} Years Exp</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20">
                        N/A% Match
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(candidate.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Select
                        defaultValue={candidate.status}
                        onValueChange={(val) => handleStatusChange(candidate.userId, val)}
                      >
                        <SelectTrigger className="h-8 w-[130px] text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="APPLIED">Applied</SelectItem>
                          <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                          <SelectItem value="INTERVIEW">Interview</SelectItem>
                          <SelectItem value="OFFER">Offer</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <Button variant="ghost" size="sm" className="justify-start h-7 text-xs" onClick={() => window.open(`/dashboard/candidate/${candidate.userId}`, '_blank')}>
                          <FileText className="w-3.5 h-3.5 mr-2 text-muted-foreground" /> View Profile
                        </Button>
                        {candidate.resumeUrl && (
                          <Button variant="ghost" size="sm" className="justify-start h-7 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => window.open(candidate.resumeUrl, '_blank')}>
                            <FileText className="w-3.5 h-3.5 mr-2" /> Custom Resume
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
