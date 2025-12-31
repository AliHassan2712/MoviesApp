"use client";

import { ReactNode } from "react";

export default function AdminTable({
  title,
  toolbar,
  head,
  children,
}: {
  title: string;
  toolbar?: ReactNode;
  head: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="bg-card border border-main rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between border-b border-main">
        <h2 className="text-lg font-semibold">{title}</h2>
        {toolbar}
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
