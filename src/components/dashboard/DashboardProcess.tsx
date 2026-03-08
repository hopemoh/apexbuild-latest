import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";

export const DashboardProcess = () => {
  const { content, updateProcessStep, addProcessStep, deleteProcessStep } = useContent();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-display font-bold text-lg">Process Steps</h2>
          <p className="text-sm text-muted-foreground">{content.process.length} steps</p>
        </div>
        <Button onClick={addProcessStep} className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="w-4 h-4 mr-1.5" /> Add Step
        </Button>
      </div>

      {content.process.map((step, i) => (
        <CMSCard
          key={step.id}
          title={`Step ${step.number}: ${step.title}`}
          actions={
            <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteProcessStep(step.id)}>
              <Trash2 className="w-4 h-4 mr-1.5" /> Remove
            </Button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Step Number</Label>
              <Input value={step.number} onChange={(e) => updateProcessStep(step.id, { number: e.target.value })} className="bg-secondary/50 w-20" />
            </div>
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={step.title} onChange={(e) => updateProcessStep(step.id, { title: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={step.description} onChange={(e) => updateProcessStep(step.id, { description: e.target.value })} rows={2} className="bg-secondary/50 resize-none" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Detail Line (small text)</Label>
              <Input value={step.detail} onChange={(e) => updateProcessStep(step.id, { detail: e.target.value })} className="bg-secondary/50" />
            </div>
          </div>
        </CMSCard>
      ))}
    </div>
  );
};
