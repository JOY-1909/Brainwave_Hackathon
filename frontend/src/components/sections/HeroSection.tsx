import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Users, Briefcase, UserSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { use3DEffect } from '@/hooks/use3DEffect';
import { useParallax } from '@/hooks/useParallax';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { Hero3DElement } from '@/components/Hero3DElement';

export const HeroSection = () => {
  const statCard1 = use3DEffect(10);
  const statCard2 = use3DEffect(10);
  const statCard3 = use3DEffect(10);
  const parallaxSlow = useParallax(0.3);
  const parallaxFast = useParallax(0.6);
  
  // Animated counters for stats
  const counter1 = useAnimatedCounter({ end: 40, duration: 1500 });
  const counter3 = useAnimatedCounter({ end: 99, duration: 1500 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20 perspective-2000">
      {/* Enhanced 3D background decorations */}
      <div className="absolute inset-0 overflow-hidden preserve-3d">
        {/* Gradient orbs with parallax */}
        <div 
          ref={parallaxSlow.ref}
          style={{ transform: `translateY(${parallaxSlow.offset}px) translateZ(50px)` }}
          className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-[hsl(252_94%_67%_/_0.05)] rounded-full blur-[100px] animate-pulse-glow preserve-3d" 
        />
        <div 
          ref={parallaxFast.ref}
          style={{ transform: `translateY(${parallaxFast.offset}px) translateZ(30px)` }}
          className="absolute bottom-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-[100px] animate-pulse-glow preserve-3d" 
        />
        
        {/* Floating geometric shapes with 3D animations */}
        <div className="absolute top-1/4 left-[10%] w-4 h-4 bg-primary/20 rounded-full animate-float-3d preserve-3d" />
        <div className="absolute top-1/3 right-[15%] w-6 h-6 bg-accent/20 rounded-lg rotate-45 animate-bounce-3d preserve-3d" />
        <div className="absolute bottom-1/3 left-[20%] w-3 h-3 bg-primary/30 rounded-full animate-levitate preserve-3d" />
        <div className="absolute top-1/2 right-[10%] w-5 h-5 border-2 border-primary/20 rounded-full animate-rotate-3d preserve-3d" />
        
        {/* Additional 3D floating elements */}
        <div className="absolute top-[20%] right-[30%] w-8 h-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg animate-float-3d preserve-3d" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[30%] right-[20%] w-6 h-6 border-2 border-accent/20 rounded-full animate-pulse-3d preserve-3d" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 animate-fade-in tilt-effect">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  AI-Powered Career Platform
                </span>
              </div>
              
              {/* Main Heading with 3D text effect */}
              <h1 
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in text-foreground preserve-3d" 
                style={{ 
                  animationDelay: '0.1s',
                  textShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 20px 60px rgba(0, 0, 0, 0.05)'
                }}
              >
                Your Career Journey
                <br />
                <span className="text-primary" style={{ 
                  transform: 'translateZ(20px)',
                  display: 'inline-block'
                }}>
                  Starts Here.
                </span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                YuvaSetu eliminates opportunity fatigue with transparent AI matching, 
                showing you only the most relevant opportunities.
              </p>
              
              {/* Dual CTA Buttons with 3D hover effects */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-in preserve-3d" style={{ animationDelay: '0.3s' }}>
                <Link to="/login/seeker">
                  <Button variant="seeker" size="xl" className="group min-w-[240px] shadow-3d-hover transition-all duration-300 hover:animate-scale-brighten">
                    <UserSearch className="w-5 h-5" />
                    I'm a Job Seeker
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/login/employer">
                  <Button variant="employer" size="xl" className="group min-w-[240px] shadow-3d-hover transition-all duration-300 hover:animate-scale-brighten">
                    <Briefcase className="w-5 h-5" />
                    I'm an Employer
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              {/* Stats with interactive 3D tilt and animated counters */}
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 animate-fade-in preserve-3d" style={{ animationDelay: '0.4s' }}>
                <div 
                  ref={(el) => {
                    statCard1.ref.current = el;
                    counter1.ref.current = el;
                  }}
                  style={{ transform: statCard1.transform }}
                  className="text-center p-3 rounded-xl bg-card/80 border border-border shadow-3d backdrop-blur-xl preserve-3d transition-transform duration-200 ease-out"
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
                  className="text-center p-3 rounded-xl bg-card/80 border border-border shadow-3d backdrop-blur-xl preserve-3d transition-transform duration-200 ease-out"
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
                  className="text-center p-3 rounded-xl bg-card/80 border border-border shadow-3d backdrop-blur-xl preserve-3d transition-transform duration-200 ease-out"
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
            <div className="hidden lg:block animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Hero3DElement />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator with 3D effect */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-levitate preserve-3d">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};