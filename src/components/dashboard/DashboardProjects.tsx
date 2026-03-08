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
import { projectSchema } from "@/lib/cms-schemas";
import { Project } from "@/context/ContentContext";

type ProjectForm = z.infer<typeof projectSchema>;
const categories = ["Web App", "Mobile", "SaaS", "E-commerce"] as const;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { updateProject, deleteProject } = useContent();
  const { register, formState: { errors }, setValue, watch } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: { title: project.title, description: project.description, image: project.image, category: project.category as ProjectForm["category"], color: project.color },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("title", project.title);
    setValue("description", project.description);
    setValue("image", project.image);
    setValue("category", project.category as ProjectForm["category"]);
    setValue("color", project.color);
  }, [project.title, project.description, project.image, project.category, project.color]);

  const handleChange = (field: keyof ProjectForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValue(field as any, e.target.value, { shouldValidate: true });
    if (!errors[field]) updateProject(project.id, { [field]: e.target.value });
  };

  const imageVal = watch("image");

  return (
    <CMSCard
      title={project.title || `Project ${index + 1}`}
      actions={
        <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteProject(project.id)}>
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
          <Label>Category</Label>
          <select
            {...register("category")}
            onChange={handleChange("category")}
            className="flex h-10 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <FieldError msg={errors.category?.message} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Description</Label>
          <Textarea {...register("description")} onChange={handleChange("description")} rows={2} className="bg-secondary/50 resize-none" />
          <FieldError msg={errors.description?.message} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label>Image URL</Label>
          <div className="flex gap-3 items-start">
            <div className="flex-1">
              <Input {...register("image")} onChange={handleChange("image")} className="bg-secondary/50 font-mono text-xs" placeholder="https://..." />
              <FieldError msg={errors.image?.message} />
            </div>
            {imageVal && !errors.image && (
              <img src={imageVal} alt="" className="w-16 h-10 rounded-lg object-cover border border-border flex-shrink-0" />
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Color Gradient</Label>
          <Input {...register("color")} onChange={handleChange("color")} className="bg-secondary/50 font-mono text-xs" />
          <FieldError msg={errors.color?.message} />
        </div>
      </div>
    </CMSCard>
  );
}

export const DashboardProjects = () => {
  const { content, addProject } = useContent();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-display font-bold text-lg">Portfolio Projects</h2>
          <p className="text-sm text-muted-foreground">{content.projects.length} projects</p>
        </div>
        <Button onClick={addProject} className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
          <Plus className="w-4 h-4 mr-1.5" /> Add Project
        </Button>
      </div>
      {content.projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
    </div>
  );
};
