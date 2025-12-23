//  component
import ResetPasswordPage from "@/_pages/auth/reset-password/ResetPassword";

export default async function ResetPassword({ params }: {params:Promise<{token:string}>}) {
  const {token} = await params;
  return <ResetPasswordPage token={token} />;
}
