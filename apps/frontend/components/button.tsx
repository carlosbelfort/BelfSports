type ButtonProps = {
  variant?:
    | "primary"
    | "success"
    | "danger"
    | "gray"
    | "sky"
    | "caution"
    | "send"
    | "action";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white",
    caution: "bg-yellow-400 hover:bg-yellow-700 text-white-400",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    gray: "mb-4 text-sm opacity-70 hover:opacity-100",
    sky: "bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition  rounded",
    action: "bg-gray-400 hover:bg-white-700 text-black-400",
    send: "w-full py-3 rounded-lg font-semibold  transition  disabled:opacity-50  disabled:cursor-not-allowed   hover: bg-green-500 ",
  };

  return (
    <button
      {...props}
      className={`
        text-center
        
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
