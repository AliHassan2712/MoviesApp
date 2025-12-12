type AuthHeaderProps ={
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-3 text-main">{title}</h1>
      <p className="text-center text-text-soft text-sm mb-6">{subtitle}</p>
    </>
  );
}
