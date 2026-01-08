import { RevealOnScroll, StaggerContainer } from '@/components/RevealOnScroll';
import { Star, Quote, Heart, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya',
    role: 'CS Student, Delhi',
    avatar: '/profile_priya_1767625978569.png',
    content: "Okay so I used to spend HOURS scrolling. Now? I get 5 matches that actually make sense. The transparency thing where it shows WHY I matched? Game changer honestly.",
    rating: 5,
  },
  {
    name: 'Rahul',
    role: 'Data Science Grad',
    avatar: '/profile_rahul_1767625995213.png',
    content: "Bruh, the auto-resume thing is insane. I had no clue how to write one that ATS systems would actually read. YuvaSetu just... did it? Got my offer in 2 weeks.",
    rating: 5,
  },
  {
    name: 'Ananya',
    role: 'MBA Student',
    avatar: '/profile_ananya_1767626018394.png',
    content: "Living in a small town with terrible internet, the SMS alerts literally saved me. Never missed a single opportunity even when WiFi was down. They really thought this through.",
    rating: 5,
  },
  {
    name: 'Vikram',
    role: 'Mech Engineering',
    avatar: '/profile_vikram_1767626037611.png',
    content: "The AI actually GETS it. Like, it understood that my mechanical background + Python = perfect for automation roles. Mind = blown 🤯",
    rating: 5,
  },
  {
    name: 'Neha',
    role: 'BCA Grad',
    avatar: '/profile_neha_1767626053701.png',
    content: "Finally! A platform that doesn't throw 500 jobs at me and expect me to figure it out. Clear explanations, curated list. Way less stressful.",
    rating: 5,
  },
  {
    name: 'Arjun',
    role: 'IT Guy',
    avatar: '/profile_arjun_1767626074378.png',
    content: "The semantic matching is wild. I mentioned TensorFlow once and it connected me to Deep Learning roles automatically. This is literally the future.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-[15%] w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <RevealOnScroll className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20">
              <Heart className="w-4 h-4 fill-accent" />
              Real talk from real students
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Students <span className="text-primary">Actually Like This</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what people are saying 💬
          </p>
        </RevealOnScroll>
        
        {/* Testimonials - intentionally varied grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="glass-strong rounded-2xl p-5 md:p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group relative"
              style={{
                // Varied heights and slight rotations for organic feel
                marginTop: index % 3 === 1 ? '12px' : '0',
                marginBottom: index % 3 === 2 ? '8px' : '0',
              }}
            >
              {/* Quote icon - softer */}
              <Quote className="w-7 h-7 text-primary/20 mb-3" />
              
              {/* Content - the actual testimonial */}
              <p className="text-foreground/90 mb-5 leading-relaxed text-sm md:text-base">
                {testimonial.content}
              </p>
              
              {/* Rating - make it more casual */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 text-amber-500 fill-amber-500 dark:text-yellow-400 dark:fill-yellow-400" 
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  {testimonial.rating}/5
                </span>
              </div>
              
              {/* Author - with actual profile image */}
              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform border-2 border-gradient-to-br from-primary to-accent">
                  <img 
                    src={testimonial.avatar} 
                    alt={`${testimonial.name} profile`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient background with initials if image fails
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"><span class="text-sm font-bold text-white">${testimonial.name.charAt(0)}</span></div>`;
                      }
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm text-foreground truncate">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground truncate">{testimonial.role}</p>
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
            </div>
          ))}
        </StaggerContainer>

        {/* Bottom CTA - casual */}
        <RevealOnScroll delay={400} className="text-center mt-12 md:mt-16">
          <p className="text-muted-foreground text-sm md:text-base mb-4">
            Join 10,000+ students who've found better opportunities
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Your success story could be next</span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
