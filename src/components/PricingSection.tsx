import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Zap, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";

const iconMap = [Zap, Users, Clock];
const colorMap = [
  "from-blue-500/20 to-blue-600/10",
  "from-primary/30 to-accent/20",
  "from-violet-500/20 to-violet-600/10",
];
const borderMap = [
  "border-blue-500/20",
  "border-primary/40",
  "border-violet-500/20",
];

export const PricingSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useContent();

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Flexible{" "}
            <span className="text-gradient">Engagement Models</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the model that fits your project. All engagements include code ownership, 
            regular updates, and a dedicated point of contact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {content.pricing.map((plan, i) => {
            const Icon = iconMap[i % iconMap.length];
            const color = colorMap[i % colorMap.length];
            const border = borderMap[i % borderMap.length];
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative glass-card rounded-2xl p-8 border ${border} transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight ? "shadow-glow ring-1 ring-primary/30" : "hover:shadow-elevated"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold shadow-glow">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>

                <div className="mb-1">
                  <h3 className="font-display text-xl font-bold">{plan.title}</h3>
                  <p className="text-xs text-accent font-medium mt-0.5">{plan.subtitle}</p>
                </div>

                <div className="mt-4 mb-4">
                  <span className="font-display text-3xl font-bold text-gradient">{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">/ {plan.period}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {plan.description}
                </p>

                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feat}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.highlight
                      ? "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
                      : "border-border bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                  onClick={() => handleNav("#quote")}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
