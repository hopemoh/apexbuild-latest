import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe, Smartphone, Cloud, Palette, Server, Lightbulb, ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Custom, high-performance websites built with modern frameworks. From marketing sites to complex web apps.",
    tags: ["React", "Next.js", "TypeScript"],
    color: "from-blue-500/20 to-blue-600/10",
    glow: "group-hover:shadow-[0_0_30px_hsl(211_100%_55%/0.2)]",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps for iOS & Android. Beautiful, performant, and user-centric.",
    tags: ["React Native", "Flutter", "iOS/Android"],
    color: "from-cyan-500/20 to-cyan-600/10",
    glow: "group-hover:shadow-[0_0_30px_hsl(188_94%_50%/0.2)]",
  },
  {
    icon: Cloud,
    title: "SaaS Development",
    description: "End-to-end SaaS platforms with authentication, billing, dashboards, and scalable infrastructure.",
    tags: ["SaaS", "Multi-tenant", "Stripe"],
    color: "from-violet-500/20 to-violet-600/10",
    glow: "group-hover:shadow-[0_0_30px_hsl(270_80%_60%/0.2)]",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centric design systems, wireframes, and prototypes that convert visitors into customers.",
    tags: ["Figma", "Design System", "Prototyping"],
    color: "from-pink-500/20 to-pink-600/10",
    glow: "group-hover:shadow-[0_0_30px_hsl(330_80%_60%/0.2)]",
  },
  {
    icon: Server,
    title: "API & Backend Development",
    description: "Robust REST and GraphQL APIs, microservices architecture, and scalable cloud infrastructure.",
    tags: ["Node.js", "Python", "PostgreSQL"],
    color: "from-emerald-500/20 to-emerald-600/10",
    glow: "group-hover:shadow-[0_0_30px_hsl(160_80%_45%/0.2)]",
  },
  {
    icon: Lightbulb,
    title: "Product Strategy & Consulting",
    description: "Technical discovery, roadmap planning, architecture review, and startup advisory services.",
    tags: ["Discovery", "Roadmap", "CTO Advisory"],
    color: "from-amber-500/20 to-amber-600/10",
    glow: "group-hover:shadow-[0_0_30px_hsl(45_90%_55%/0.2)]",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-max" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Services That{" "}
            <span className="text-gradient">Drive Growth</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We offer end-to-end digital product development — from strategy and design to 
            engineering and ongoing support.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className={`group glass-card rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${service.glow}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3 group-hover:text-gradient transition-all">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-md bg-secondary text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
