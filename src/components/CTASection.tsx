import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
          style={{ background: "linear-gradient(135deg, hsl(211 100% 55% / 0.15), hsl(188 94% 50% / 0.1))" }}
        >
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent/20 blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 border border-primary/20 rounded-3xl pointer-events-none" />
          <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Let's Build Together
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Ready to Build
              <br />
              <span className="text-gradient">Something Amazing?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto mb-10"
            >
              Join 150+ companies that trusted DevForge to turn their vision into 
              world-class digital products. Let's start with a free strategy call.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button
                size="lg"
                onClick={() => handleNav("#quote")}
                className="bg-gradient-primary text-primary-foreground font-semibold text-base px-10 py-6 rounded-xl shadow-glow hover:opacity-90 hover:scale-105 transition-all duration-200"
              >
                Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNav("#contact")}
                className="border-border bg-card/30 backdrop-blur-sm text-foreground font-semibold text-base px-10 py-6 rounded-xl hover:bg-secondary transition-all"
              >
                Book a Free Call
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
