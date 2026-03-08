import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";

export const DashboardContact = () => {
  const { content, updateContact } = useContent();
  const { contact } = content;

  return (
    <div className="space-y-6">
      <CMSCard title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Email Address</Label>
            <Input value={contact.email} onChange={(e) => updateContact({ email: e.target.value })} className="bg-secondary/50" type="email" />
          </div>
          <div className="space-y-1.5">
            <Label>Phone Number</Label>
            <Input value={contact.phone} onChange={(e) => updateContact({ phone: e.target.value })} className="bg-secondary/50" />
          </div>
          <div className="space-y-1.5">
            <Label>Address Line</Label>
            <Input value={contact.address} onChange={(e) => updateContact({ address: e.target.value })} className="bg-secondary/50" />
          </div>
          <div className="space-y-1.5">
            <Label>City / State / Zip</Label>
            <Input value={contact.addressSub} onChange={(e) => updateContact({ addressSub: e.target.value })} className="bg-secondary/50" />
          </div>
        </div>
      </CMSCard>
    </div>
  );
};
