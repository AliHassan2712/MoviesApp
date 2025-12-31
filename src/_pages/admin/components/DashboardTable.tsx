"use client";

export default function DashboardTable({
  title,
  head,
  children,
  right,
}: {
  title: string;
  right?: React.ReactNode;
  head: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-main rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 border-b border-main flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        {right}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-soft border-b border-main">{head}</thead>
          <tbody className="divide-y divide-main">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
