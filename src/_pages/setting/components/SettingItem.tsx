import { ReactNode } from "react";

type SettingsProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action: ReactNode;
};

export default function SettingItem({
  icon,
  title,
  description,
  action,
}: SettingsProps) {
  return (
    <div className="bg-card border border-main rounded-xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {icon}
            {title}
          </h2>
          <p className="text-muted text-sm">{description}</p>
        </div>

        {action}
      </div>
    </div>
  );
}
