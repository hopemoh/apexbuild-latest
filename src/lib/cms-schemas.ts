import { z } from "zod";

// ── Shared helpers ──────────────────────────────────────────────
const nonEmpty = (label: string) =>
  z.string().trim().min(1, `${label} is required`).max(500, `${label} too long`);

const url = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .max(1000, "URL too long");

// ── Hero ────────────────────────────────────────────────────────
export const heroSchema = z.object({
  badge: nonEmpty("Badge"),
  headline1: nonEmpty("Headline 1"),
  headline2: nonEmpty("Headline 2"),
  subheading: z.string().trim().min(1, "Subheading is required").max(600, "Subheading too long"),
  ctaPrimary: nonEmpty("Primary CTA"),
  ctaSecondary: nonEmpty("Secondary CTA"),
});

export const brandSchema = z.object({
  companyName: nonEmpty("Company name"),
  tagline: z.string().trim().min(1, "Tagline is required").max(300, "Tagline too long"),
});

// ── Service ─────────────────────────────────────────────────────
export const serviceSchema = z.object({
  title: nonEmpty("Title"),
  description: z.string().trim().min(1, "Description is required").max(400, "Description too long"),
  color: z.string().trim().min(1, "Color is required"),
});

// ── Project ─────────────────────────────────────────────────────
export const projectSchema = z.object({
  title: nonEmpty("Title"),
  description: z.string().trim().min(1, "Description is required").max(500, "Description too long"),
  image: url,
  category: z.enum(["Web App", "Mobile", "SaaS", "E-commerce"], { message: "Invalid category" }),
  color: z.string().trim().min(1, "Color is required"),
});

// ── Process Step ─────────────────────────────────────────────────
export const processStepSchema = z.object({
  number: nonEmpty("Step number"),
  title: nonEmpty("Title"),
  description: z.string().trim().min(1, "Description is required").max(400, "Description too long"),
  detail: z.string().trim().max(200, "Detail too long").optional(),
});

// ── Testimonial ──────────────────────────────────────────────────
export const testimonialSchema = z.object({
  name: nonEmpty("Name"),
  title: nonEmpty("Role & company"),
  avatar: url,
  rating: z.number().int().min(1).max(5),
  text: z.string().trim().min(1, "Testimonial text is required").max(600, "Too long"),
});

// ── Pricing Plan ─────────────────────────────────────────────────
export const pricingPlanSchema = z.object({
  title: nonEmpty("Plan title"),
  subtitle: nonEmpty("Subtitle"),
  price: nonEmpty("Price"),
  period: nonEmpty("Period"),
  description: z.string().trim().min(1, "Description is required").max(300, "Too long"),
  cta: nonEmpty("CTA text"),
});

// ── FAQ ──────────────────────────────────────────────────────────
export const faqSchema = z.object({
  q: nonEmpty("Question"),
  a: z.string().trim().min(1, "Answer is required").max(600, "Answer too long"),
});

// ── Contact ──────────────────────────────────────────────────────
export const contactSchema = z.object({
  email: z.string().trim().email("Must be a valid email").max(255, "Email too long"),
  phone: z.string().trim().min(1, "Phone is required").max(50, "Too long"),
  address: nonEmpty("Address"),
  addressSub: nonEmpty("City/State/Zip"),
});
