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
import { pricingPlanSchema } from "@/lib/cms-schemas";
import { PricingPlan } from "@/context/ContentContext";

type PricingForm = z.infer<typeof pricingPlanSchema>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  const { updatePricingPlan, addPricingFeature, removePricingFeature, updatePricingFeature } = useContent();
  const { register, formState: { errors }, setValue } = useForm<PricingForm>({
    resolver: zodResolver(pricingPlanSchema),
    defaultValues: { title: plan.title, subtitle: plan.subtitle, price: plan.price, period: plan.period, description: plan.description, cta: plan.cta },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("title", plan.title); setValue("subtitle", plan.subtitle);
    setValue("price", plan.price); setValue("period", plan.period);
    setValue("description", plan.description); setValue("cta", plan.cta);
  }, [plan.title, plan.subtitle, plan.price, plan.period, plan.description, plan.cta]);

  const handleChange = (field: keyof PricingForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(field, e.target.value, { shouldValidate: true });
    if (!errors[field]) updatePricingPlan(plan.id, { [field]: e.target.value });
  };

  return (
    <CMSCard
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
          <Input {...register("title")} onChange={handleChange("title")} className="bg-secondary/50" />
          <FieldError msg={errors.title?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Subtitle</Label>
          <Input {...register("subtitle")} onChange={handleChange("subtitle")} className="bg-secondary/50" />
          <FieldError msg={errors.subtitle?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Price</Label>
          <Input {...register("price")} onChange={handleChange("price")} className="bg-secondary/50" placeholder="From $5,000" />
          <FieldError msg={errors.price?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Period</Label>
          <Input {...register("period")} onChange={handleChange("period")} className="bg-secondary/50" placeholder="per project" />
          <FieldError msg={errors.period?.message} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Description</Label>
          <Textarea {...register("description")} onChange={handleChange("description")} rows={2} className="bg-secondary/50 resize-none" />
          <FieldError msg={errors.description?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>CTA Button Text</Label>
          <Input {...register("cta")} onChange={handleChange("cta")} className="bg-secondary/50" />
          <FieldError msg={errors.cta?.message} />
        </div>
      </div>

      <div>
        <Label className="mb-3 block">Features</Label>
        <div className="space-y-2">
          {plan.features.map((feat, fi) => (
            <div key={fi} className="flex items-center gap-2">
              <Input value={feat} onChange={(e) => updatePricingFeature(plan.id, fi, e.target.value)} className="bg-secondary/50 flex-1" />
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
  );
}

export const DashboardPricing = () => {
  const { content } = useContent();
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="font-display font-bold text-lg">Pricing Plans</h2>
        <p className="text-sm text-muted-foreground">{content.pricing.length} plans</p>
      </div>
      {content.pricing.map((plan) => <PricingCard key={plan.id} plan={plan} />)}
    </div>
  );
};
