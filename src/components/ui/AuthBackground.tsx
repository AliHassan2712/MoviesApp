// Next
import Image from "next/image";
import { StaticImageData } from "next/image";

type AuthBackgroundProps = {
image: StaticImageData
}

export default function AuthBackground({ image }: AuthBackgroundProps) {
  return (
    <div className="absolute inset-0">
      <Image
        src={image}
        alt="Auth Background"
        fill
        priority
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
}
