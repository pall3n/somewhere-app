import { cn } from "cn";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-panel border border-dashed border-border px-6 py-12 text-center",
        className
      )}
    >
      {icon && <div className="mb-4 text-stone">{icon}</div>}
      <h3 className="text-base font-medium text-ink">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-stone">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
