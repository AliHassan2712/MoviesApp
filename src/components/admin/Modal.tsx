"use client";

export default function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-overlay flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-card border border-main rounded-xl shadow-2xl overflow-hidden">
        <div className="p-5 border-b border-main flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button
            type="button"
            className="text-muted hover:text-main"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
