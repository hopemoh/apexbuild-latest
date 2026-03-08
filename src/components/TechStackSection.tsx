import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const techCategories = [
  {
    label: "Frontend",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/20",
    items: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Vue.js", icon: "💚" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Tailwind CSS", icon: "🎨" },
    ],
  },
  {
    label: "Backend",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/20",
    items: [
      { name: "Node.js", icon: "🟩" },
      { name: "Python", icon: "🐍" },
      { name: "FastAPI", icon: "⚡" },
      { name: "GraphQL", icon: "◉" },
      { name: "REST APIs", icon: "🔗" },
    ],
  },
  {
    label: "Mobile",
    color: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/20",
    items: [
      { name: "React Native", icon: "📱" },
      { name: "Flutter", icon: "🐦" },
      { name: "iOS (Swift)", icon: "🍎" },
      { name: "Android (Kotlin)", icon: "🤖" },
      { name: "Expo", icon: "🚀" },
    ],
  },
  {
    label: "Infrastructure",
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/20",
    items: [
      { name: "AWS", icon: "☁️" },
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "⚙️" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Redis", icon: "🔴" },
    ],
  },
];

export const TechStackSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tech-stack" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Technologies
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Our{" "}
            <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We work with modern, battle-tested technologies to build scalable, 
            maintainable, and high-performance digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card rounded-2xl p-6 border ${cat.border} hover:shadow-elevated transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`inline-flex px-3 py-1.5 rounded-lg bg-gradient-to-br ${cat.color} text-sm font-semibold font-display mb-5`}>
                {cat.label}
              </div>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <span className="text-lg leading-none">{item.icon}</span>
                    <span className="text-sm font-medium text-foreground/80">{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Logos strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 pt-10 border-t border-border"
        >
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by companies at every stage of growth
          </p>
          <div className="flex flex-wrap gap-8 justify-center items-center opacity-40">
            {["Stripe", "AWS", "Vercel", "Supabase", "GitHub", "Figma", "Linear", "Notion"].map((brand) => (
              <span key={brand} className="font-display font-bold text-lg text-foreground/60 hover:text-foreground/90 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
