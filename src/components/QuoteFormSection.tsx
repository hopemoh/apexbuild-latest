import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const QuoteFormSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [budget, setBudget] = useState("");
  const [service, setService] = useState("");
  const [timeline, setTimeline] = useState("");

  const [selectedPlan, setSelectedPlan] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    if (plan) setSelectedPlan(plan);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("leads").insert({
      type: "quote",
      name: data.get("name") as string,
      email: data.get("email") as string,
      company: (data.get("company") as string) || null,
      budget: budget || null,
      service: service || null,
      timeline: timeline || null,
      subject: selectedPlan || null,
      message: data.get("description") as string,
    });
    if (error) console.error("Lead insert error:", error);

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="quote" className="section-padding" style={{ background: "var(--gradient-subtle)" }}>
      <div className="container-max" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Get Started
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Request a{" "}
            <span className="text-gradient">Free Quote</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours with a detailed proposal.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold mb-2">Quote Request Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you! We'll review your project details and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                 {selectedPlan && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                    <p className="text-sm text-foreground">
                      Selected plan:{" "}
                      <span className="font-semibold text-primary">{selectedPlan}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan("")}
                      className="ml-auto text-muted-foreground hover:text-foreground text-xs"
                    >
                      ✕
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" placeholder="John Smith" required className="bg-secondary/50 border-border h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" placeholder="john@company.com" required className="bg-secondary/50 border-border h-11" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" name="company" placeholder="Your Company" className="bg-secondary/50 border-border h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="bg-secondary/50 border-border h-11">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under $5,000">Under $5,000</SelectItem>
                        <SelectItem value="$5,000 – $15,000">$5,000 – $15,000</SelectItem>
                        <SelectItem value="$15,000 – $50,000">$15,000 – $50,000</SelectItem>
                        <SelectItem value="$50,000 – $100,000">$50,000 – $100,000</SelectItem>
                        <SelectItem value="$100,000+">$100,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Service Needed</Label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="bg-secondary/50 border-border h-11">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Website Development">Website Development</SelectItem>
                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                        <SelectItem value="SaaS Platform">SaaS Platform</SelectItem>
                        <SelectItem value="E-commerce">E-commerce</SelectItem>
                        <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                        <SelectItem value="API / Backend">API / Backend</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timeline</Label>
                    <Select value={timeline} onValueChange={setTimeline}>
                      <SelectTrigger className="bg-secondary/50 border-border h-11">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ASAP">ASAP</SelectItem>
                        <SelectItem value="1–3 months">1–3 months</SelectItem>
                        <SelectItem value="3–6 months">3–6 months</SelectItem>
                        <SelectItem value="6+ months">6+ months</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell us about your project — what you're building, who it's for, and what problem it solves..."
                    required
                    rows={5}
                    className="bg-secondary/50 border-border resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full bg-gradient-primary text-primary-foreground font-semibold py-6 rounded-xl shadow-glow hover:opacity-90 transition-opacity text-base"
                >
                  {submitting ? "Sending…" : "Request Quote"} <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
