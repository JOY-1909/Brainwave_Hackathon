import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, User, GraduationCap, Briefcase, Cpu, PartyPopper, Sparkles, Folder, Award, Eye, EyeOff, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalDetails } from './steps/PersonalDetails';
import { Education } from './steps/Education';
import { Experience } from './steps/Experience';
import { Projects } from './steps/Projects';
import { Certifications } from './steps/Certifications';
import { Skills } from './steps/Skills';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { ResumePreview } from '@/components/Resume/ResumePreview';
import { exportResumeToPDF } from '@/lib/resume-export';
import { toast } from 'sonner';

const STEPS = [
  { id: 1, title: 'Personal Details', component: PersonalDetails, icon: User },
  { id: 2, title: 'Education', component: Education, icon: GraduationCap },
  { id: 3, title: 'Experience', component: Experience, icon: Briefcase },
  { id: 4, title: 'Projects', component: Projects, icon: Folder },
  { id: 5, title: 'Certifications', component: Certifications, icon: Award },
  { id: 6, title: 'Skills', component: Skills, icon: Cpu },
];

export const MultiStepForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const { data, updateData } = useOnboarding();
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const editMode = location.state?.editMode;
  const initialProfileData = location.state?.profileData;

  // Initialize data for Edit Mode
  useEffect(() => {
    if (editMode && initialProfileData) {
      // Deep merge or ensure types match. For now, assuming structure matches.
      updateData(initialProfileData);
    }
  }, []);

  const CurrentComponent = STEPS.find(s => s.id === currentStep)?.component || PersonalDetails;
  const isLastStep = currentStep === STEPS.length;

  // Auto-scale logic
  useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        const { clientWidth, clientHeight } = previewContainerRef.current;
        const targetWidth = 794 + 80;
        const targetHeight = 1123 + 80;
        const scaleX = clientWidth / targetWidth;
        const scaleY = clientHeight / targetHeight;
        const newScale = Math.min(Math.min(scaleX, scaleY), 1.1);
        setScale(newScale);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    const timer = setTimeout(handleResize, 100);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [showPreview]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
    const formContainer = document.getElementById('form-scroll-container');
    if (formContainer) formContainer.scrollTop = 0;
  }, [currentStep]);

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    try {
      const result = await exportResumeToPDF(data, `${data.personalInfo.fullName || 'resume'}.pdf`);
      if (result.success) {
        toast.success("Resume downloaded successfully!");
      } else {
        toast.error("Failed to generate PDF");
      }
    } catch (error) {
      toast.error("Failed to download resume");
    } finally {
      setIsExporting(false);
    }
  };

  const handleNext = async () => {
    // Validation Logic (Simulated for brevity, keeping existing flow)
    if (currentStep === 1) {
      const { email, phone, age, linkedin, github, portfolio } = data.personalInfo;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Please enter a valid email address"); return; }
      if (!phone || !/^\d{10,15}$/.test(phone.replace(/[^0-9]/g, ''))) { toast.error("Please enter a valid phone number (10-15 digits)"); return; }
      if (!age) { toast.error("Please enter your age"); return; }
      const ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 18) { toast.error("You must be 18 or older to proceed."); return; }

      const isValidUrl = (url?: string) => {
        if (!url) return true;
        try { new URL(url.startsWith('http') ? url : `https://${url}`); return true; } catch { return false; }
      };
      if (!isValidUrl(linkedin)) { toast.error("Invalid LinkedIn URL"); return; }
      if (!isValidUrl(github)) { toast.error("Invalid GitHub URL"); return; }
      if (!isValidUrl(portfolio)) { toast.error("Invalid Portfolio URL"); return; }
    }

    if (currentStep === 2) {
      const hasInvalidYear = data.education.some(edu => !/^\d{4}$/.test(edu.year));
      if (hasInvalidYear) { toast.error("Please enter a valid 4-digit year for education"); return; }
    }

    if (isLastStep) {
      setIsExporting(true);
      try {
        // Only generate PDF if NOT in Edit Mode
        if (!editMode) {
          const result = await exportResumeToPDF(data, `${data.personalInfo.fullName || 'resume'}.pdf`);
          if (!result.success) {
            toast.error("Failed to generate resume PDF");
            setIsExporting(false);
            return;
          }
        }

        try {
          const token = localStorage.getItem('authToken');
          if (token) {
            const { completeOnboarding, saveJobSeekerProfile } = await import('@/lib/auth-api');
            await saveJobSeekerProfile(token, data);

            // Only mark complete if not already editing
            if (!editMode) {
              await completeOnboarding(token);
            }
          }
        } catch (error) {
          console.error('Failed to save profile', error);
          toast.error("Failed to save profile data");
          setIsExporting(false);
          return;
        }

        if (editMode) {
          toast.success("Profile updated successfully!");
          navigate('/dashboard');
        } else {
          setShowSuccess(true);
          toast.success("Profile created successfully!", { icon: <PartyPopper className="w-5 h-5" /> });
          setTimeout(() => navigate('/dashboard'), 3000);
        }

      } catch (error) {
        console.error('Submission error:', error);
        toast.error("An error occurred");
      } finally {
        setIsExporting(false);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(editMode ? '/dashboard' : '/onboarding');
    }
  };

  if (showSuccess) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FAFAFA] dark:bg-slate-950">
        <div className="text-center animate-in fade-in zoom-in duration-500 max-w-lg px-6">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-500/20">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">You're All Set!</h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 mb-8">
            We've created your profile and downloaded your resume. Redirecting you to the dashboard...
          </p>
          <div className="h-1 w-32 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full w-full bg-green-500 animate-progress origin-left" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-white dark:bg-slate-950 flex flex-col xl:flex-row overflow-hidden font-sans">
      <div className="flex-1 flex flex-col h-full relative z-10 bg-white dark:bg-slate-950 shadow-xl xl:shadow-none xl:border-r border-slate-200 dark:border-slate-800">
        <div className="flex-none px-6 py-6 border-b border-slate-100 dark:border-slate-900 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(editMode ? '/dashboard' : '/onboarding')} className="rounded-full hover:bg-slate-100 -ml-2">
              <ChevronLeft className="w-5 h-5 text-slate-500" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {editMode ? `Edit ${STEPS[currentStep - 1].title}` : STEPS[currentStep - 1].title}
              </h1>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Step {currentStep} of {STEPS.length}
              </p>
            </div>
          </div>
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-100 dark:text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
              <path className="text-primary transition-all duration-500 ease-out" strokeDasharray={`${((currentStep) / STEPS.length) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <span className="absolute text-[10px] font-bold text-primary">{Math.round((currentStep / STEPS.length) * 100)}%</span>
          </div>
        </div>

        <div id="form-scroll-container" className="flex-1 overflow-y-auto px-6 py-8 xl:px-12 xl:py-10 custom-scrollbar">
          <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <CurrentComponent />
          </div>
        </div>

        <div className="flex-none px-6 py-4 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 flex justify-between items-center z-20">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1} className="text-slate-500 hover:text-slate-900">
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDownloadPDF} disabled={isExporting} className="hidden md:flex rounded-full border-slate-200">
              <Download className="w-4 h-4 mr-2" /> PDF
            </Button>
            <Button onClick={handleNext} disabled={isExporting} className="rounded-full px-8 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 shadow-lg shadow-black/5">
              {isExporting ? 'Saving...' : isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>

      <div className={`${showPreview ? 'flex' : 'hidden xl:flex'} fixed inset-0 z-50 bg-slate-100 dark:bg-black/90 xl:relative xl:z-0 xl:flex-1 xl:bg-[#F3F4F6] dark:xl:bg-black/50 flex-col items-center justify-center overflow-hidden transition-all duration-300`}>
        <button onClick={() => setShowPreview(false)} className="xl:hidden absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg z-50 text-slate-500">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </button>
        <div className="absolute top-6 right-6 z-20 hidden xmlns:xl:block xl:block">
          <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur shadow-sm hover:bg-white text-slate-600 rounded-full" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>
        <div ref={previewContainerRef} className="w-full h-full flex items-center justify-center p-8 lg:p-12 relative">
          <div className="shadow-2xl shadow-slate-300/50 dark:shadow-black/50 bg-white origin-center transition-transform duration-300 ease-out" style={{ transform: `scale(${scale})` }}>
            <ResumePreview data={data} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 right-6 xl:hidden z-40">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-2xl bg-slate-900 text-white hover:bg-slate-800" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
        </Button>
      </div>
    </div>
  );
};
