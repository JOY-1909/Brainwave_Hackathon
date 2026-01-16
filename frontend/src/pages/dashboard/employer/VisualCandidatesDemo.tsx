import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  MoreHorizontal,
  Download,
  MessageSquare,
  Calendar,
  Eye,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';

// Mock Data
const JOB_DETAILS = {
  title: "Senior Product Designer",
  department: "Design Team",
  location: "Remote / Bengaluru",
  type: "Full-time",
  salary: "₹25L - ₹35L / year",
  posted: "2 days ago",
  applicants: 48,
  avgMatch: 82,
  topSkills: ["Figma", "Design Systems", "Prototyping", "User Research"]
};

// Mock data for graphs
const APPLICANT_TRENDS = [
  { day: 'Mon', applicants: 4 },
  { day: 'Tue', applicants: 7 },
  { day: 'Wed', applicants: 12 },
  { day: 'Thu', applicants: 8 },
  { day: 'Fri', applicants: 15 },
  { day: 'Sat', applicants: 5 },
  { day: 'Sun', applicants: 3 },
];

const MATCH_DISTRIBUTION = [
  { range: '90-100%', count: 5 },
  { range: '80-89%', count: 12 },
  { range: '70-79%', count: 18 },
  { range: '60-69%', count: 8 },
  { range: '<60%', count: 5 },
];

const CANDIDATES = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Designer",
    experience: "5 years",
    matchScore: 94,
    avatar: "https://i.pravatar.cc/150?u=sarah",
    skills: ["Figma", "React", "UI/UX", "Motion"],
    status: "Top Match",
    applied: "2 hours ago",
    badges: ["Portfolio Star", "Ex-Google"],
    phone: "+91 98765 43210",
    email: "sarah.chen@example.com",
    about: "Passionate product designer with 5 years of experience building accessible and inclusive digital experiences. Previously at Google.",
    resumeUrl: "/path/to/resume.pdf",
    matchDetails: {
      skills: 98,
      experience: 90,
      roleFit: 94,
      radarData: [
        { subject: 'Skills', A: 98, fullMark: 100 },
        { subject: 'Exp', A: 90, fullMark: 100 },
        { subject: 'Role Fit', A: 94, fullMark: 100 },
        { subject: 'Culture', A: 85, fullMark: 100 },
        { subject: 'Comm', A: 92, fullMark: 100 },
      ]
    }
  },
  {
    id: 2,
    name: "Alex Kumar",
    role: "Senior UX Designer",
    experience: "7 years",
    matchScore: 89,
    avatar: "https://i.pravatar.cc/150?u=alex",
    skills: ["Sketch", "Figma", "User Testing"],
    status: "Good Match",
    applied: "1 day ago",
    badges: ["Research Expert"],
    phone: "+91 98765 12345",
    email: "alex.k@example.com",
    about: "UX researcher and designer focused on data-driven design decisions. Expert in user testing and prototyping.",
    resumeUrl: "#",
    matchDetails: {
      skills: 85,
      experience: 95,
      roleFit: 87,
      radarData: [
        { subject: 'Skills', A: 85, fullMark: 100 },
        { subject: 'Exp', A: 95, fullMark: 100 },
        { subject: 'Role Fit', A: 87, fullMark: 100 },
        { subject: 'Culture', A: 80, fullMark: 100 },
        { subject: 'Comm', A: 88, fullMark: 100 },
      ]
    }
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "UI Engineer",
    experience: "4 years",
    matchScore: 82,
    avatar: "https://i.pravatar.cc/150?u=maria",
    skills: ["Figma", "HTML/CSS", "Design Systems"],
    status: "Review",
    applied: "3 days ago",
    badges: [],
    phone: "+91 98765 67890",
    email: "maria.g@example.com",
    about: "Hybrid UI Designer and Frontend Developer. I bridge the gap between design and engineering.",
    resumeUrl: "#",
    matchDetails: {
      skills: 88,
      experience: 75,
      roleFit: 83,
      radarData: [
        { subject: 'Skills', A: 88, fullMark: 100 },
        { subject: 'Exp', A: 75, fullMark: 100 },
        { subject: 'Role Fit', A: 83, fullMark: 100 },
        { subject: 'Culture', A: 90, fullMark: 100 },
        { subject: 'Comm', A: 75, fullMark: 100 },
      ]
    }
  },
  {
    id: 4,
    name: "John Doe",
    role: "Graphic Designer",
    experience: "3 years",
    matchScore: 65,
    avatar: "https://i.pravatar.cc/150?u=john",
    skills: ["Photoshop", "Illustrator"],
    status: "Screening",
    applied: "5 hours ago",
    badges: [],
    phone: "+91 98765 54321",
    email: "john.d@example.com",
    about: "Creative graphic designer with a passion for branding and visual identity.",
    resumeUrl: "#",
    matchDetails: {
      skills: 60,
      experience: 70,
      roleFit: 65,
      radarData: [
        { subject: 'Skills', A: 60, fullMark: 100 },
        { subject: 'Exp', A: 70, fullMark: 100 },
        { subject: 'Role Fit', A: 65, fullMark: 100 },
        { subject: 'Culture', A: 70, fullMark: 100 },
        { subject: 'Comm', A: 60, fullMark: 100 },
      ]
    }
  }
];

