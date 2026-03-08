import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Type, Briefcase, Image, GitBranch,
  MessageSquare, DollarSign, HelpCircle, Phone, LogOut,
  ChevronRight, Code2, Menu, X, RotateCcw, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { useAuth } from "@/context/AuthContext";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { DashboardServices } from "@/components/dashboard/DashboardServices";
import { DashboardProjects } from "@/components/dashboard/DashboardProjects";
import { DashboardProcess } from "@/components/dashboard/DashboardProcess";
import { DashboardTestimonials } from "@/components/dashboard/DashboardTestimonials";
import { DashboardPricing } from "@/components/dashboard/DashboardPricing";
import { DashboardFAQ } from "@/components/dashboard/DashboardFAQ";
import { DashboardContact } from "@/components/dashboard/DashboardContact";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "hero", label: "Hero Section", icon: Type },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "projects", label: "Portfolio", icon: Image },
  { id: "process", label: "Process", icon: GitBranch },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "contact", label: "Contact", icon: Phone },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { content, resetContent, saving, loading } = useContent();
  const { signOut, user } = useAuth();

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <DashboardOverview onNavigate={setActiveSection} />;
      case "hero": return <DashboardHero />;
      case "services": return <DashboardServices />;
      case "projects": return <DashboardProjects />;
      case "process": return <DashboardProcess />;
      case "testimonials": return <DashboardTestimonials />;
      case "pricing": return <DashboardPricing />;
      case "faq": return <DashboardFAQ />;
      case "contact": return <DashboardContact />;
      default: return <DashboardOverview onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 bg-card border-r border-border flex flex-col transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-border flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0">
            <Code2 className="w-4 h-4 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <span className="font-display font-bold text-base">
              Moh<span className="text-gradient">Stack</span>
              <span className="text-xs text-muted-foreground font-normal ml-1.5">CMS</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && <span className="truncate">{item.label}</span>}
                {sidebarOpen && isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-2 border-t border-border space-y-1">
          {sidebarOpen && user && (
            <p className="text-xs text-muted-foreground px-3 py-1 truncate">{user.email}</p>
          )}
          <button
            onClick={() => window.open("/", "_blank")}
            title={!sidebarOpen ? "View Site" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>View Site</span>}
          </button>
          <button
            onClick={() => { if (confirm("Reset all content to defaults?")) resetContent(); }}
            title={!sidebarOpen ? "Reset Content" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <RotateCcw className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Reset Content</span>}
          </button>
          <button
            onClick={() => { if (confirm("Sign out of the CMS?")) signOut(); }}
            title={!sidebarOpen ? "Sign Out" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}>
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="font-display font-semibold text-base">
                {navItems.find((n) => n.id === activeSection)?.label ?? "Dashboard"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {content.companyName} · Content Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/60 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Auto-saved
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {renderSection()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
