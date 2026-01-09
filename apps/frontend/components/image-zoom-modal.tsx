"use client";

type ImageZoomModalProps = {
  src: string;
  onClose: () => void;
};

export default function ImageZoomModal({ src, onClose }: ImageZoomModalProps) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/80 backdrop-blur-sm
      "
      onClick={onClose}
    >
      <img
        src={src}
        alt="Zoom da imagem"
        className="
          max-h-[90vh]
          max-w-[90vw]
          rounded-lg
          shadow-2xl
          transition
          animate-zoom
        "
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}