import React, { createContext, useContext, useState, useEffect } from "react";

// ---- Types ----
export interface HeroStat { value: string; label: string; }
export interface HeroPill { text: string; }
export interface HeroContent {
  badge: string;
  headline1: string;
  headline2: string;
  subheading: string;
  ctaPrimary: string;
  ctaSecondary: string;
  pills: HeroPill[];
  stats: HeroStat[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  color: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  text: string;
}

export interface PricingPlan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export interface FAQItem {
  id: string;
  q: string;
  a: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  addressSub: string;
}

export interface SiteContent {
  companyName: string;
  tagline: string;
  hero: HeroContent;
  services: Service[];
  projects: Project[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  pricing: PricingPlan[];
  faqs: FAQItem[];
  contact: ContactInfo;
}

// ---- Default content ----
const defaultContent: SiteContent = {
  companyName: "MohStack",
  tagline: "We craft world-class digital products for startups and enterprises. 150+ projects delivered. 98% client satisfaction.",
  hero: {
    badge: "Award-Winning Digital Agency",
    headline1: "We Build Powerful",
    headline2: "Websites, Apps & Digital Products",
    subheading: "From concept to launch — we craft high-performance web apps, mobile applications, SaaS platforms and custom software that drive real business growth.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "Get a Quote",
    pills: [
      { text: "Full-Stack Development" },
      { text: "Fast Delivery" },
      { text: "AI-Powered Solutions" },
    ],
    stats: [
      { value: "150+", label: "Projects Delivered" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "50+", label: "Expert Engineers" },
      { value: "8+", label: "Years of Excellence" },
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
    { id: "pr1", number: "01", title: "Discovery", description: "We deep-dive into your business goals, target audience, technical requirements, and competitive landscape to build a solid foundation.", detail: "Requirements analysis, stakeholder interviews, market research" },
    { id: "pr2", number: "02", title: "Planning", description: "We create a detailed project roadmap, technical architecture, timeline, and resource allocation plan for transparent execution.", detail: "Sprint planning, architecture design, timeline estimation" },
    { id: "pr3", number: "03", title: "Design", description: "Our designers craft intuitive wireframes, interactive prototypes, and a polished design system that aligns with your brand.", detail: "UI/UX design, prototyping, design system, user testing" },
    { id: "pr4", number: "04", title: "Development", description: "Agile development with weekly demos, CI/CD pipelines, and rigorous code reviews ensuring quality at every sprint.", detail: "Agile sprints, code reviews, CI/CD, daily standups" },
    { id: "pr5", number: "05", title: "Testing", description: "Comprehensive QA across devices, browsers, and scenarios including performance, security, and accessibility testing.", detail: "QA testing, security audit, performance optimization" },
    { id: "pr6", number: "06", title: "Launch & Support", description: "Smooth deployment to production, monitoring setup, and ongoing support to ensure your product succeeds long-term.", detail: "Deployment, monitoring, 24/7 support, iteration" },
  ],
  testimonials: [
    { id: "t1", name: "Sarah Mitchell", title: "CEO, FinFlow Inc.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", rating: 5, text: "MohStack transformed our vision into a stunning fintech dashboard. Their team's attention to detail and proactive communication made the entire process seamless. We launched 2 weeks ahead of schedule!" },
    { id: "t2", name: "Marcus Thompson", title: "CTO, QuickBite", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", rating: 5, text: "The mobile app they built for us handles 50,000+ daily active users without a hiccup. The code quality is exceptional and their post-launch support has been outstanding." },
    { id: "t3", name: "Priya Patel", title: "Founder, TradeHub", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face", rating: 5, text: "We needed a complex B2B marketplace built fast. MohStack delivered a world-class product in just 4 months. Our conversion rate increased by 340% after launch." },
    { id: "t4", name: "James Okonkwo", title: "VP Engineering, LogiTrack", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", rating: 5, text: "Their backend architecture is rock-solid. Our logistics platform processes millions of data points daily and the system has maintained 99.99% uptime. Truly enterprise-grade work." },
    { id: "t5", name: "Emily Chen", title: "Product Manager, TeamSync", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", rating: 5, text: "The UI/UX work MohStack did for our SaaS reduced our onboarding time by 60%. Every interaction feels polished. Our NPS score jumped from 32 to 71 after the redesign." },
    { id: "t6", name: "David Larsson", title: "Founder, StyleVault", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", rating: 5, text: "From strategy to launch, MohStack was our trusted partner. They don't just build what you ask for — they challenge your assumptions and deliver something even better." },
  ],
  pricing: [
    { id: "pl1", title: "Fixed Price", subtitle: "Best for defined projects", price: "From $5,000", period: "per project", description: "Ideal for projects with clear scope and requirements. We agree on fixed cost and timeline upfront.", features: ["Detailed project scoping", "Fixed timeline & budget", "Milestone-based payments", "Full project documentation", "3 months post-launch support", "Source code ownership"], cta: "Get a Quote", highlight: false },
    { id: "pl2", title: "Dedicated Team", subtitle: "Most popular", price: "From $8,000", period: "per month", description: "Get a dedicated team of engineers, designers, and a PM working exclusively on your product.", features: ["2-8 dedicated developers", "Agile sprints & daily standups", "Full-time project manager", "UI/UX designer included", "Priority Slack support", "Monthly performance reports", "Scale team up or down"], cta: "Start Building", highlight: true },
    { id: "pl3", title: "Hourly / Consulting", subtitle: "Flexible engagement", price: "$75–$120", period: "per hour", description: "Perfect for ongoing work, code reviews, technical consulting, and smaller tasks.", features: ["Senior engineer access", "No long-term commitment", "Weekly billing", "Technical consulting", "Code audits & reviews", "Architecture advisory"], cta: "Book a Call", highlight: false },
  ],
  faqs: [
    { id: "f1", q: "How long does it take to build a web application?", a: "Timeline depends on complexity. A simple web app takes 6–10 weeks, while a full SaaS platform with integrations can take 4–6 months. We always provide a detailed estimate after discovery." },
    { id: "f2", q: "Do you work with startups and early-stage companies?", a: "Absolutely! We love working with startups. We offer MVP development packages to help you validate your idea quickly and cost-effectively before scaling." },
    { id: "f3", q: "Who owns the code after the project?", a: "You do — 100%. All source code, assets, and documentation are transferred to you upon project completion and final payment." },
    { id: "f4", q: "Can you take over an existing project?", a: "Yes. We regularly inherit legacy codebases. Our team does a thorough technical audit, then we create a plan to stabilize, modernize, and scale your existing product." },
    { id: "f5", q: "What does the development process look like?", a: "We follow an agile methodology with 2-week sprints. You'll get weekly demos, a dedicated Slack channel, and access to our project management tool for full transparency." },
    { id: "f6", q: "Do you provide post-launch support?", a: "Yes. Every project includes a support period (1–6 months depending on the plan). After that, we offer retainer-based support packages for ongoing maintenance and new features." },
    { id: "f7", q: "How do payments work?", a: "For fixed-price projects, we typically split into: 30% upfront, 40% at design approval/development midpoint, and 30% at launch. Dedicated teams are billed monthly." },
    { id: "f8", q: "What industries do you specialize in?", a: "We've built products across fintech, healthtech, logistics, e-commerce, edtech, and enterprise SaaS. Our diverse experience means we understand domain-specific challenges." },
  ],
  contact: {
    email: "hello@mohstack.io",
    phone: "+1 (555) 234-5678",
    address: "123 Tech Boulevard",
    addressSub: "San Francisco, CA 94102",
  },
};

// ---- Context ----
interface ContentContextValue {
  content: SiteContent;
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

const STORAGE_KEY = "mohstack_cms_content";

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateContent = (updates: Partial<SiteContent>) =>
    setContent((prev) => ({ ...prev, ...updates }));

  const updateHero = (updates: Partial<HeroContent>) =>
    setContent((prev) => ({ ...prev, hero: { ...prev.hero, ...updates } }));

  const updateService = (id: string, updates: Partial<Service>) =>
    setContent((prev) => ({ ...prev, services: prev.services.map((s) => s.id === id ? { ...s, ...updates } : s) }));

  const addService = () =>
    setContent((prev) => ({ ...prev, services: [...prev.services, { id: `s${Date.now()}`, title: "New Service", description: "Service description", color: "from-blue-500/20 to-blue-600/10" }] }));

  const deleteService = (id: string) =>
    setContent((prev) => ({ ...prev, services: prev.services.filter((s) => s.id !== id) }));

  const updateProject = (id: string, updates: Partial<Project>) =>
    setContent((prev) => ({ ...prev, projects: prev.projects.map((p) => p.id === id ? { ...p, ...updates } : p) }));

  const addProject = () =>
    setContent((prev) => ({ ...prev, projects: [...prev.projects, { id: `p${Date.now()}`, title: "New Project", description: "Project description", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop", category: "Web App", color: "from-blue-500/30 to-cyan-500/20" }] }));

  const deleteProject = (id: string) =>
    setContent((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));

  const updateProcessStep = (id: string, updates: Partial<ProcessStep>) =>
    setContent((prev) => ({ ...prev, process: prev.process.map((s) => s.id === id ? { ...s, ...updates } : s) }));

  const addProcessStep = () =>
    setContent((prev) => ({ ...prev, process: [...prev.process, { id: `pr${Date.now()}`, number: `0${prev.process.length + 1}`, title: "New Step", description: "Step description", detail: "Step details" }] }));

  const deleteProcessStep = (id: string) =>
    setContent((prev) => ({ ...prev, process: prev.process.filter((s) => s.id !== id) }));

  const updateTestimonial = (id: string, updates: Partial<Testimonial>) =>
    setContent((prev) => ({ ...prev, testimonials: prev.testimonials.map((t) => t.id === id ? { ...t, ...updates } : t) }));

  const addTestimonial = () =>
    setContent((prev) => ({ ...prev, testimonials: [...prev.testimonials, { id: `t${Date.now()}`, name: "Client Name", title: "Role, Company", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", rating: 5, text: "Testimonial text here." }] }));

  const deleteTestimonial = (id: string) =>
    setContent((prev) => ({ ...prev, testimonials: prev.testimonials.filter((t) => t.id !== id) }));

  const updatePricingPlan = (id: string, updates: Partial<PricingPlan>) =>
    setContent((prev) => ({ ...prev, pricing: prev.pricing.map((p) => p.id === id ? { ...p, ...updates } : p) }));

  const addPricingFeature = (planId: string) =>
    setContent((prev) => ({ ...prev, pricing: prev.pricing.map((p) => p.id === planId ? { ...p, features: [...p.features, "New feature"] } : p) }));

  const removePricingFeature = (planId: string, index: number) =>
    setContent((prev) => ({ ...prev, pricing: prev.pricing.map((p) => p.id === planId ? { ...p, features: p.features.filter((_, i) => i !== index) } : p) }));

  const updatePricingFeature = (planId: string, index: number, value: string) =>
    setContent((prev) => ({ ...prev, pricing: prev.pricing.map((p) => p.id === planId ? { ...p, features: p.features.map((f, i) => i === index ? value : f) } : p) }));

  const updateFAQ = (id: string, updates: Partial<FAQItem>) =>
    setContent((prev) => ({ ...prev, faqs: prev.faqs.map((f) => f.id === id ? { ...f, ...updates } : f) }));

  const addFAQ = () =>
    setContent((prev) => ({ ...prev, faqs: [...prev.faqs, { id: `f${Date.now()}`, q: "New Question?", a: "Answer here." }] }));

  const deleteFAQ = (id: string) =>
    setContent((prev) => ({ ...prev, faqs: prev.faqs.filter((f) => f.id !== id) }));

  const updateContact = (updates: Partial<ContactInfo>) =>
    setContent((prev) => ({ ...prev, contact: { ...prev.contact, ...updates } }));

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider value={{
      content, updateContent, updateHero,
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
