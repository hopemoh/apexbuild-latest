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
import { heroSchema, brandSchema } from "@/lib/cms-schemas";

type HeroForm = z.infer<typeof heroSchema>;
type BrandForm = z.infer<typeof brandSchema>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

export const DashboardHero = () => {
  const { content, updateHero, updateContent } = useContent();
  const { hero } = content;

  const brand = useForm<BrandForm>({
    resolver: zodResolver(brandSchema),
    defaultValues: { companyName: content.companyName, tagline: content.tagline },
    mode: "onChange",
  });

  const heroForm = useForm<HeroForm>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      badge: hero.badge, headline1: hero.headline1, headline2: hero.headline2,
      subheading: hero.subheading, ctaPrimary: hero.ctaPrimary, ctaSecondary: hero.ctaSecondary,
    },
    mode: "onChange",
  });

  // Sync external content changes back into forms
  useEffect(() => {
    brand.reset({ companyName: content.companyName, tagline: content.tagline });
  }, [content.companyName, content.tagline]);

  useEffect(() => {
    heroForm.reset({
      badge: hero.badge, headline1: hero.headline1, headline2: hero.headline2,
      subheading: hero.subheading, ctaPrimary: hero.ctaPrimary, ctaSecondary: hero.ctaSecondary,
    });
  }, [hero.badge, hero.headline1, hero.headline2, hero.subheading, hero.ctaPrimary, hero.ctaSecondary]);

  const onBrandChange = (field: keyof BrandForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    brand.setValue(field, e.target.value, { shouldValidate: true });
    if (!brand.formState.errors[field]) updateContent({ [field]: e.target.value });
  };

  const onHeroChange = (field: keyof HeroForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    heroForm.setValue(field, e.target.value, { shouldValidate: true });
    if (!heroForm.formState.errors[field]) updateHero({ [field]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <CMSCard title="Brand">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Company Name</Label>
            <Input {...brand.register("companyName")} onChange={onBrandChange("companyName")} className="bg-secondary/50" />
            <FieldError msg={brand.formState.errors.companyName?.message} />
          </div>
          <div className="space-y-1.5">
            <Label>Tagline (Footer)</Label>
            <Input {...brand.register("tagline")} onChange={onBrandChange("tagline")} className="bg-secondary/50" />
            <FieldError msg={brand.formState.errors.tagline?.message} />
          </div>
        </div>
      </CMSCard>

      <CMSCard title="Hero Content">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Badge Text</Label>
            <Input {...heroForm.register("badge")} onChange={onHeroChange("badge")} className="bg-secondary/50" />
            <FieldError msg={heroForm.formState.errors.badge?.message} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Headline Line 1</Label>
              <Input {...heroForm.register("headline1")} onChange={onHeroChange("headline1")} className="bg-secondary/50" />
              <FieldError msg={heroForm.formState.errors.headline1?.message} />
            </div>
            <div className="space-y-1.5">
              <Label>Headline Line 2</Label>
              <Input {...heroForm.register("headline2")} onChange={onHeroChange("headline2")} className="bg-secondary/50" />
              <FieldError msg={heroForm.formState.errors.headline2?.message} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Subheading</Label>
            <Textarea {...heroForm.register("subheading")} onChange={onHeroChange("subheading")} rows={3} className="bg-secondary/50 resize-none" />
            <FieldError msg={heroForm.formState.errors.subheading?.message} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Primary CTA Button</Label>
              <Input {...heroForm.register("ctaPrimary")} onChange={onHeroChange("ctaPrimary")} className="bg-secondary/50" />
              <FieldError msg={heroForm.formState.errors.ctaPrimary?.message} />
            </div>
            <div className="space-y-1.5">
              <Label>Secondary CTA Button</Label>
              <Input {...heroForm.register("ctaSecondary")} onChange={onHeroChange("ctaSecondary")} className="bg-secondary/50" />
              <FieldError msg={heroForm.formState.errors.ctaSecondary?.message} />
            </div>
          </div>
        </div>
      </CMSCard>

      <CMSCard title="Feature Pills">
        <div className="space-y-2">
          {hero.pills.map((pill, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                value={pill.text}
                onChange={(e) => {
                  const pills = [...hero.pills];
                  pills[i] = { text: e.target.value };
                  updateHero({ pills });
                }}
                className="bg-secondary/50"
              />
              <Button variant="ghost" size="icon" className="flex-shrink-0 hover:text-destructive" onClick={() => updateHero({ pills: hero.pills.filter((_, idx) => idx !== i) })}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="mt-2" onClick={() => updateHero({ pills: [...hero.pills, { text: "New Feature" }] })}>
            <Plus className="w-4 h-4 mr-1.5" /> Add Pill
          </Button>
        </div>
      </CMSCard>

      <CMSCard title="Stats">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {hero.stats.map((stat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input value={stat.value} placeholder="Value" onChange={(e) => { const s = [...hero.stats]; s[i] = { ...s[i], value: e.target.value }; updateHero({ stats: s }); }} className="bg-secondary/50 w-28 font-bold" />
              <Input value={stat.label} placeholder="Label" onChange={(e) => { const s = [...hero.stats]; s[i] = { ...s[i], label: e.target.value }; updateHero({ stats: s }); }} className="bg-secondary/50 flex-1" />
              <Button variant="ghost" size="icon" className="flex-shrink-0 hover:text-destructive" onClick={() => updateHero({ stats: hero.stats.filter((_, idx) => idx !== i) })}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => updateHero({ stats: [...hero.stats, { value: "0+", label: "New Stat" }] })}>
            <Plus className="w-4 h-4 mr-1.5" /> Add Stat
          </Button>
        </div>
      </CMSCard>
    </div>
  );
};
