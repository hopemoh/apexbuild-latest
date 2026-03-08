import { Plus, Trash2, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";

export const DashboardTestimonials = () => {
  const { content, updateTestimonial, addTestimonial, deleteTestimonial } = useContent();

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

      {content.testimonials.map((t, i) => (
        <CMSCard
          key={t.id}
          title={t.name || `Testimonial ${i + 1}`}
          actions={
            <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteTestimonial(t.id)}>
              <Trash2 className="w-4 h-4 mr-1.5" /> Remove
            </Button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Client Name</Label>
              <Input value={t.name} onChange={(e) => updateTestimonial(t.id, { name: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Role & Company</Label>
              <Input value={t.title} onChange={(e) => updateTestimonial(t.id, { title: e.target.value })} className="bg-secondary/50" placeholder="CEO, Company Name" />
            </div>
            <div className="space-y-1.5">
              <Label>Avatar URL</Label>
              <div className="flex gap-2 items-center">
                <Input value={t.avatar} onChange={(e) => updateTestimonial(t.id, { avatar: e.target.value })} className="bg-secondary/50 font-mono text-xs flex-1" />
                {t.avatar && <img src={t.avatar} alt="" className="w-9 h-9 rounded-full object-cover border border-border flex-shrink-0" />}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Rating (1–5)</Label>
              <div className="flex items-center gap-1.5 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => updateTestimonial(t.id, { rating: star })}>
                    <Star className={`w-5 h-5 transition-colors ${star <= t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Testimonial Text</Label>
              <Textarea value={t.text} onChange={(e) => updateTestimonial(t.id, { text: e.target.value })} rows={3} className="bg-secondary/50 resize-none" />
            </div>
          </div>
        </CMSCard>
      ))}
    </div>
  );
};
