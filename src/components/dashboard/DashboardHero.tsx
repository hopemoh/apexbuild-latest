import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";

export const DashboardHero = () => {
  const { content, updateHero, updateContent } = useContent();
  const { hero } = content;

  return (
    <div className="space-y-6">
      <CMSCard title="Brand">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Company Name</Label>
            <Input value={content.companyName} onChange={(e) => updateContent({ companyName: e.target.value })} className="bg-secondary/50" />
          </div>
          <div className="space-y-1.5">
            <Label>Tagline (Footer)</Label>
            <Input value={content.tagline} onChange={(e) => updateContent({ tagline: e.target.value })} className="bg-secondary/50" />
          </div>
        </div>
      </CMSCard>

      <CMSCard title="Hero Content">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Badge Text</Label>
            <Input value={hero.badge} onChange={(e) => updateHero({ badge: e.target.value })} className="bg-secondary/50" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Headline Line 1</Label>
              <Input value={hero.headline1} onChange={(e) => updateHero({ headline1: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Headline Line 2</Label>
              <Input value={hero.headline2} onChange={(e) => updateHero({ headline2: e.target.value })} className="bg-secondary/50" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Subheading</Label>
            <Textarea value={hero.subheading} onChange={(e) => updateHero({ subheading: e.target.value })} rows={3} className="bg-secondary/50 resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Primary CTA Button</Label>
              <Input value={hero.ctaPrimary} onChange={(e) => updateHero({ ctaPrimary: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Secondary CTA Button</Label>
              <Input value={hero.ctaSecondary} onChange={(e) => updateHero({ ctaSecondary: e.target.value })} className="bg-secondary/50" />
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
              <Button variant="ghost" size="icon" className="flex-shrink-0 hover:text-destructive" onClick={() => {
                updateHero({ pills: hero.pills.filter((_, idx) => idx !== i) });
              }}>
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
              <Input
                value={stat.value}
                placeholder="Value"
                onChange={(e) => {
                  const stats = [...hero.stats];
                  stats[i] = { ...stats[i], value: e.target.value };
                  updateHero({ stats });
                }}
                className="bg-secondary/50 w-28 font-bold"
              />
              <Input
                value={stat.label}
                placeholder="Label"
                onChange={(e) => {
                  const stats = [...hero.stats];
                  stats[i] = { ...stats[i], label: e.target.value };
                  updateHero({ stats });
                }}
                className="bg-secondary/50 flex-1"
              />
              <Button variant="ghost" size="icon" className="flex-shrink-0 hover:text-destructive" onClick={() => {
                updateHero({ stats: hero.stats.filter((_, idx) => idx !== i) });
              }}>
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
