//next
import Image from 'next/image';
//assets
import backgroundImg from '../assets/imgs/background.png';

export default function ForgetPasswordBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src={backgroundImg}
        alt="Movies Background"
        fill
        priority
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
}
