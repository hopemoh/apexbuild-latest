import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";
import { faqSchema } from "@/lib/cms-schemas";
import { FAQItem } from "@/context/ContentContext";

type FAQForm = z.infer<typeof faqSchema>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

function FAQCard({ faq, index }: { faq: FAQItem; index: number }) {
  const { updateFAQ, deleteFAQ } = useContent();
  const { register, formState: { errors }, setValue } = useForm<FAQForm>({
    resolver: zodResolver(faqSchema),
    defaultValues: { q: faq.q, a: faq.a },
    mode: "onChange",
  });

  useEffect(() => { setValue("q", faq.q); setValue("a", faq.a); }, [faq.q, faq.a]);

  const handleChange = (field: keyof FAQForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(field, e.target.value, { shouldValidate: true });
    if (!errors[field]) updateFAQ(faq.id, { [field]: e.target.value });
  };

  return (
    <CMSCard
      title={`Q${index + 1}`}
      actions={
        <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteFAQ(faq.id)}>
          <Trash2 className="w-4 h-4 mr-1.5" /> Remove
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label>Question</Label>
          <Input {...register("q")} onChange={handleChange("q")} className="bg-secondary/50" />
          <FieldError msg={errors.q?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Answer</Label>
          <Textarea {...register("a")} onChange={handleChange("a")} rows={3} className="bg-secondary/50 resize-none" />
          <FieldError msg={errors.a?.message} />
        </div>
      </div>
    </CMSCard>
  );
}

export const DashboardFAQ = () => {
  const { content, addFAQ } = useContent();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-display font-bold text-lg">FAQ Items</h2>
          <p className="text-sm text-muted-foreground">{content.faqs.length} questions</p>
        </div>
        <Button onClick={addFAQ} className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="w-4 h-4 mr-1.5" /> Add FAQ
        </Button>
      </div>
      {content.faqs.map((faq, i) => <FAQCard key={faq.id} faq={faq} index={i} />)}
    </div>
  );
};
