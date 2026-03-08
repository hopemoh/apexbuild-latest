import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Map, Pen, Code2, FlaskConical, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description: "We deep-dive into your business goals, target audience, technical requirements, and competitive landscape to build a solid foundation.",
    detail: "Requirements analysis, stakeholder interviews, market research",
  },
  {
    number: "02",
    icon: Map,
    title: "Planning",
    description: "We create a detailed project roadmap, technical architecture, timeline, and resource allocation plan for transparent execution.",
    detail: "Sprint planning, architecture design, timeline estimation",
  },
  {
    number: "03",
    icon: Pen,
    title: "Design",
    description: "Our designers craft intuitive wireframes, interactive prototypes, and a polished design system that aligns with your brand.",
    detail: "UI/UX design, prototyping, design system, user testing",
  },
  {
    number: "04",
    icon: Code2,
    title: "Development",
    description: "Agile development with weekly demos, CI/CD pipelines, and rigorous code reviews ensuring quality at every sprint.",
    detail: "Agile sprints, code reviews, CI/CD, daily standups",
  },
  {
    number: "05",
    icon: FlaskConical,
    title: "Testing",
    description: "Comprehensive QA across devices, browsers, and scenarios including performance, security, and accessibility testing.",
    detail: "QA testing, security audit, performance optimization",
  },
  {
    number: "06",
    icon: Rocket,
    title: "Launch & Support",
    description: "Smooth deployment to production, monitoring setup, and ongoing support to ensure your product succeeds long-term.",
    detail: "Deployment, monitoring, 24/7 support, iteration",
  },
];

export const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            How We Work
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Our{" "}
            <span className="text-gradient">Proven Process</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A battle-tested methodology that ensures every project is delivered on time, 
            within budget, and exceeds expectations.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                    i < steps.length - 1 ? "lg:mb-16" : ""
                  }`}
                >
                  {/* Step number dot on center line */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-gradient-primary items-center justify-center font-display font-bold text-sm text-primary-foreground shadow-glow">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className={isEven ? "lg:text-right lg:pr-12" : "lg:col-start-2 lg:pl-12"}>
                    <div className={`glass-card rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 group`}>
                      <div className={`flex items-start gap-4 ${isEven ? "lg:flex-row-reverse" : ""}`}>
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className={isEven ? "lg:text-right" : ""}>
                          <div className="flex items-center gap-2 mb-2 lg:hidden">
                            <span className="text-xs font-bold text-primary/60">{step.number}</span>
                          </div>
                          <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                            {step.description}
                          </p>
                          <p className="text-xs text-primary/70 font-medium">{step.detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empty col for opposite side */}
                  {isEven && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
