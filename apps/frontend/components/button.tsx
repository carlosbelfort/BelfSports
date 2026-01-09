/*export function Button({ children, ...props }: any) {


  return (
    <button
      {...props}
      className="w-full rounded-md bg-primary py-2 font-semibold hover:opacity-90"
    >
      {children}
    </button>
  );
}*/

type ButtonProps = {
  variant?: "primary" | "success" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      {...props}
      className={`
        w-full
        rounded-md
        px-4
        py-2
        font-semibold
        transition
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-white/30
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}