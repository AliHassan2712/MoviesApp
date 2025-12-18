export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 w-[90%] sm:max-w-lg bg-card p-10 rounded-xl border border-main shadow-xl">
      {children}
    </div>
  );
}
