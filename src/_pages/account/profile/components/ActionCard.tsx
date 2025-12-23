//React & Next
import Link from "next/link";
import { ReactNode } from "react";

type ActionCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  accentClass: string;
};

export function ActionCard({
  title,
  description,
  icon,
  href,
  onClick,
  accentClass,
}: ActionCardProps) {
  const content = (
    <div className="bg-card border border-main rounded-xl p-8 shadow-lg flex flex-col items-center text-center gap-4 group cursor-pointer">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center ${accentClass}`}
      >
        {icon}
      </div>

      <h2 className="text-lg font-semibold group-hover:text-primary transition">
        {title}
      </h2>

      <p className="text-muted text-sm">{description}</p>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <button onClick={onClick}>{content}</button>;
}
