import { User, Shield, LogOut } from "lucide-react";
import { PATHS } from "@/constant/PATHS";

export function getProfileActions(logout: () => void) {
  return [
    {
      title: "Edit Profile",
      description: "Update your personal details",
      href: PATHS.PROFILE_EDIT,
      icon: <User size={30} className="text-primary" />,
      accentClass: "bg-primary/20",
    },
    {
      title: "Security",
      description: "Change your password",
      href: PATHS.CHANGE_PASSWORD,
      icon: <Shield size={30} className="text-blue-400" />,
      accentClass: "bg-blue-500/20",
    },
    {
      title: "Logout",
      description: "Sign out securely",
      onClick: logout,
      icon: <LogOut size={30} className="text-red-400" />,
      accentClass: "bg-red-500/20",
    },
  ];
}