export const VisualCandidatesDemo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div 
      className="min-h-screen bg-background p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto animate-fade-in pb-20"
      style={{
        // @ts-ignore
        "--primary": "var(--employer)",
        "--primary-foreground": "0 0% 100%",
        "--ring": "var(--employer)",
      } as React.CSSProperties}
    >
      


      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
              Active Job
            </Badge>
            <span className="text-sm text-muted-foreground">Posted {JOB_DETAILS.posted}</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            {JOB_DETAILS.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> {JOB_DETAILS.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> {JOB_DETAILS.department}
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" /> {JOB_DETAILS.salary}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="employer" className="gap-2">
            <Download className="w-4 h-4" /> Export DB
          </Button>
          <Button 
            variant="outline"
            className="gap-2"
            onClick={() => navigate('/dashboard/employer/postings')}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
        </div>
      </div>

      {/* Stats Cards & Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats Cards */}
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Total Applicants</p>
                    <h3 className="text-3xl font-display font-bold text-primary">{JOB_DETAILS.applicants}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                    </div>
                </CardContent>
                </Card>
                <Card>
                <CardContent className="p-6 flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Avg. Match Score</p>
                    <h3 className="text-3xl font-display font-bold text-green-600">{JOB_DETAILS.avgMatch}%</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-600" />
                    </div>
                </CardContent>
                </Card>
            </div>
            {/* Additional Stats Row */}
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">In Pipeline</p>
                        <h4 className="text-2xl font-bold text-orange-600">12</h4>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground">Interviews</p>
                        <h4 className="text-2xl font-bold text-blue-600">4</h4>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Middle Column: Match Distribution Chart */}
        <Card className="col-span-1 border-border">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Match Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={MATCH_DISTRIBUTION}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis dataKey="range" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                            />
                            <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>

        {/* Right Column: Applicant Trends */}
        <Card className="col-span-1 border-border">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Applicant Activity</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={APPLICANT_TRENDS}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                            <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px', border: 'none', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                            />
                            <Bar dataKey="applicants" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-6">
          <TabsTrigger value="all">All Candidates</TabsTrigger>
          <TabsTrigger value="top">Top Matches ({'>'}90%)</TabsTrigger>
          <TabsTrigger value="pipeline">In Pipeline</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CANDIDATES.map((candidate) => (
              <div 
                key={candidate.id} 
                className="group relative bg-card hover:bg-muted/30 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Match Score Indicator */}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`
                    flex flex-col items-center justify-center w-14 h-14 rounded-xl font-bold text-sm border-2 shadow-sm bg-card
                    ${candidate.matchScore >= 90 ? 'border-green-500 text-green-600' : 
                      candidate.matchScore >= 80 ? 'border-blue-500 text-blue-600' : 'border-orange-500 text-orange-600'}
                  `}>
                    <span>{candidate.matchScore}%</span>
                    <span className="text-[10px] uppercase font-normal text-muted-foreground">Match</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Avatar & Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <Avatar className="w-16 h-16 border-2 border-primary/10 shadow-md">
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="pt-1">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{candidate.role}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {candidate.experience} exp
                      </p>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {candidate.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground border border-border">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground border border-border">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Match Breakdown */}
                  <div className="space-y-3 mb-6 bg-muted/30 p-4 rounded-xl">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Skills Match</span>
                        <span className="font-medium">{candidate.matchDetails.skills}%</span>
                      </div>
                      <Progress value={candidate.matchDetails.skills} className="h-1.5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Role Fit</span>
                        <span className="font-medium">{candidate.matchDetails.roleFit}%</span>
                      </div>
                      <Progress value={candidate.matchDetails.roleFit} className="h-1.5" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full h-9 text-xs">
                      <MessageSquare className="w-3 h-3 mr-2" /> Message
                    </Button>
                    
                    {/* View Profile Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full h-9 text-xs bg-primary hover:bg-primary/90">
                                <Eye className="w-3 h-3 mr-2" /> View Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Candidate Profile</DialogTitle>
                                <DialogDescription>Detailed detailed analysis and resume.</DialogDescription>
                            </DialogHeader>

                            <div className="grid md:grid-cols-3 gap-6 mt-4">
                                {/* Left: Info */}
                                <div className="md:col-span-1 space-y-6">
                                    <div className="text-center">
                                        <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-muted">
                                            <AvatarImage src={candidate.avatar} />
                                            <AvatarFallback>{candidate.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <h2 className="text-xl font-bold">{candidate.name}</h2>
                                        <p className="text-primary font-medium">{candidate.role}</p>
                                    </div>
                                    
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <MapPin className="w-4 h-4" /> Mumbai, India
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Clock className="w-4 h-4" /> {candidate.experience} Experience
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <DollarSign className="w-4 h-4" /> ₹15L - ₹20L
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <h4 className="font-bold mb-2 text-sm">Contact</h4>
                                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                                        <p className="text-sm text-muted-foreground">{candidate.phone}</p>
                                    </div>

                                    <Button className="w-full gap-2" variant="outline" onClick={() => alert("Downloading resume...")}>
                                        <FileText className="w-4 h-4" /> Download Resume
                                    </Button>
                                </div>

                                {/* Right: Analysis */}
                                <div className="md:col-span-2 space-y-6">
                                    {/* Radar Chart */}
                                    <div className="bg-muted/30 p-6 rounded-xl border border-border flex flex-col items-center">
                                        <h4 className="font-bold mb-4 text-center w-full">Match Analysis Radar</h4>
                                        <div className="h-[250px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={candidate.matchDetails.radarData}>
                                                    <PolarGrid opacity={0.3} />
                                                    <PolarAngleAxis dataKey="subject" fontSize={12} />
                                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                                    <Radar
                                                        name="Candidate"
                                                        dataKey="A"
                                                        stroke="var(--primary)"
                                                        fill="var(--primary)"
                                                        fillOpacity={0.4}
                                                    />
                                                    <Tooltip />
                                                    <Legend />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-2">About</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {candidate.about}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-2">Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {candidate.skills.map(skill => (
                                                <Badge key={skill} variant="secondary">{skill}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        {/* Placeholder for other tabs */}
        <TabsContent value="top" className="text-center py-20 text-muted-foreground">
            Top matches view filtering logic here...
        </TabsContent>
      </Tabs>
      
    </div>
  );
};
