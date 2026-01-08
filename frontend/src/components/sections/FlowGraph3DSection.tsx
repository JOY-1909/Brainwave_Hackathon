import { RevealOnScroll } from '@/components/RevealOnScroll';
import { useParallax } from '@/hooks/useParallax';

// What others do (the frustrating stuff)
const traditionalFlow = [
  {
    emoji: '🔍',
    title: 'Scroll. Scroll. Scroll...',
    description: 'Usually takes about an hour just browsing through hundreds of listings that might not even fit.',
    color: 'from-red-500/20 to-orange-500/20',
    note: 'exhausting',
  },
  {
    emoji: '📝',
    title: 'Filter Everything Manually',
    description: "Location? Check. Experience? Check. Skills match? Maybe? There's gotta be a better way.",
    color: 'from-orange-500/20 to-amber-500/20',
    note: 'tedious',
  },
  {
    emoji: '❓',
    title: "Why Am I Seeing This?",
    description: 'Job says "5 years experience" but you have 2. Why even show it? No idea.',
    color: 'from-amber-500/20 to-yellow-500/20',
    note: 'confusing',
  },
  {
    emoji: '🤞',
    title: 'Apply & Hope',
    description: 'Hit that apply button on 20+ jobs and cross your fingers. Not ideal, right?',
    color: 'from-yellow-500/20 to-orange-500/20',
    note: 'hoping',
  },
];

// What we do (the smart way)
const yuvaSetuFlow = [
  {
    emoji: '🧠',
    title: 'We Actually Read Your Profile',
    description: 'Our AI gets what you can do (not just keyword matching). Like having a friend who really understands you.',
    color: 'from-blue-500/30 to-primary/30',
    highlight: 'No more keywords game',
  },
  {
    emoji: '🎯',
    title: 'Only Your Top 5',
    description: 'We pick the 5 best matches for YOU. Quality over quantity always wins.',
    color: 'from-primary/30 to-accent/30',
    highlight: 'Just 5. That\'s it.',
  },
  {
    emoji: '👀',
    title: 'See Exactly Why',
    description: '70% skills match, 30% location - boom, there\'s your breakdown. No mysteries here.',
    color: 'from-accent/30 to-teal-500/30',
    highlight: 'Full transparency',
  },
  {
    emoji: '❤️',
    title: 'Apply with Confidence',
    description: 'You know why it matches. You know it fits. Now go get that job! 💪',
    color: 'from-teal-500/30 to-green-500/30',
    highlight: 'You got this',
  },
];

