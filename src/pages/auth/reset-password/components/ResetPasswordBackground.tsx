import Image from "next/image";
import backgroundImg from "../assets/imgs/background.png";

export default function ResetPasswordBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src={backgroundImg}
        alt="Reset Password Background"
        fill
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
}
