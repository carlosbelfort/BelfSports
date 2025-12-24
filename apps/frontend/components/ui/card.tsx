export function Card({ children }: any) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-lg">
      {children}
    </div>
  );
}