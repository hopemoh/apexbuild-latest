import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";

export const DashboardFAQ = () => {
  const { content, updateFAQ, addFAQ, deleteFAQ } = useContent();

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

      {content.faqs.map((faq, i) => (
        <CMSCard
          key={faq.id}
          title={`Q${i + 1}`}
          actions={
            <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteFAQ(faq.id)}>
              <Trash2 className="w-4 h-4 mr-1.5" /> Remove
            </Button>
          }
        >
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label>Question</Label>
              <Input value={faq.q} onChange={(e) => updateFAQ(faq.id, { q: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Answer</Label>
              <Textarea value={faq.a} onChange={(e) => updateFAQ(faq.id, { a: e.target.value })} rows={3} className="bg-secondary/50 resize-none" />
            </div>
          </div>
        </CMSCard>
      ))}
    </div>
  );
};
