"use client";

export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-main rounded-xl p-6 shadow-lg flex items-center justify-between">
      <div>
        <p className="text-muted text-sm">{title}</p>
        <p className="text-3xl font-extrabold mt-1">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
