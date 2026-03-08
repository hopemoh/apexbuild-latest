import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";

const categories = ["Web App", "Mobile", "SaaS", "E-commerce"];

export const DashboardProjects = () => {
  const { content, updateProject, addProject, deleteProject } = useContent();

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

      {content.projects.map((project, i) => (
        <CMSCard
          key={project.id}
          title={project.title || `Project ${i + 1}`}
          actions={
            <Button variant="ghost" size="sm" className="hover:text-destructive hover:bg-destructive/10" onClick={() => deleteProject(project.id)}>
              <Trash2 className="w-4 h-4 mr-1.5" /> Remove
            </Button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={project.title} onChange={(e) => updateProject(project.id, { title: e.target.value })} className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <select
                value={project.category}
                onChange={(e) => updateProject(project.id, { category: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={project.description} onChange={(e) => updateProject(project.id, { description: e.target.value })} rows={2} className="bg-secondary/50 resize-none" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Image URL</Label>
              <div className="flex gap-3 items-start">
                <Input value={project.image} onChange={(e) => updateProject(project.id, { image: e.target.value })} className="bg-secondary/50 font-mono text-xs flex-1" placeholder="https://..." />
                {project.image && (
                  <img src={project.image} alt="" className="w-16 h-10 rounded-lg object-cover border border-border flex-shrink-0" />
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Color Gradient</Label>
              <Input value={project.color} onChange={(e) => updateProject(project.id, { color: e.target.value })} className="bg-secondary/50 font-mono text-xs" />
            </div>
          </div>
        </CMSCard>
      ))}
    </div>
  );
};
