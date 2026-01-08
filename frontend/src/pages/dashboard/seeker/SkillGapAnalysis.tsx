import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, BookOpen, ArrowRight, ArrowLeft, Loader2, Award, Zap } from "lucide-react";
import { analyzeSkillGap } from '@/lib/auth-api';
import { useToast } from "@/hooks/use-toast";

interface SkillGapResult {
  score: number;
  analysis: string;
  missingSkills: { name: string; category: string; importance: string }[];
  learningPath: { title: string; description: string; link: string }[];
}

export const SkillGapAnalysis = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);

  useEffect(() => {
    if (!jobId) {
      return;
    }

    setAnalyzing(true);
    const fetchData = async () => {
      try {
        // FIXED: Using 'authToken' instead of 'idToken'
        const token = localStorage.getItem('authToken') || localStorage.getItem('idToken');

        if (!token) {
          toast({ title: "Auth Error", description: "Please login first", variant: "destructive" });
          // Redirect to login if needed, or just show error
          return;
        }

        const data = await analyzeSkillGap(token, jobId);
        setResult(data);
      } catch (error) {
        console.error(error);
        toast({ title: "Analysis Failed", description: "AI could not process this request.", variant: "destructive" });
      } finally {
        setAnalyzing(false);
      }
    };

    fetchData();
  }, [jobId]);

  // Case 1: No Job Selected
  if (!jobId) {
    return (
      <div className="max-w-5xl mx-auto py-10 text-center space-y-6 animate-in fade-in">
        <div className="p-6 bg-primary/5 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
          <Zap className="w-12 h-12 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Skill Gap Analysis</h1>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Select a job to verify your skills against. Go to the Job Board or your Applications.
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/jobs')} className="gap-2">
          Browse Jobs
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Case 2: Loading
  if (analyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Loader2 className="w-16 h-16 animate-spin text-primary relative z-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Analyzing Your Profile with AI</h2>
          <p className="text-muted-foreground mt-2">Comparing your skills against the job requirements...</p>
        </div>
      </div>
    );
  }

  // Case 3: Error / No Result
  if (!result && !analyzing) {
    return (
      <div className="p-10 text-center">
        <p className="text-muted-foreground">No analysis data found.</p>
        <Button onClick={() => navigate(-1)} variant="outline" className="mt-4">Go Back</Button>
      </div>
    );
  }

  // Case 4: Success Result
  return (
    <div className="max-w-5xl mx-auto pb-10 space-y-8 animate-in fade-in duration-500">
      <div>
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 pl-0 hover:pl-2 transition-all gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold">Skill Gap Report</h1>
            <p className="text-muted-foreground">AI-Powered analysis of your fit for this role.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Match Score */}
        <Card className="md:col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <Award className="w-24 h-24" />
          </div>
          <CardHeader>
            <CardTitle>Match Score</CardTitle>
            <CardDescription>Based on resume analysis</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative flex items-center justify-center">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-background opacity-30" />
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="10"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * (result?.score || 0)) / 100}
                  className={`transition-all duration-1000 ease-out ${(result?.score || 0) > 70 ? 'text-green-500' : (result?.score || 0) > 40 ? 'text-yellow-500' : 'text-red-500'}`}
                />
              </svg>
              <span className="absolute text-4xl font-bold">{result?.score}%</span>
            </div>
            <p className="mt-6 text-center text-sm font-medium">
              {result?.analysis}
            </p>
          </CardContent>
        </Card>

        {/* Missing Skills */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Missing Skills Detected
            </CardTitle>
            <CardDescription>Mastering these will significantly boost your hiring chances.</CardDescription>
          </CardHeader>
          <CardContent>
            {result?.missingSkills.length === 0 ? (
              <div className="text-center py-10 text-green-600">
                <Award className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="font-bold">No major skill gaps detected!</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {result?.missingSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-destructive/70" />
                      <div>
                        <p className="font-bold">{skill.name}</p>
                        <p className="text-xs text-muted-foreground">{skill.category}</p>
                      </div>
                    </div>
                    <Badge variant={skill.importance === "High" ? "destructive" : "secondary"}>
                      {skill.importance} Priority
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Actions */}
      {result?.learningPath.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-8 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Recommended Learning Path
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.learningPath.map((item, idx) => (
              <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="hover:shadow-md transition-all cursor-pointer hover:border-primary/50 group h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {item.title}
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
