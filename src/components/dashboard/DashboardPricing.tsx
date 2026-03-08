import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";

export const DashboardPricing = () => {
  const { content, updatePricingPlan, addPricingFeature, removePricingFeature, updatePricingFeature } = useContent();

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="font-display font-bold text-lg">Pricing Plans</h2>
        <p className="text-sm text-muted-foreground">{content.pricing.length} plans</p>
      </div>

      {content.pricing.map((plan) => (
        <CMSCard
          key={plan.id}
          title={plan.title}
          description={plan.subtitle}
          actions={
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={plan.highlight}
                onChange={(e) => updatePricingPlan(plan.id, { highlight: e.target.checked })}
                className="accent-primary"
              />
              <span className="text-muted-foreground text-xs">Featured</span>
            </label>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="space-y-1.5">
              <Label>Plan Title</Label>
              <Input value={plan.title} onChange={(e) => updatePricingPlan(plan.id, { title: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Subtitle</Label>
              <Input value={plan.subtitle} onChange={(e) => updatePricingPlan(plan.id, { subtitle: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Price</Label>
              <Input value={plan.price} onChange={(e) => updatePricingPlan(plan.id, { price: e.target.value })} className="bg-secondary/50" placeholder="From $5,000" />
            </div>
            <div className="space-y-1.5">
              <Label>Period</Label>
              <Input value={plan.period} onChange={(e) => updatePricingPlan(plan.id, { period: e.target.value })} className="bg-secondary/50" placeholder="per project" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={plan.description} onChange={(e) => updatePricingPlan(plan.id, { description: e.target.value })} rows={2} className="bg-secondary/50 resize-none" />
            </div>
            <div className="space-y-1.5">
              <Label>CTA Button Text</Label>
              <Input value={plan.cta} onChange={(e) => updatePricingPlan(plan.id, { cta: e.target.value })} className="bg-secondary/50" />
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Features</Label>
            <div className="space-y-2">
              {plan.features.map((feat, fi) => (
                <div key={fi} className="flex items-center gap-2">
                  <Input
                    value={feat}
                    onChange={(e) => updatePricingFeature(plan.id, fi, e.target.value)}
                    className="bg-secondary/50 flex-1"
                  />
                  <Button variant="ghost" size="icon" className="hover:text-destructive flex-shrink-0" onClick={() => removePricingFeature(plan.id, fi)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="mt-1" onClick={() => addPricingFeature(plan.id)}>
                <Plus className="w-4 h-4 mr-1.5" /> Add Feature
              </Button>
            </div>
          </div>
        </CMSCard>
      ))}
    </div>
  );
};
