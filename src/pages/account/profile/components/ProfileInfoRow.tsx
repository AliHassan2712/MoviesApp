interface ProfileInfoRowProps {
  label: string;
  value: string | number;
}

export default function ProfileInfoRow({ label, value }: ProfileInfoRowProps) {
  return (
    <div className="flex justify-between items-center bg-soft p-4 rounded-lg border border-main">
      <span className="text-text-soft">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
