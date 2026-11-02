import { cn } from "cn";

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-4 md:px-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}
