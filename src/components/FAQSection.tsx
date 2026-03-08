import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does it take to build a web application?",
    a: "Timeline depends on complexity. A simple web app takes 6–10 weeks, while a full SaaS platform with integrations can take 4–6 months. We always provide a detailed estimate after discovery.",
  },
  {
    q: "Do you work with startups and early-stage companies?",
    a: "Absolutely! We love working with startups. We offer MVP development packages to help you validate your idea quickly and cost-effectively before scaling.",
  },
  {
    q: "Who owns the code after the project?",
    a: "You do — 100%. All source code, assets, and documentation are transferred to you upon project completion and final payment.",
  },
  {
    q: "Can you take over an existing project?",
    a: "Yes. We regularly inherit legacy codebases. Our team does a thorough technical audit, then we create a plan to stabilize, modernize, and scale your existing product.",
  },
  {
    q: "What does the development process look like?",
    a: "We follow an agile methodology with 2-week sprints. You'll get weekly demos, a dedicated Slack channel, and access to our project management tool for full transparency.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes. Every project includes a support period (1–6 months depending on the plan). After that, we offer retainer-based support packages for ongoing maintenance and new features.",
  },
  {
    q: "How do payments work?",
    a: "For fixed-price projects, we typically split into: 30% upfront, 40% at design approval/development midpoint, and 30% at launch. Dedicated teams are billed monthly.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We've built products across fintech, healthtech, logistics, e-commerce, edtech, and enterprise SaaS. Our diverse experience means we understand domain-specific challenges.",
  },
];

export const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about working with us. Can't find your answer?{" "}
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-primary hover:underline"
            >
              Reach out directly.
            </button>
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-secondary/40 transition-colors"
              >
                <span className="font-semibold text-foreground/90">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
