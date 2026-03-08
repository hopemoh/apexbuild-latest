import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";
import { testimonialSchema } from "@/lib/cms-schemas";
import { Testimonial } from "@/context/ContentContext";

type TestimonialForm = z.infer<typeof testimonialSchema>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const { updateTestimonial, deleteTestimonial } = useContent();
  const { register, formState: { errors }, setValue, watch } = useForm<TestimonialForm>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { name: t.name, title: t.title, avatar: t.avatar, rating: t.rating, text: t.text },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("name", t.name); setValue("title", t.title);
    setValue("avatar", t.avatar); setValue("rating", t.rating); setValue("text", t.text);
  }, [t.name, t.title, t.avatar, t.rating, t.text]);

  const handleChange = (field: keyof Omit<TestimonialForm, "rating">) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(field, e.target.value, { shouldValidate: true });
    if (!errors[field]) updateTestimonial(t.id, { [field]: e.target.value });
  };

  const avatarVal = watch("avatar");

  return (
    <CMSCard
      title={t.name || `Testimonial ${index + 1}`}
      actions={
        <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteTestimonial(t.id)}>
          <Trash2 className="w-4 h-4 mr-1.5" /> Remove
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Client Name</Label>
          <Input {...register("name")} onChange={handleChange("name")} className="bg-secondary/50" />
          <FieldError msg={errors.name?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Role & Company</Label>
          <Input {...register("title")} onChange={handleChange("title")} className="bg-secondary/50" placeholder="CEO, Company Name" />
          <FieldError msg={errors.title?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Avatar URL</Label>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <Input {...register("avatar")} onChange={handleChange("avatar")} className="bg-secondary/50 font-mono text-xs" />
              <FieldError msg={errors.avatar?.message} />
            </div>
            {avatarVal && !errors.avatar && (
              <img src={avatarVal} alt="" className="w-9 h-9 rounded-full object-cover border border-border flex-shrink-0" />
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Rating (1–5)</Label>
          <div className="flex items-center gap-1.5 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => { setValue("rating", star); updateTestimonial(t.id, { rating: star }); }}>
                <Star className={`w-5 h-5 transition-colors ${star <= t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Testimonial Text</Label>
          <Textarea {...register("text")} onChange={handleChange("text")} rows={3} className="bg-secondary/50 resize-none" />
          <FieldError msg={errors.text?.message} />
        </div>
      </div>
    </CMSCard>
  );
}

export const DashboardTestimonials = () => {
  const { content, addTestimonial } = useContent();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-display font-bold text-lg">Testimonials</h2>
          <p className="text-sm text-muted-foreground">{content.testimonials.length} reviews</p>
        </div>
        <Button onClick={addTestimonial} className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="w-4 h-4 mr-1.5" /> Add Testimonial
        </Button>
      </div>
      {content.testimonials.map((t, i) => <TestimonialCard key={t.id} t={t} index={i} />)}
    </div>
  );
};
