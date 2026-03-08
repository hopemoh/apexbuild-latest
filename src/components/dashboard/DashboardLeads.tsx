import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CMSCard } from "./CMSCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, FileText, Inbox, RefreshCw, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

type Lead = {
  id: string;
  type: "contact" | "quote";
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string | null;
  company: string | null;
  budget: string | null;
  service: string | null;
  timeline: string | null;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
};

const statusColors: Record<Lead["status"], string> = {
  new: "bg-primary/15 text-primary border-primary/30",
  read: "bg-muted text-muted-foreground border-border",
  replied: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  archived: "bg-secondary text-muted-foreground border-border",
};

export const DashboardLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "contact" | "quote">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | Lead["status"]>("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const updateStatus = async (id: string, status: Lead["status"]) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const openLead = async (lead: Lead) => {
    setSelected(lead);
    if (lead.status === "new") updateStatus(lead.id, "read");
  };

  const filtered = leads.filter((l) => {
    if (filterType !== "all" && l.type !== filterType) return false;
    if (filterStatus !== "all" && l.status !== filterStatus) return false;
    return true;
  });

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {(["all", "new", "contact", "quote"] as const).map((key) => {
          const count =
            key === "all" ? leads.length :
            key === "new" ? leads.filter((l) => l.status === "new").length :
            leads.filter((l) => l.type === key).length;
          const labels = { all: "Total Leads", new: "Unread", contact: "Contact Forms", quote: "Quote Requests" };
          return (
            <div key={key} className="glass-card rounded-2xl p-4">
              <p className="text-xs text-muted-foreground mb-1">{labels[key]}</p>
              <p className="text-2xl font-display font-bold text-foreground">{count}</p>
            </div>
          );
        })}
      </div>

      <CMSCard
        title={`Leads${newCount > 0 ? ` (${newCount} new)` : ""}`}
        description="Contact and quote requests from your site visitors"
      >
        {/* Filters + refresh */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Select value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
            <SelectTrigger className="w-36 h-9 bg-secondary/50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
              <SelectItem value="quote">Quote</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as typeof filterStatus)}>
            <SelectTrigger className="w-36 h-9 bg-secondary/50 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={fetchLeads} className="ml-auto gap-1.5 text-muted-foreground hover:text-foreground">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-xl bg-secondary/40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-14 text-muted-foreground">
            <Inbox className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No leads yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((lead) => (
              <div
                key={lead.id}
                className={`flex items-center gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer hover:bg-secondary/60 ${
                  lead.status === "new" ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/20"
                }`}
                onClick={() => openLead(lead)}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${lead.type === "quote" ? "bg-accent/10" : "bg-primary/10"}`}>
                  {lead.type === "quote"
                    ? <FileText className="w-4 h-4 text-accent" />
                    : <Mail className="w-4 h-4 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground truncate">{lead.name}</span>
                    {lead.status === "new" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{lead.email}{lead.subject ? ` · ${lead.subject}` : lead.service ? ` · ${lead.service}` : ""}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="outline" className={`text-xs capitalize ${statusColors[lead.status]}`}>
                    {lead.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize text-muted-foreground border-border">
                    {lead.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {format(new Date(lead.created_at), "MMM d")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CMSCard>

      {/* Detail modal */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selected?.type === "quote"
                ? <FileText className="w-4 h-4 text-accent" />
                : <Mail className="w-4 h-4 text-primary" />}
              {selected?.type === "quote" ? "Quote Request" : "Contact Message"}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              {/* Meta */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Name</p>
                  <p className="font-medium">{selected.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <a href={`mailto:${selected.email}`} className="font-medium text-primary hover:underline">{selected.email}</a>
                </div>
                {selected.company && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Company</p>
                    <p className="font-medium">{selected.company}</p>
                  </div>
                )}
                {selected.subject && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Subject</p>
                    <p className="font-medium">{selected.subject}</p>
                  </div>
                )}
                {selected.budget && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Budget</p>
                    <p className="font-medium">{selected.budget}</p>
                  </div>
                )}
                {selected.service && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Service</p>
                    <p className="font-medium">{selected.service}</p>
                  </div>
                )}
                {selected.timeline && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Timeline</p>
                    <p className="font-medium">{selected.timeline}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Received</p>
                  <p className="font-medium">{format(new Date(selected.created_at), "MMM d, yyyy · h:mm a")}</p>
                </div>
              </div>
              {/* Message */}
              {selected.message && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Message</p>
                  <div className="bg-secondary/50 rounded-xl p-3 text-sm text-foreground whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>
              )}
              {/* Actions */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <Select value={selected.status} onValueChange={(v) => updateStatus(selected.id, v as Lead["status"])}>
                  <SelectTrigger className="w-36 h-8 text-xs bg-secondary/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline" asChild className="h-8 text-xs gap-1.5">
                  <a href={`mailto:${selected.email}`}>
                    <Mail className="w-3.5 h-3.5" /> Reply
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteLead(selected.id)}
                  className="h-8 text-xs gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
