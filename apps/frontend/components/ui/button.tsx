export function Button({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="w-full rounded-md bg-primary py-2 font-semibold hover:opacity-90"
    >
      {children}
    </button>
  );
}