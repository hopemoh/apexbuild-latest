import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";

// ---- Types ----
export interface HeroStat { value: string; label: string; }
export interface HeroPill { text: string; }
export interface HeroContent {
  badge: string; headline1: string; headline2: string; subheading: string;
  ctaPrimary: string; ctaSecondary: string; pills: HeroPill[]; stats: HeroStat[];
}
export interface Service { id: string; title: string; description: string; color: string; }
export interface Project { id: string; title: string; description: string; image: string; category: string; color: string; }
export interface ProcessStep { id: string; number: string; title: string; description: string; detail: string; }
export interface Testimonial { id: string; name: string; title: string; avatar: string; rating: number; text: string; }
export interface PricingPlan { id: string; title: string; subtitle: string; price: string; period: string; description: string; features: string[]; cta: string; highlight: boolean; }
export interface FAQItem { id: string; q: string; a: string; }
export interface ContactInfo { email: string; phone: string; address: string; addressSub: string; }
export interface SiteContent {
  companyName: string; tagline: string; hero: HeroContent;
  services: Service[]; projects: Project[]; process: ProcessStep[];
  testimonials: Testimonial[]; pricing: PricingPlan[]; faqs: FAQItem[]; contact: ContactInfo;
}

// ---- Default content ----
export const defaultContent: SiteContent = {
  companyName: "RoWiCodeTech",
  tagline: "We craft world-class digital products for startups and enterprises. 150+ projects delivered. 98% client satisfaction.",
  hero: {
    badge: "Digital Agency",
    headline1: "We Build Powerful",
    headline2: "Websites, Apps & Digital Products",
    subheading: "From concept to launch — we craft high-performance web apps, mobile applications, SaaS platforms and custom software that drive real business growth.",
    ctaPrimary: "Start a Project", ctaSecondary: "Get a Quote",
    pills: [{ text: "Full-Stack Development" }, { text: "Fast Delivery" }, { text: "AI-Powered Solutions" }],
    stats: [
      { value: "150+", label: "Projects Delivered" }, { value: "98%", label: "Client Satisfaction" },
      { value: "50+", label: "Expert Engineers" }, { value: "8+", label: "Years of Excellence" },
    ],
  },
  services: [
    { id: "s1", title: "Website Development", description: "Custom, high-performance websites built with modern frameworks. From marketing sites to complex web apps.", color: "from-blue-500/20 to-blue-600/10" },
    { id: "s2", title: "Mobile App Development", description: "Native and cross-platform mobile apps for iOS & Android. Beautiful, performant, and user-centric.", color: "from-cyan-500/20 to-cyan-600/10" },
    { id: "s3", title: "SaaS Development", description: "End-to-end SaaS platforms with authentication, billing, dashboards, and scalable infrastructure.", color: "from-violet-500/20 to-violet-600/10" },
    { id: "s4", title: "UI/UX Design", description: "User-centric design systems, wireframes, and prototypes that convert visitors into customers.", color: "from-pink-500/20 to-pink-600/10" },
    { id: "s5", title: "API & Backend Development", description: "Robust REST and GraphQL APIs, microservices architecture, and scalable cloud infrastructure.", color: "from-emerald-500/20 to-emerald-600/10" },
    { id: "s6", title: "Product Strategy & Consulting", description: "Technical discovery, roadmap planning, architecture review, and startup advisory services.", color: "from-amber-500/20 to-amber-600/10" },
  ],
  projects: [
    { id: "p1", title: "FinFlow Dashboard", description: "A comprehensive fintech analytics platform with real-time data visualization, portfolio management, and AI-powered insights.", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", category: "Web App", color: "from-blue-500/30 to-cyan-500/20" },
    { id: "p2", title: "QuickBite Food App", description: "A full-featured food delivery mobile app with real-time tracking, payment gateway, and restaurant management system.", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop", category: "Mobile", color: "from-orange-500/30 to-amber-500/20" },
    { id: "p3", title: "TradeHub Marketplace", description: "A B2B marketplace platform connecting suppliers and buyers with smart matching, escrow payments, and analytics.", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop", category: "E-commerce", color: "from-violet-500/30 to-purple-500/20" },
    { id: "p4", title: "LogiTrack System", description: "Enterprise logistics and fleet management system with GPS tracking, route optimization, and driver performance analytics.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop", category: "Web App", color: "from-emerald-500/30 to-green-500/20" },
    { id: "p5", title: "TeamSync SaaS", description: "A project management SaaS with real-time collaboration, time tracking, invoicing, and team analytics.", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop", category: "SaaS", color: "from-pink-500/30 to-rose-500/20" },
    { id: "p6", title: "StyleVault E-Shop", description: "A premium fashion e-commerce platform with AR try-on, personalized recommendations, and seamless checkout.", image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop", category: "E-commerce", color: "from-cyan-500/30 to-teal-500/20" },
  ],
  process: [
    { id: "pr1", number: "01", title: "Discovery", description: "We deep-dive into your business goals, target audience, technical requirements, and competitive landscape.", detail: "Requirements analysis, stakeholder interviews, market research" },
    { id: "pr2", number: "02", title: "Planning", description: "We create a detailed project roadmap, technical architecture, timeline, and resource allocation plan.", detail: "Sprint planning, architecture design, timeline estimation" },
    { id: "pr3", number: "03", title: "Design", description: "Our designers craft intuitive wireframes, interactive prototypes, and a polished design system.", detail: "UI/UX design, prototyping, design system, user testing" },
    { id: "pr4", number: "04", title: "Development", description: "Agile development with weekly demos, CI/CD pipelines, and rigorous code reviews.", detail: "Agile sprints, code reviews, CI/CD, daily standups" },
    { id: "pr5", number: "05", title: "Testing", description: "Comprehensive QA across devices, browsers, and scenarios including performance, security, and accessibility.", detail: "QA testing, security audit, performance optimization" },
    { id: "pr6", number: "06", title: "Launch & Support", description: "Smooth deployment to production, monitoring setup, and ongoing support to ensure your product succeeds.", detail: "Deployment, monitoring, 24/7 support, iteration" },
  ],
  testimonials: [
    { id: "t1", name: "Sarah Mitchell", title: "CEO, FinFlow Inc.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", rating: 5, text: "ApexBuild transformed our vision into a stunning fintech dashboard. Their team's attention to detail and proactive communication made the entire process seamless. We launched 2 weeks ahead of schedule!" },
    { id: "t2", name: "Marcus Thompson", title: "CTO, QuickBite", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", rating: 5, text: "The mobile app they built for us handles 50,000+ daily active users without a hiccup. The code quality is exceptional and their post-launch support has been outstanding." },
    { id: "t3", name: "Priya Patel", title: "Founder, TradeHub", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face", rating: 5, text: "We needed a complex B2B marketplace built fast. ApexBuild delivered a world-class product in just 4 months. Our conversion rate increased by 340% after launch." },
    { id: "t4", name: "James Okonkwo", title: "VP Engineering, LogiTrack", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", rating: 5, text: "Their backend architecture is rock-solid. Our logistics platform processes millions of data points daily and the system has maintained 99.99% uptime. Truly enterprise-grade work." },
    { id: "t5", name: "Emily Chen", title: "Product Manager, TeamSync", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", rating: 5, text: "The UI/UX work ApexBuild did for our SaaS reduced our onboarding time by 60%. Every interaction feels polished. Our NPS score jumped from 32 to 71 after the redesign." },
    { id: "t6", name: "David Larsson", title: "Founder, StyleVault", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", rating: 5, text: "From strategy to launch, ApexBuild was our trusted partner. They don't just build what you ask for — they challenge your assumptions and deliver something even better." },
  ],
  pricing: [
    { id: "pl1", title: "Fixed Price", subtitle: "Best for defined projects", price: "From $5,000", period: "per project", description: "Ideal for projects with clear scope and requirements.", features: ["Detailed project scoping", "Fixed timeline & budget", "Milestone-based payments", "Full project documentation", "3 months post-launch support", "Source code ownership"], cta: "Get a Quote", highlight: false },
    { id: "pl2", title: "Dedicated Team", subtitle: "Most popular", price: "From $8,000", period: "per month", description: "Get a dedicated team of engineers, designers, and a PM working exclusively on your product.", features: ["2-8 dedicated developers", "Agile sprints & daily standups", "Full-time project manager", "UI/UX designer included", "Priority Slack support", "Monthly performance reports", "Scale team up or down"], cta: "Start Building", highlight: true },
    { id: "pl3", title: "Hourly / Consulting", subtitle: "Flexible engagement", price: "$75–$120", period: "per hour", description: "Perfect for ongoing work, code reviews, technical consulting, and smaller tasks.", features: ["Senior engineer access", "No long-term commitment", "Weekly billing", "Technical consulting", "Code audits & reviews", "Architecture advisory"], cta: "Book a Call", highlight: false },
  ],
  faqs: [
    { id: "f1", q: "How long does it take to build a web application?", a: "Timeline depends on complexity. A simple web app takes 6–10 weeks, while a full SaaS platform can take 4–6 months." },
    { id: "f2", q: "Do you work with startups and early-stage companies?", a: "Absolutely! We love working with startups. We offer MVP development packages to help you validate your idea quickly." },
    { id: "f3", q: "Who owns the code after the project?", a: "You do — 100%. All source code, assets, and documentation are transferred to you upon project completion and final payment." },
    { id: "f4", q: "Can you take over an existing project?", a: "Yes. We regularly inherit legacy codebases. Our team does a thorough technical audit, then create a plan to stabilize and scale." },
    { id: "f5", q: "What does the development process look like?", a: "We follow an agile methodology with 2-week sprints. You'll get weekly demos, a dedicated Slack channel, and full transparency." },
    { id: "f6", q: "Do you provide post-launch support?", a: "Yes. Every project includes a support period. After that, we offer retainer-based support packages for ongoing maintenance." },
    { id: "f7", q: "How do payments work?", a: "For fixed-price projects: 30% upfront, 40% at midpoint, and 30% at launch. Dedicated teams are billed monthly." },
    { id: "f8", q: "What industries do you specialize in?", a: "We've built products across fintech, healthtech, logistics, e-commerce, edtech, and enterprise SaaS." },
  ],
  contact: { email: "hello@ApexBuild.io", phone: "+1 (555) 234-5678", address: "123 Tech Boulevard", addressSub: "San Francisco, CA 94102" },
};

// ---- Context ----
interface ContentContextValue {
  content: SiteContent;
  loading: boolean;
  saving: boolean;
  updateContent: (updates: Partial<SiteContent>) => void;
  updateHero: (updates: Partial<HeroContent>) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  addService: () => void;
  deleteService: (id: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addProject: () => void;
  deleteProject: (id: string) => void;
  updateProcessStep: (id: string, updates: Partial<ProcessStep>) => void;
  addProcessStep: () => void;
  deleteProcessStep: (id: string) => void;
  updateTestimonial: (id: string, updates: Partial<Testimonial>) => void;
  addTestimonial: () => void;
  deleteTestimonial: (id: string) => void;
  updatePricingPlan: (id: string, updates: Partial<PricingPlan>) => void;
  addPricingFeature: (planId: string) => void;
  removePricingFeature: (planId: string, index: number) => void;
  updatePricingFeature: (planId: string, index: number, value: string) => void;
  updateFAQ: (id: string, updates: Partial<FAQItem>) => void;
  addFAQ: () => void;
  deleteFAQ: (id: string) => void;
  updateContact: (updates: Partial<ContactInfo>) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);
const SLUG = "default";
const DEBOUNCE_MS = 1200;

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track whether the DB row already exists so we know to INSERT vs UPSERT
  const existsRef = useRef(false);

  // ── Load from DB on mount ────────────────────────────────────
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("data")
        .eq("slug", SLUG)
        .maybeSingle();

      if (!error && data?.data) {
        existsRef.current = true;
        setContent((prev) => ({ ...defaultContent, ...prev, ...(data.data as Partial<SiteContent>) }));
      }
      setLoading(false);
    })();
  }, []);

  // ── Debounced save to DB ─────────────────────────────────────
  const persistToDB = useCallback((next: SiteContent) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSaving(true);
      await supabase.from("site_content").upsert(
        [{ slug: SLUG, data: next as unknown as import("@/integrations/supabase/types").Json }],
        { onConflict: "slug" }
      );
      existsRef.current = true;
      setSaving(false);
    }, DEBOUNCE_MS);
  }, []);

  const update = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(prev);
      persistToDB(next);
      return next;
    });
  }, [persistToDB]);

  // ── Helpers ──────────────────────────────────────────────────
  const updateContent = (u: Partial<SiteContent>) => update((p) => ({ ...p, ...u }));
  const updateHero = (u: Partial<HeroContent>) => update((p) => ({ ...p, hero: { ...p.hero, ...u } }));
  const updateService = (id: string, u: Partial<Service>) => update((p) => ({ ...p, services: p.services.map((s) => s.id === id ? { ...s, ...u } : s) }));
  const addService = () => update((p) => ({ ...p, services: [...p.services, { id: `s${Date.now()}`, title: "New Service", description: "Service description", color: "from-blue-500/20 to-blue-600/10" }] }));
  const deleteService = (id: string) => update((p) => ({ ...p, services: p.services.filter((s) => s.id !== id) }));
  const updateProject = (id: string, u: Partial<Project>) => update((p) => ({ ...p, projects: p.projects.map((x) => x.id === id ? { ...x, ...u } : x) }));
  const addProject = () => update((p) => ({ ...p, projects: [...p.projects, { id: `p${Date.now()}`, title: "New Project", description: "Project description", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", category: "Web App", color: "from-blue-500/30 to-cyan-500/20" }] }));
  const deleteProject = (id: string) => update((p) => ({ ...p, projects: p.projects.filter((x) => x.id !== id) }));
  const updateProcessStep = (id: string, u: Partial<ProcessStep>) => update((p) => ({ ...p, process: p.process.map((s) => s.id === id ? { ...s, ...u } : s) }));
  const addProcessStep = () => update((p) => ({ ...p, process: [...p.process, { id: `pr${Date.now()}`, number: `0${p.process.length + 1}`, title: "New Step", description: "Step description", detail: "Step details" }] }));
  const deleteProcessStep = (id: string) => update((p) => ({ ...p, process: p.process.filter((s) => s.id !== id) }));
  const updateTestimonial = (id: string, u: Partial<Testimonial>) => update((p) => ({ ...p, testimonials: p.testimonials.map((t) => t.id === id ? { ...t, ...u } : t) }));
  const addTestimonial = () => update((p) => ({ ...p, testimonials: [...p.testimonials, { id: `t${Date.now()}`, name: "Client Name", title: "Role, Company", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", rating: 5, text: "Testimonial text here." }] }));
  const deleteTestimonial = (id: string) => update((p) => ({ ...p, testimonials: p.testimonials.filter((t) => t.id !== id) }));
  const updatePricingPlan = (id: string, u: Partial<PricingPlan>) => update((p) => ({ ...p, pricing: p.pricing.map((x) => x.id === id ? { ...x, ...u } : x) }));
  const addPricingFeature = (planId: string) => update((p) => ({ ...p, pricing: p.pricing.map((x) => x.id === planId ? { ...x, features: [...x.features, "New feature"] } : x) }));
  const removePricingFeature = (planId: string, i: number) => update((p) => ({ ...p, pricing: p.pricing.map((x) => x.id === planId ? { ...x, features: x.features.filter((_, idx) => idx !== i) } : x) }));
  const updatePricingFeature = (planId: string, i: number, value: string) => update((p) => ({ ...p, pricing: p.pricing.map((x) => x.id === planId ? { ...x, features: x.features.map((f, idx) => idx === i ? value : f) } : x) }));
  const updateFAQ = (id: string, u: Partial<FAQItem>) => update((p) => ({ ...p, faqs: p.faqs.map((f) => f.id === id ? { ...f, ...u } : f) }));
  const addFAQ = () => update((p) => ({ ...p, faqs: [...p.faqs, { id: `f${Date.now()}`, q: "New Question?", a: "Answer here." }] }));
  const deleteFAQ = (id: string) => update((p) => ({ ...p, faqs: p.faqs.filter((f) => f.id !== id) }));
  const updateContact = (u: Partial<ContactInfo>) => update((p) => ({ ...p, contact: { ...p.contact, ...u } }));
  const resetContent = () => update(() => defaultContent);

  return (
    <ContentContext.Provider value={{
      content, loading, saving,
      updateContent, updateHero,
      updateService, addService, deleteService,
      updateProject, addProject, deleteProject,
      updateProcessStep, addProcessStep, deleteProcessStep,
      updateTestimonial, addTestimonial, deleteTestimonial,
      updatePricingPlan, addPricingFeature, removePricingFeature, updatePricingFeature,
      updateFAQ, addFAQ, deleteFAQ,
      updateContact, resetContent,
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
};
