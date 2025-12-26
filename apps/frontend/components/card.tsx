type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded bg-white p-6 shadow">
      {title && (
        <h2 className="mb-4 text-xl font-bold">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}
