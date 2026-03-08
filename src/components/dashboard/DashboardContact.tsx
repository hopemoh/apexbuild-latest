import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContent } from "@/context/ContentContext";
import { CMSCard } from "./CMSCard";
import { contactSchema } from "@/lib/cms-schemas";

type ContactForm = z.infer<typeof contactSchema>;

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive mt-1">{msg}</p>;
}

export const DashboardContact = () => {
  const { content, updateContact } = useContent();
  const { contact } = content;

  const { register, formState: { errors }, setValue } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact,
    mode: "onChange",
  });

  useEffect(() => {
    setValue("email", contact.email); setValue("phone", contact.phone);
    setValue("address", contact.address); setValue("addressSub", contact.addressSub);
  }, [contact.email, contact.phone, contact.address, contact.addressSub]);

  const handleChange = (field: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(field, e.target.value, { shouldValidate: true });
    if (!errors[field]) updateContact({ [field]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <CMSCard title="Contact Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Email Address</Label>
            <Input {...register("email")} onChange={handleChange("email")} className="bg-secondary/50" type="email" />
            <FieldError msg={errors.email?.message} />
          </div>
          <div className="space-y-1.5">
            <Label>Phone Number</Label>
            <Input {...register("phone")} onChange={handleChange("phone")} className="bg-secondary/50" />
            <FieldError msg={errors.phone?.message} />
          </div>
          <div className="space-y-1.5">
            <Label>Address Line</Label>
            <Input {...register("address")} onChange={handleChange("address")} className="bg-secondary/50" />
            <FieldError msg={errors.address?.message} />
          </div>
          <div className="space-y-1.5">
            <Label>City / State / Zip</Label>
            <Input {...register("addressSub")} onChange={handleChange("addressSub")} className="bg-secondary/50" />
            <FieldError msg={errors.addressSub?.message} />
          </div>
        </div>
      </CMSCard>
    </div>
  );
};
