import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Code2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Expert Engineers" },
  { value: "8+", label: "Years of Excellence" },
];

const fadeUpItem = (i: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  },
});

export const HeroSection = () => {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Grid dots */}
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="container-max section-padding relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-primary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Award-Winning Digital Agency
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            We Build{" "}
            <span className="text-gradient">Powerful</span>{" "}
            Websites, Apps{" "}
            <br className="hidden md:block" />
            &{" "}
            <span className="text-gradient">Digital Products</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From concept to launch — we craft high-performance web apps, mobile applications, 
            SaaS platforms and custom software that drive real business growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              onClick={() => handleNav("#contact")}
              className="bg-gradient-primary text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl shadow-glow hover:opacity-90 hover:scale-105 transition-all duration-200"
            >
              Start a Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleNav("#quote")}
              className="border-border bg-card/50 backdrop-blur-sm text-foreground font-semibold text-base px-8 py-6 rounded-xl hover:bg-secondary transition-all duration-200"
            >
              Get a Quote
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 justify-center mb-20"
          >
            {[
              { icon: Code2, text: "Full-Stack Development" },
              { icon: Zap, text: "Fast Delivery" },
              { icon: Sparkles, text: "AI-Powered Solutions" },
            ].map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/60 border border-border text-sm text-muted-foreground"
              >
                <Icon className="w-3.5 h-3.5 text-accent" />
                {text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <div className="font-display text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-5 h-9 rounded-full border-2 border-border flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};
