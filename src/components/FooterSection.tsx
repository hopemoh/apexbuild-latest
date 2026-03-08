import { Code2, Twitter, Linkedin, Github, Instagram, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Services: [
    "Web Development",
    "Mobile Apps",
    "SaaS Platforms",
    "UI/UX Design",
    "API Development",
    "Consulting",
  ],
  Company: [
    "About Us",
    "Portfolio",
    "Process",
    "Blog",
    "Careers",
    "Press",
  ],
  Resources: [
    "Documentation",
    "Case Studies",
    "Tech Blog",
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
  ],
};

const socials = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export const FooterSection = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-max px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">
                Dev<span className="text-gradient">Forge</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              We craft world-class digital products for startups and enterprises. 
              150+ projects delivered. 98% client satisfaction.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold mb-3">Stay updated</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-secondary/50 border-border h-10 text-sm flex-1"
                />
                <Button size="sm" className="bg-gradient-primary text-primary-foreground h-10 px-4 shadow-glow hover:opacity-90">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DevForge. All rights reserved. Built with ❤️ and ☕
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
