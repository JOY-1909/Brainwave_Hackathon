import { Users, Briefcase, BarChart3, Plus, Search, MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'Total Applications', value: '1,234', icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'Interviews Scheduled', value: '45', icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const ACTIVE_JOBS = [
  { id: 1, title: 'Senior Frontend Engineer', candidates: 145, status: 'Active', posted: '2 days ago' },
  { id: 2, title: 'Product Designer', candidates: 89, status: 'Active', posted: '4 days ago' },
  { id: 3, title: 'Backend Developer', candidates: 210, status: 'Closing Soon', posted: '1 week ago' },
];

const RECENT_CANDIDATES = [
  { id: 1, name: 'Rahul Sharma', role: 'Frontend Dev', match: 95, job: 'Senior Frontend Engineer', status: 'New' },
  { id: 2, name: 'Priya Patel', role: 'UI Designer', match: 88, job: 'Product Designer', status: 'Screening' },
  { id: 3, name: 'Amit Kumar', role: 'Backend Dev', match: 92, job: 'Backend Developer', status: 'Interview' },
];

export const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Employer');
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    interviews: 0
  });
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [recentCandidates, setRecentCandidates] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Dynamic Import to avoid cyclic dependency issues
          const { fetchProtectedData, fetchJobs, fetchEmployerDashboardStats } = await import('@/lib/auth-api');

          // 1. Fetch User Data
          const userData = await fetchProtectedData('/auth/me', token);
          if (userData) {
            setUserName(userData.name || userData.companyProfile?.companyName || 'Employer');
          }

          // 2. Fetch Dashboard Stats (Includes Recent Candidates & Counts)
          const dashboardData = await fetchEmployerDashboardStats(token);
          setStats(dashboardData.stats);
          setRecentCandidates(dashboardData.recentCandidates);

          // 3. Fetch Active Jobs (For the list)
          const jobs = await fetchJobs(token, 'PUBLISHED');
          setActiveJobs(jobs.slice(0, 3));

        }
      } catch (error) {
        console.error('Failed to load dashboard data', error);
      }
    };
    loadData();
  }, []);

  const STATS_DATA = [
    { label: 'Active Jobs', value: stats.activeJobs, icon: Briefcase, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Total Applications', value: stats.totalApplications, icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Interviews Scheduled', value: stats.interviews, icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">
            Welcome back, <span className="text-accent">{userName}</span>!
          </h1>
          <p className="text-muted-foreground">Manage your job postings and hiring pipeline.</p>
        </div>
        <Button variant="employer" className="gap-2 shadow-button" onClick={() => navigate('/dashboard/employer/post-job')}>
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS_DATA.map((stat) => (
          <div key={stat.label} className="bg-card border border-border p-6 rounded-2xl flex items-center gap-4 hover:shadow-card transition-shadow duration-300">
            <div className={`w-14 h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <h3 className="text-3xl font-display font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Jobs Table */}
        <div className="lg:col-span-2 bg-card border border-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="font-bold text-xl">Active Job Postings</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/employer/post-job')}>View All</Button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activeJobs.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No active jobs yet. Post one to get started!</p>
              ) : (
                activeJobs.map((job) => (
                  <div key={job._id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                    <div>
                      <h3 className="font-bold text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-600">
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xl font-bold">{job.candidates ? job.candidates.length : 0}</p>
                        <p className="text-xs text-muted-foreground uppercase">Applicants</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/employer/postings/${job._id}`)}>Manage</Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="font-bold text-xl">Top Candidates</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentCandidates.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No candidates yet.</p>
            ) : (
              recentCandidates.map((candidate) => (
                <div key={`${candidate.id}-${candidate.jobId}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden">
                      {candidate.avatar ? <img src={candidate.avatar} className="w-full h-full object-cover" /> : (candidate.name?.charAt(0) || 'U')}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">{candidate.name}</h4>
                      <p className="text-xs text-muted-foreground">{candidate.job}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase
                        ${candidate.status === 'APPLIED' ? 'bg-blue-500/10 text-blue-600' :
                        candidate.status === 'INTERVIEW' ? 'bg-purple-500/10 text-purple-600' : 'bg-gray-500/10 text-gray-600'}`}>
                      {candidate.status}
                    </span>
                    <div className="text-xs font-bold text-green-600 mt-1">{candidate.match}% Match</div>
                  </div>
                </div>
              ))
            )}
            {/* View All Details Button underneath if needed, or stick to list */}
            {recentCandidates.length > 0 && (
              <Button variant="ghost" className="w-full text-xs" onClick={() => navigate('/dashboard/employer/postings')}>
                View All Applications
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
