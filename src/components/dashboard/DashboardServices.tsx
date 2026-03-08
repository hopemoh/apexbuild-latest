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
import { serviceSchema } from "@/lib/cms-schemas";
import { Service } from "@/context/ContentContext";

type ServiceForm = z.infer<typeof serviceSchema>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { updateService, deleteService } = useContent();
  const { register, formState: { errors }, setValue, watch } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { title: service.title, description: service.description, color: service.color },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("title", service.title);
    setValue("description", service.description);
    setValue("color", service.color);
  }, [service.title, service.description, service.color]);

  const handleChange = (field: keyof ServiceForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(field, e.target.value, { shouldValidate: true });
    if (!errors[field]) updateService(service.id, { [field]: e.target.value });
  };

  return (
    <CMSCard
      title={`Service ${index + 1}`}
      actions={
        <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteService(service.id)}>
          <Trash2 className="w-4 h-4 mr-1.5" /> Remove
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Title</Label>
          <Input {...register("title")} onChange={handleChange("title")} className="bg-secondary/50" />
          <FieldError msg={errors.title?.message} />
        </div>
        <div className="space-y-1.5">
          <Label>Color Gradient (Tailwind classes)</Label>
          <Input {...register("color")} onChange={handleChange("color")} className="bg-secondary/50 font-mono text-xs" placeholder="from-blue-500/20 to-blue-600/10" />
          <FieldError msg={errors.color?.message} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Description</Label>
          <Textarea {...register("description")} onChange={handleChange("description")} rows={2} className="bg-secondary/50 resize-none" />
          <FieldError msg={errors.description?.message} />
        </div>
      </div>
    </CMSCard>
  );
}

export const DashboardServices = () => {
  const { content, addService } = useContent();
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
      {content.services.map((service, i) => <ServiceCard key={service.id} service={service} index={i} />)}
    </div>
  );
};
