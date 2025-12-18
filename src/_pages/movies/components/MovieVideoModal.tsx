"use client";

type Props = {
  videoUrl: string;
  onClose: () => void;
};

export default function MovieVideoModal({ videoUrl, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full max-w-5xl">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl"
        >
          ✕
        </button>

        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full rounded-xl"
        />
      </div>
    </div>
  );
}
