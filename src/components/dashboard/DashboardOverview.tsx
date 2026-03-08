import { Briefcase, Image, MessageSquare, HelpCircle, DollarSign, GitBranch, Type, Phone, ArrowRight } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const sectionCards = [
  { id: "hero", label: "Hero Section", icon: Type, desc: "Headline, subheading, CTA buttons & stats" },
  { id: "services", label: "Services", icon: Briefcase, desc: "Service cards with titles & descriptions" },
  { id: "projects", label: "Portfolio", icon: Image, desc: "Project showcase with images & categories" },
  { id: "process", label: "Process", icon: GitBranch, desc: "How-we-work steps & workflow" },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare, desc: "Client reviews & star ratings" },
  { id: "pricing", label: "Pricing", icon: DollarSign, desc: "Engagement models & feature lists" },
  { id: "faq", label: "FAQ", icon: HelpCircle, desc: "Frequently asked questions" },
  { id: "contact", label: "Contact", icon: Phone, desc: "Contact info & company details" },
];

interface Props {
  onNavigate: (section: string) => void;
}

export const DashboardOverview = ({ onNavigate }: Props) => {
  const { content } = useContent();

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold mb-1">Welcome to {content.companyName} CMS</h2>
        <p className="text-muted-foreground text-sm">Manage all your website content from here. Changes are saved automatically.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Services", count: content.services.length },
          { label: "Projects", count: content.projects.length },
          { label: "Testimonials", count: content.testimonials.length },
          { label: "FAQs", count: content.faqs.length },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-5">
            <p className="text-2xl font-display font-bold text-gradient">{s.count}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectionCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="glass-card rounded-2xl p-5 text-left hover:-translate-y-1 hover:shadow-elevated transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="font-display font-semibold text-sm mb-1">{card.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Edit <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
