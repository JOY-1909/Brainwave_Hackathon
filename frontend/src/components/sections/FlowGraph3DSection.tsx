import { RevealOnScroll, StaggerContainer } from '@/components/RevealOnScroll';
import { useParallax } from '@/hooks/useParallax';
import { ArrowRight, Check, X, Zap, Target, Eye } from 'lucide-react';
import { useRef, useState } from 'react';

// Traditional approach pain points
const traditionalFlow = [
  {
    icon: '🔍',
    title: 'Endless Scrolling',
    description: 'Hours spent browsing through hundreds of irrelevant listings',
    metric: '2+ hrs',
    metricLabel: 'per session',
  },
  {
    icon: '📝',
    title: 'Manual Filtering',
    description: 'Constantly adjusting filters that still miss the mark',
    metric: '50+',
    metricLabel: 'listings to check',
  },
  {
    icon: '❓',
    title: 'Zero Transparency',
    description: 'No explanation why certain jobs appear—just guesswork',
    metric: '0%',
    metricLabel: 'match clarity',
  },
  {
    icon: '🤞',
    title: 'Spray & Pray',
    description: 'Mass applying with fingers crossed and hope for callbacks',
    metric: '20+',
    metricLabel: 'applications needed',
  },
];

// YuvaSetu's intelligent approach
const yuvaSetuFlow = [
  {
    icon: '🧠',
    title: 'Semantic Understanding',
    description: 'AI that truly comprehends your skills, not just keyword matching',
    metric: 'Deep',
    metricLabel: 'profile analysis',
  },
  {
    icon: '🎯',
    title: 'Curated Top 5',
    description: 'Only your most relevant opportunities—quality over quantity',
    metric: '5',
    metricLabel: 'perfect matches',
  },
  {
    icon: '👀',
    title: 'Full Transparency',
    description: 'See exactly why each job matches with detailed breakdowns',
    metric: '100%',
    metricLabel: 'explainable',
  },
  {
    icon: '✅',
    title: 'Confident Applications',
    description: 'Apply knowing exactly why you\'re a great fit for the role',
    metric: '3x',
    metricLabel: 'better response',
  },
];

// Comparison card with 3D tilt
const ComparisonCard = ({ 
  children, 
  className = '',
  variant = 'default',
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'default' | 'highlight';
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => setTransform('');

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ease-out ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

export const FlowGraph3DSection = () => {
  const parallaxSlow = useParallax(0.1);

  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-gradient-to-b from-background via-secondary/5 to-background">
      {/* Sophisticated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Gradient orbs */}
        <div 
          className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-blob-morph"
          style={{ transform: `translateY(${parallaxSlow}px)` }}
        />
        <div 
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] animate-blob-morph"
          style={{ animationDelay: '5s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">The Difference</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Job Hunting,</span>{' '}
            <span className="text-primary">Reimagined</span>
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We've all experienced the frustration of traditional job searching. 
            Here's how YuvaSetu transforms that experience.
          </p>
        </RevealOnScroll>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16">
          {/* Traditional Approach */}
          <RevealOnScroll delay={100}>
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">Traditional Approach</h3>
                  <p className="text-sm text-muted-foreground">What you've been dealing with</p>
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {traditionalFlow.map((step, index) => (
                  <ComparisonCard key={index}>
                    <div className="group rounded-xl bg-card border border-border p-4 hover:border-red-500/30 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground mb-0.5">{step.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">{step.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-lg font-bold text-red-500">{step.metric}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{step.metricLabel}</div>
                        </div>
                      </div>
                    </div>
                  </ComparisonCard>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* YuvaSetu Approach */}
          <RevealOnScroll delay={200}>
            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center animate-glow-breathe">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary">YuvaSetu Approach</h3>
                  <p className="text-sm text-muted-foreground">Intelligent, transparent matching</p>
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {yuvaSetuFlow.map((step, index) => (
                  <ComparisonCard key={index}>
                    <div className="group rounded-xl bg-card border border-primary/20 p-4 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-all shadow-md">
                          <span className="text-2xl">{step.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-foreground mb-0.5">{step.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">{step.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-lg font-bold text-primary">{step.metric}</div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{step.metricLabel}</div>
                        </div>
                      </div>
                    </div>
                  </ComparisonCard>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* VS Divider - Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-30" />
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl border-4 border-background">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <RevealOnScroll delay={400}>
          <div className="bg-card rounded-2xl border border-border p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="font-semibold text-lg text-foreground mb-2">The Results Speak for Themselves</h3>
              <p className="text-sm text-muted-foreground">Real outcomes from our matching platform</p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl font-display font-bold text-foreground mb-1">40%</div>
                <div className="text-sm text-muted-foreground">Faster Job Search</div>
              </div>

              <div className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <div className="text-3xl font-display font-bold text-foreground mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Match Accuracy</div>
              </div>

              <div className="text-center group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl font-display font-bold text-foreground mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Explainable Results</div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll delay={500} className="text-center mt-12">
          <a 
            href="/login/seeker"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            Experience the Difference
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
};
