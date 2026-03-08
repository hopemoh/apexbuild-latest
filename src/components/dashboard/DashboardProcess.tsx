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
import { processStepSchema } from "@/lib/cms-schemas";
import { ProcessStep } from "@/context/ContentContext";

type ProcessForm = z.infer<typeof processStepSchema>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  const { updateProcessStep, deleteProcessStep } = useContent();
  const { register, formState: { errors }, setValue } = useForm<ProcessForm>({
    resolver: zodResolver(processStepSchema),
    defaultValues: { number: step.number, title: step.title, description: step.description, detail: step.detail },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("number", step.number); setValue("title", step.title);
    setValue("description", step.description); setValue("detail", step.detail);
  }, [step.number, step.title, step.description, step.detail]);

  const handleChange = (field: keyof ProcessForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(field, e.target.value, { shouldValidate: true });
    if (!errors[field]) updateProcessStep(step.id, { [field]: e.target.value });
  };

  return (
    <CMSCard
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
          <Input {...register("number")} onChange={handleChange("number")} className="bg-secondary/50 w-20" />
          <FieldError msg={errors.number?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Title</Label>
          <Input {...register("title")} onChange={handleChange("title")} className="bg-secondary/50" />
          <FieldError msg={errors.title?.message} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Description</Label>
          <Textarea {...register("description")} onChange={handleChange("description")} rows={2} className="bg-secondary/50 resize-none" />
          <FieldError msg={errors.description?.message} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Detail Line (small text)</Label>
          <Input {...register("detail")} onChange={handleChange("detail")} className="bg-secondary/50" />
          <FieldError msg={errors.detail?.message} />
        </div>
      </div>
    </CMSCard>
  );
}

export const DashboardProcess = () => {
  const { content, addProcessStep } = useContent();
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
      {content.process.map((step, i) => <ProcessCard key={step.id} step={step} index={i} />)}
    </div>
  );
};
