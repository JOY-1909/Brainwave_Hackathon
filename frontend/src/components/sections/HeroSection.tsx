import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Users, Briefcase, UserSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { use3DEffect } from '@/hooks/use3DEffect';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { Hero3DElement } from '@/components/Hero3DElement';
import { TypewriterText } from '@/components/TypewriterText';

export const HeroSection = () => {
  const statCard1 = use3DEffect(10);
  const statCard2 = use3DEffect(10);
  const statCard3 = use3DEffect(10);
  
  // Animated counters for stats
  const counter1 = useAnimatedCounter({ end: 40, duration: 1500 });
  const counter3 = useAnimatedCounter({ end: 99, duration: 1500 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-background pt-20 perspective-2000">
      {/* Clean white background */}
      <div className="absolute inset-0 bg-white dark:bg-background" />
      
      {/* Theme-consistent gradient orbs (Primary Blue + Accent Teal) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main blue orb - top right */}
        <div 
          className="absolute top-[5%] right-[10%] w-[600px] h-[600px] rounded-full blur-[100px] animate-blob-morph"
          style={{ 
            background: 'radial-gradient(circle, hsl(221 83% 53% / 0.15) 0%, hsl(199 89% 58% / 0.08) 50%, transparent 70%)'
          }}
        />
        {/* Accent teal orb - bottom left */}
        <div 
          className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] rounded-full blur-[90px] animate-blob-morph"
          style={{ 
            animationDelay: '5s',
            background: 'radial-gradient(circle, hsl(174 72% 40% / 0.12) 0%, hsl(160 84% 39% / 0.06) 50%, transparent 70%)'
          }}
        />
        {/* Secondary blue orb - center left */}
        <div 
          className="absolute top-[35%] left-[20%] w-[350px] h-[350px] rounded-full blur-[80px] animate-blob-morph"
          style={{ 
            animationDelay: '10s',
            background: 'radial-gradient(circle, hsl(221 83% 53% / 0.08) 0%, transparent 60%)'
          }}
        />
      </div>

      {/* Floating elements using theme colors */}
      <div className="absolute inset-0 overflow-hidden preserve-3d pointer-events-none">
        {/* Subtle floating shapes */}
        <div className="absolute top-1/4 left-[10%] w-3 h-3 bg-primary/15 rounded-full animate-float-3d preserve-3d" />
        <div className="absolute top-1/3 right-[15%] w-4 h-4 bg-accent/15 rounded-lg rotate-45 animate-bounce-3d preserve-3d" />
        <div className="absolute bottom-1/3 left-[20%] w-2 h-2 bg-primary/20 rounded-full animate-levitate preserve-3d" />
        <div className="absolute top-1/2 right-[10%] w-4 h-4 border border-primary/15 rounded-full animate-rotate-3d preserve-3d" />
        <div className="absolute top-[15%] left-[25%] w-2 h-2 bg-primary/10 rounded-full animate-particle-drift" />
        <div className="absolute top-[60%] right-[25%] w-2 h-2 bg-accent/15 rounded-full animate-particle-drift" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Badge with shimmer effect */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 animate-elastic-in shimmer-overlay relative overflow-hidden tilt-effect">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  AI-Powered Career Platform
                </span>
              </div>
              
              {/* Main Heading with Typewriter effect */}
              <h1 
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground preserve-3d" 
                style={{ 
                  textShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 20px 60px rgba(0, 0, 0, 0.05)'
                }}
              >
                <span className="animate-text-reveal inline-block">Your Career Journey</span>
                <br />
                <span className="text-primary inline-block" style={{ transform: 'translateZ(20px)' }}>
                  <TypewriterText 
                    text={["Starts Here.", "Reimagined.", "Amplified."]}
                    speed={100}
                    deleteSpeed={60}
                    pauseDuration={2500}
                    loop={true}
                    showCursor={true}
                  />
                </span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-text-reveal" style={{ animationDelay: '0.3s' }}>
                YuvaSetu eliminates opportunity fatigue with transparent AI matching, 
                showing you only the most relevant opportunities.
              </p>
              
              {/* Dual CTA Buttons with magnetic hover and animated border */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-elastic-in preserve-3d stagger-elastic" style={{ animationDelay: '0.4s' }}>
                <Link to="/login/seeker">
                  <Button 
                    variant="seeker" 
                    size="xl" 
                    className="group min-w-[240px] shadow-3d-hover transition-all duration-300 magnetic-hover animated-border relative overflow-hidden animate-glow-breathe"
                  >
                    <UserSearch className="w-5 h-5" />
                    I'm a Job Seeker
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login/employer">
                  <Button 
                    variant="employer" 
                    size="xl" 
                    className="group min-w-[240px] shadow-3d-hover transition-all duration-300 magnetic-hover animated-border relative overflow-hidden"
                  >
                    <Briefcase className="w-5 h-5" />
                    I'm an Employer
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              {/* Stats with interactive 3D tilt and animated counters */}
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 preserve-3d stagger-elastic" style={{ animationDelay: '0.5s' }}>
                <div 
                  ref={(el) => {
                    statCard1.ref.current = el;
                    counter1.ref.current = el;
                  }}
                  style={{ transform: statCard1.transform }}
                  className="text-center p-3 rounded-xl bg-card/80 border border-border shadow-3d backdrop-blur-xl preserve-3d transition-transform duration-200 ease-out tilt-3d-hover animate-elastic-in shimmer-overlay relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="font-display text-2xl md:text-3xl font-bold text-foreground">{counter1.count}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Faster</p>
                </div>
                <div 
                  ref={statCard2.ref}
                  style={{ transform: statCard2.transform }}
                  className="text-center p-3 rounded-xl bg-card/80 border border-border shadow-3d backdrop-blur-xl preserve-3d transition-transform duration-200 ease-out tilt-3d-hover animate-elastic-in shimmer-overlay relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="font-display text-2xl md:text-3xl font-bold text-foreground">Top 5</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Curated</p>
                </div>
                <div 
                  ref={(el) => {
                    statCard3.ref.current = el;
                    counter3.ref.current = el;
                  }}
                  style={{ transform: statCard3.transform }}
                  className="text-center p-3 rounded-xl bg-card/80 border border-border shadow-3d backdrop-blur-xl preserve-3d transition-transform duration-200 ease-out tilt-3d-hover animate-elastic-in shimmer-overlay relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="font-display text-2xl md:text-3xl font-bold text-foreground">{counter3.count}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Clear</p>
                </div>
              </div>
            </div>

            {/* Right Column - 3D Element */}
            <div className="hidden lg:block animate-card-entrance" style={{ animationDelay: '0.3s' }}>
              <Hero3DElement />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator with enhanced animation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-levitate preserve-3d">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 animate-glow-breathe">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};