export const FlowGraph3DSection = () => {
  const parallaxSlow = useParallax(0.1);
  const parallaxFast = useParallax(0.2);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background - keep it subtle */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background"
          style={{ transform: `translateY(${parallaxSlow}px)` }}
        />
        
        {/* Some floating elements but not too much */}
        <div 
          className="absolute top-20 left-[5%] w-48 h-48 rounded-full bg-primary/5 blur-3xl"
          style={{ transform: `translateY(${parallaxFast}px)` }}
        />
        <div 
          className="absolute bottom-32 right-[8%] w-56 h-56 rounded-full bg-accent/5 blur-3xl"
          style={{ animationDelay: '1s', transform: `translateY(${parallaxSlow}px)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - conversational */}
        <RevealOnScroll className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
              Here's the difference ✨
            </span>
          </div>
          
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Job Hunting, <span className="text-primary">Reimagined</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Look, we've all been there. Hours of scrolling, dozens of applications, radio silence. 
            <br className="hidden md:block" />We thought there had to be a better way.
          </p>
        </RevealOnScroll>

        {/* The actual comparison */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* LEFT - The old frustrating way */}
          <RevealOnScroll delay={100}>
            <div className="relative">
              {/* Header */}
              <div className="mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 mb-3">
                  <span className="text-sm">❌</span>
                  <span className="text-sm font-medium text-red-700 dark:text-red-300">The usual way</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground/80">
                  What everyone else does
                </h3>
              </div>

              {/* Flow - intentionally less uniform */}
              <div className="space-y-5">
                {traditionalFlow.map((step, index) => {
                  return (
                    <div key={index} className="relative">
                      {/* Connection line */}
                      {index < traditionalFlow.length - 1 && (
                        <div className="absolute left-7 top-[70px] w-0.5 h-10 bg-gradient-to-b from-red-400/30 to-red-300/10 z-0">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-400/50 animate-flow-down" />
                        </div>
                      )}

                      {/* Card - varied heights */}
                      <div className="relative z-10 group">
                        <div 
                          className="glass-strong rounded-xl md:rounded-2xl p-4 md:p-5 border border-red-200/40 dark:border-red-800/30 hover:border-red-300/60 dark:hover:border-red-700/50 transition-all duration-300 hover:-translate-y-0.5"
                          style={{ 
                            marginLeft: index % 2 === 0 ? '0' : '8px',  // Slight offset alternating
                          }}
                        >
                          <div className="flex items-start gap-3 md:gap-4">
                            {/* Emoji instead of icon */}
                            <div className="relative flex-shrink-0">
                              <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center border border-red-200/50 dark:border-red-800/30">
                                <span className="text-2xl md:text-3xl">{step.emoji}</span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <h4 className="font-semibold text-sm md:text-base text-foreground leading-tight">
                                  {step.title}
                                </h4>
                                <span className="text-xs px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/40 whitespace-nowrap flex-shrink-0">
                                  {step.note}
                                </span>
                              </div>
                              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>

          {/* RIGHT - Our smarter approach */}
          <RevealOnScroll delay={200}>
            <div className="relative">
              {/* Header */}
              <div className="mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 mb-3">
                  <span className="text-sm">✨</span>
                  <span className="text-sm font-medium text-primary">How we do it</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold">
                  <span className="text-primary">YuvaSetu's approach</span>
                </h3>
              </div>

              {/* Flow - more vibrant and alive */}
              <div className="space-y-5">
                {yuvaSetuFlow.map((step, index) => {
                  return (
                    <div key={index} className="relative">
                      {/* Connection line with animation */}
                      {index < yuvaSetuFlow.length - 1 && (
                        <div className="absolute left-7 top-[70px] w-0.5 h-10 bg-gradient-to-b from-primary/50 to-accent/30 z-0">
                          {/* Flowing light effect */}
                          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-primary/70 to-transparent animate-flow-down opacity-80" />
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary animate-flow-down shadow-glow-primary" />
                        </div>
                      )}

                      {/* Card */}
                      <div className="relative z-10 group">
                        <div 
                          className="glass-strong rounded-xl md:rounded-2xl p-4 md:p-5 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                          style={{ 
                            marginLeft: index % 2 === 1 ? '0' : '8px',  // Opposite offset
                          }}
                        >
                          <div className="flex items-start gap-3 md:gap-4">
                            {/* Emoji - more vibrant */}
                            <div className="relative flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/20 blur-lg rounded-xl" />
                              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                                <span className="text-2xl md:text-3xl">{step.emoji}</span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <h4 className="font-semibold text-sm md:text-base text-foreground leading-tight">
                                  {step.title}
                                </h4>
                                <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 whitespace-nowrap flex-shrink-0">
                                  {step.highlight}
                                </span>
                              </div>
                              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* VS Badge - emoji instead */}
        <div className="hidden lg:block absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-xl border-4 border-background">
              <span className="text-3xl">⚡</span>
            </div>
          </div>
        </div>

        {/* Bottom stats - emojis everywhere */}
        <RevealOnScroll delay={400} className="mt-16 md:mt-20">
          <div className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8 border border-primary/20 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-sm md:text-base text-muted-foreground">
                Real results from real people 👇
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-blue-600 mb-3 shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-3xl md:text-4xl">⚡</span>
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">40% faster</div>
                <div className="text-xs md:text-sm text-muted-foreground">Time to find your job</div>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-accent to-teal-600 mb-3 shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-3xl md:text-4xl">🎯</span>
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">95% accuracy</div>
                <div className="text-xs md:text-sm text-muted-foreground">Match quality rate</div>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-accent mb-3 shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-3xl md:text-4xl">👀</span>
                </div>
                <div className="text-2xl md:text-3xl font-display font-bold text-primary mb-1">99% clear</div>
                <div className="text-xs md:text-sm text-muted-foreground">Why you matched</div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
