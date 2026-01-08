

import { MoreHorizontal, ExternalLink, Calendar, CheckCircle2, XCircle, Clock, Timer, ChevronRight, Briefcase, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMyApplications } from '@/lib/api/jobs';
import { useSocket } from '@/context/SocketContext';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'INTERVIEW': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    case 'SHORTLISTED': return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'REJECTED': return 'bg-red-500/10 text-red-600 border-red-500/20';
    case 'OFFER': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    default: return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'INTERVIEW': return <Calendar className="w-3.5 h-3.5 mr-1" />;
    case 'SHORTLISTED': return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
    case 'REJECTED': return <XCircle className="w-3.5 h-3.5 mr-1" />;
    case 'OFFER': return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
    default: return <Timer className="w-3.5 h-3.5 mr-1" />;
  }
};

export const Applications = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['my-applications'],
    queryFn: async () => {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("No token");
      return await fetchMyApplications(token);
    }
  });

  // Real-Time Listener
  useEffect(() => {
    if (!socket) return;

    const handleStatusUpdate = (data: any) => {
      console.log("Real-time Update:", data);
      toast({
        title: "Application Update!",
        description: `Your status for ${data.jobTitle} at ${data.company} is now ${data.status}`,
        variant: "default"
      });
      // Refresh Data
      queryClient.invalidateQueries({ queryKey: ['my-applications'] });
    };

    socket.on('application_status_updated', handleStatusUpdate);

    return () => {
      socket.off('application_status_updated', handleStatusUpdate);
    };
  }, [socket, queryClient, toast]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-[50vh]"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track the status of your job applications.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="p-4 font-semibold text-muted-foreground text-sm pl-6">Company & Role</th>
                <th className="p-4 font-semibold text-muted-foreground text-sm">Status</th>
                <th className="p-4 font-semibold text-muted-foreground text-sm">Applied Date</th>
                <th className="p-4 font-semibold text-muted-foreground text-sm">Location</th>
                <th className="p-4 font-semibold text-muted-foreground text-sm">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications?.map((app: any) => (
                <tr key={app.jobId} className="hover:bg-muted/30 transition-colors group">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white p-1 border border-border shadow-sm flex items-center justify-center">
                        {app.logo ? <img src={app.logo} alt={app.company} className="w-full h-full object-contain" /> : <Briefcase className="w-5 h-5 text-muted-foreground" />}
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{app.title}</div>
                        <div className="text-sm text-muted-foreground">{app.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      {app.status}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{app.location}</td>
                  <td className="p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => navigate(`/dashboard/applications/${app.jobId}`)}
                    >
                      View Status <ChevronRight className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {applications?.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No applications found. Start applying!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
