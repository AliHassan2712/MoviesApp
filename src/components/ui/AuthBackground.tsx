import Image from "next/image";
import { StaticImageData } from "next/image";

export default function AuthBackground({ image }: { image: StaticImageData }) {
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
