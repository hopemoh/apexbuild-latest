import { Plus, Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";

export const DashboardServices = () => {
  const { content, updateService, addService, deleteService } = useContent();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-display font-bold text-lg">Services</h2>
          <p className="text-sm text-muted-foreground">{content.services.length} services</p>
        </div>
        <Button onClick={addService} className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="w-4 h-4 mr-1.5" /> Add Service
        </Button>
      </div>

      {content.services.map((service, i) => (
        <CMSCard
          key={service.id}
          title={`Service ${i + 1}`}
          actions={
            <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteService(service.id)}>
              <Trash2 className="w-4 h-4 mr-1.5" /> Remove
            </Button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={service.title} onChange={(e) => updateService(service.id, { title: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Color Gradient (Tailwind classes)</Label>
              <Input value={service.color} onChange={(e) => updateService(service.id, { color: e.target.value })} className="bg-secondary/50 font-mono text-xs" placeholder="from-blue-500/20 to-blue-600/10" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={service.description} onChange={(e) => updateService(service.id, { description: e.target.value })} rows={2} className="bg-secondary/50 resize-none" />
            </div>
          </div>
        </CMSCard>
      ))}
    </div>
  );
};
