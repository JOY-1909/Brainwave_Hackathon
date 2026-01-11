import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FileUp, Keyboard, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OnboardingChoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredOption, setHoveredOption] = useState<'resume' | 'manual' | null>(null);

  // If in edit mode, proceed to form logic (which might be passed down)
  const handleManualClick = () => {
    navigate('/onboarding/form', { state: location.state });
  };

  const handleUploadClick = () => {
    navigate('/onboarding/upload', { state: location.state });
  };

  return (
    <div className="space-y-12 text-center">
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
          Let's Build Your <span className="text-primary">Profile</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose how you want to get started. We'll help you create a standout profile either way.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {/* Option 1: Upload Resume (Primary) */}
        <div
          className={`relative group rounded-3xl p-8 cursor-pointer transition-all duration-300 border-2 ${hoveredOption === 'resume'
            ? 'bg-card border-primary shadow-2xl scale-[1.02] ring-4 ring-primary/10'
            : 'bg-card/50 border-border shadow-soft hover:bg-card'
            }`}
          onMouseEnter={() => setHoveredOption('resume')}
          onMouseLeave={() => setHoveredOption(null)}
          onClick={handleUploadClick}
        >
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              Recommended
            </div>
          </div>

          <div className="h-full flex flex-col items-center text-center space-y-6 pt-4">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-300 ${hoveredOption === 'resume' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}>
              <FileUp className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold">Upload Resume</h3>
              <p className="text-muted-foreground">
                We'll magically extract your details. <br />
                Fastest way to get started.
              </p>
            </div>

            <div className="flex-1 w-full flex items-end justify-center pt-4">
              <Button
                variant={hoveredOption === 'resume' ? 'seeker' : 'outline'}
                className={`w-full gap-2 transition-all duration-300`}
              >
                Auto-Fill Profile
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Option 2: Manual (Secondary) */}
        <div
          className={`relative group rounded-3xl p-8 cursor-pointer transition-all duration-300 border-2 ${hoveredOption === 'manual'
            ? 'bg-card border-accent shadow-2xl scale-[1.02] ring-4 ring-accent/10'
            : 'bg-card/50 border-border shadow-soft hover:bg-card'
            }`}
          onMouseEnter={() => setHoveredOption('manual')}
          onMouseLeave={() => setHoveredOption(null)}
          onClick={handleManualClick}
        >
          <div className="h-full flex flex-col items-center text-center space-y-6 pt-4">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-colors duration-300 ${hoveredOption === 'manual' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
              }`}>
              <Keyboard className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold">Fill Manually</h3>
              <p className="text-muted-foreground">
                Start from scratch. Control every detail <br />
                step-by-step.
              </p>
            </div>

            <div className="flex-1 w-full flex items-end justify-center pt-4">
              <Button
                variant={hoveredOption === 'manual' ? 'employer' : 'outline'}
                className={`w-full gap-2 transition-all duration-300`}
              >
                Enter Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Already have an account? <Link to="/login/seeker" className="text-primary hover:underline font-medium">Log in</Link>
      </p>
    </div>
  );
};
