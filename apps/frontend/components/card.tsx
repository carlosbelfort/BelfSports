type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl bg-black/60 backdrop-blur p-5 shadow-lg border border-white/10">
      {title && (
        <h2 className="mb-4 text-lg font-semibold text-white">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}