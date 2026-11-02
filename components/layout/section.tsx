import { cn } from "cn";

interface SectionProps extends React.ComponentProps<"section"> {
  padding?: "sm" | "md" | "lg";
}

const paddingMap = {
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
} as const;

export function Section({
  padding = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(paddingMap[padding], className)} {...props}>
      {children}
    </section>
  );
}
