import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    title: "CEO, FinFlow Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "DevForge transformed our vision into a stunning fintech dashboard. Their team's attention to detail and proactive communication made the entire process seamless. We launched 2 weeks ahead of schedule!",
  },
  {
    name: "Marcus Thompson",
    title: "CTO, QuickBite",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "The mobile app they built for us handles 50,000+ daily active users without a hiccup. The code quality is exceptional and their post-launch support has been outstanding.",
  },
  {
    name: "Priya Patel",
    title: "Founder, TradeHub",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "We needed a complex B2B marketplace built fast. DevForge delivered a world-class product in just 4 months. Our conversion rate increased by 340% after launch.",
  },
  {
    name: "James Okonkwo",
    title: "VP Engineering, LogiTrack",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "Their backend architecture is rock-solid. Our logistics platform processes millions of data points daily and the system has maintained 99.99% uptime. Truly enterprise-grade work.",
  },
  {
    name: "Emily Chen",
    title: "Product Manager, TeamSync",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "The UI/UX work DevForge did for our SaaS reduced our onboarding time by 60%. Every interaction feels polished. Our NPS score jumped from 32 to 71 after the redesign.",
  },
  {
    name: "David Larsson",
    title: "Founder, StyleVault",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
    rating: 5,
    text: "From strategy to launch, DevForge was our trusted partner. They don't just build what you ask for — they challenge your assumptions and deliver something even better.",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            Client Love
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't take our word for it — hear from the founders and teams who've built their products with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 hover:-translate-y-1 hover:shadow-elevated transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
