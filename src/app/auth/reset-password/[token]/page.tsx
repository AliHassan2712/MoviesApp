// reset password page component
import ResetPasswordPage from "@/pages/auth/reset-password/resetPassword";

export default async function ResetPassword({ params }: {params:Promise<{token:string}>}) {
  const {token} = await params;
  return <ResetPasswordPage token={token} />;
}
