import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";

const categories = ["All", "Web App", "Mobile", "SaaS", "E-commerce"];

export const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content } = useContent();

  const filtered = activeFilter === "All"
    ? content.projects
    : content.projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects we've delivered across industries. Every product tells a story of collaboration and excellence.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-gradient-primary text-primary-foreground shadow-glow scale-105"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-elevated"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} z-10`} />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                />
                <div className="absolute top-3 right-3 z-20">
                  <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium border border-border">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>
                <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all">
                  View Case Study <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-secondary"
          >
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
