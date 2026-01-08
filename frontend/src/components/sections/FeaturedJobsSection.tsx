import { RevealOnScroll, StaggerContainer } from '@/components/RevealOnScroll';
import { 
  TrendingUp, 
  Briefcase,
  Users,
  Target,
  Award,
  Zap
} from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

// Job categories - more personality, less corporate
const jobCategories = [
  {
    emoji: '💻',
    title: 'Full Stack Dev',
    subtitle: 'Code everything',
    placementCount: 2843,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    trend: '+18%',
    rotation: '-2deg',
  },
  {
    emoji: '📊',
    title: 'Data Science',
    subtitle: 'Crunch those numbers',
    placementCount: 1956,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    trend: '+24%',
    rotation: '1deg',
  },
  {
    emoji: '🎨',
    title: 'UI/UX Design',
    subtitle: 'Make it pretty',
    placementCount: 1247,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    trend: '+15%',
    rotation: '2deg',
  },
  {
    emoji: '📱',
    title: 'Digital Marketing',
    subtitle: 'Grow the brand',
    placementCount: 1589,
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-green-500/10',
    trend: '+21%',
    rotation: '-1deg',
  },
  {
    emoji: '📈',
    title: 'Product Mgmt',
    subtitle: 'Ship features',
    placementCount: 876,
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10',
    trend: '+12%',
    rotation: '1.5deg',
  },
  {
    emoji: '💼',
    title: 'Business Dev',
    subtitle: 'Close deals',
    placementCount: 1134,
    color: 'from-amber-500 to-yellow-500',
    bgColor: 'bg-amber-500/10',
    trend: '+19%',
    rotation: '-1.5deg',
  },
];

// Floating emojis in background
const FloatingEmoji = ({ emoji, delay, index }: { emoji: string; delay: number; index: number }) => {
  const positions = [
    { left: '8%', top: '12%' },
    { left: '78%', top: '18%' },
    { left: '15%', top: '65%' },
    { left: '85%', top: '58%' },
    { left: '45%', top: '25%' },
    { left: '62%', top: '72%' },
  ];
  
  const position = positions[index] || { left: '50%', top: '50%' };
  
  return (
    <div
      className="absolute text-6xl md:text-7xl opacity-[0.06] pointer-events-none select-none"
      style={{
        left: position.left,
        top: position.top,
        animation: `float ${6 + (index % 3)}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        filter: 'blur(0.5px)',
      }}
    >
      {emoji}
    </div>
  );
};

// Counter with personality
const AnimatedCounter = ({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) => {
  const { count, ref } = useCounterAnimation(value, 2000);
  
  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export const FeaturedJobsSection = () => {
  const parallaxSlow = useParallax(0.15);
  const parallaxFast = useParallax(0.3);

  const totalPlacements = jobCategories.reduce((sum, cat) => sum + cat.placementCount, 0);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* More organic background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-background via-primary/[0.03] to-background"
          style={{ transform: `translateY(${parallaxSlow}px)` }}
        />
        
        {/* Floating emojis - more personality */}
        <div className="absolute inset-0 overflow-hidden">
          {jobCategories.map((cat, i) => (
            <FloatingEmoji 
              key={i} 
              emoji={cat.emoji} 
              delay={i * 0.8} 
              index={i} 
            />
          ))}
        </div>

        {/* Subtle blobs */}
        <div 
          className="absolute top-20 left-[5%] w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          style={{ transform: `translateY(${parallaxFast}px)` }}
        />
        <div 
          className="absolute bottom-20 right-[8%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"
          style={{ animationDelay: '2s', transform: `translateY(${parallaxSlow}px)` }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Casual header */}
        <RevealOnScroll className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20 backdrop-blur-xl">
              <Award className="w-4 h-4" />
              Real Results
            </span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-5 md:mb-6 text-foreground">
            Where are Our Users <br className="hidden md:block" />
            <span className="text-primary relative inline-block">
              Get Placed?
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            Real placements, real success. Join thousands who've found their perfect role.
          </p>
        </RevealOnScroll>

        {/* Bento grid with personality */}
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-5">
            {/* Hero card - bigger emoji, less icon */}
            <RevealOnScroll delay={50} className="md:col-span-2 lg:row-span-2">
              <div className="group relative h-full min-h-[320px] glass-strong rounded-3xl p-8 md:p-10 border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Big emoji instead of icon */}
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">
                      🎯
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-6xl md:text-7xl lg:text-8xl font-display font-bold text-primary mb-2 leading-none">
                        <AnimatedCounter value={totalPlacements} suffix="+" />
                      </div>
                      <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                        Users Placed
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800/40">
                      <span className="text-base">📈</span>
                      <span className="font-semibold">+22% this year</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            </RevealOnScroll>

            {/* Success rate - emoji focused */}
            <RevealOnScroll delay={100} className="md:col-span-2 lg:col-span-1">
              <div className="group relative h-full min-h-[155px] glass-strong rounded-3xl p-6 border border-border hover:border-accent/40 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
                      <div className="text-4xl font-display font-bold text-primary">
                        <AnimatedCounter value={92} suffix="%" />
                      </div>
                    </div>
                    <div className="text-4xl group-hover:scale-125 transition-transform">
                      ✨
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Pretty good, right?</p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Career paths - emoji focused */}
            <RevealOnScroll delay={150} className="md:col-span-2 lg:col-span-1">
              <div className="group relative h-full min-h-[155px] glass-strong rounded-3xl p-6 border border-border hover:border-primary/40 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Career Paths</p>
                      <div className="text-4xl font-display font-bold text-primary">
                        <AnimatedCounter value={6} suffix="+" />
                      </div>
                    </div>
                    <div className="text-4xl group-hover:scale-125 transition-transform">
                      🚀
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Something for everyone</p>
                </div>
              </div>
            </RevealOnScroll>
          </StaggerContainer>

          {/* Job cards - emoji first, organic rotation */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {jobCategories.map((category, index) => {
              return (
                <RevealOnScroll key={category.title} delay={200 + index * 50}>
                  <div 
                    className="group relative glass-strong rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
                    style={{
                      transform: `rotate(${category.rotation})`,
                      marginTop: index % 2 === 0 ? '0' : '8px', // Stagger heights
                    }}
                  >
                    {/* Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
                    
                    <div className="relative z-10">
                      {/* Big emoji - main visual */}
                      <div className="text-5xl mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block">
                        {category.emoji}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4 italic">
                        {category.subtitle}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-3xl font-display font-bold text-primary mb-0.5">
                            <AnimatedCounter value={category.placementCount} />
                          </div>
                          <p className="text-xs text-muted-foreground">placed</p>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-xs font-semibold border border-green-200 dark:border-green-800/40">
                          <span>↗️</span>
                          {category.trend}
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </StaggerContainer>
        </div>

        {/* CTA with personality */}
        <RevealOnScroll delay={600} className="text-center mt-12 md:mt-16">
          <p className="text-muted-foreground text-sm md:text-base mb-6">
            Your turn! Ready to join them?
          </p>
          <a 
            href="/login/seeker"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-2xl hover:shadow-primary/50 hover:scale-105 hover:bg-primary/90 transition-all duration-300 group"
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">⚡</span>
            Start Your Journey Today
            <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </RevealOnScroll>
      </div>
    </section>
  );
};
