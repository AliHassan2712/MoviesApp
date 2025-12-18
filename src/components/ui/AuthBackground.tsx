// Next
import Image, { StaticImageData } from "next/image";

type AuthBackgroundProps = {
  image: StaticImageData;
};

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

      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-overlay" />
    </div>
  );
}
