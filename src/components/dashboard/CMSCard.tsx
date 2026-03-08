import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export const CMSCard = ({ title, description, children, actions }: Props) => (
  <div className="glass-card rounded-2xl p-6">
    <div className="flex items-start justify-between mb-5">
      <div>
        <h3 className="font-display font-semibold text-base">{title}</h3>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
    {children}
  </div>
);
