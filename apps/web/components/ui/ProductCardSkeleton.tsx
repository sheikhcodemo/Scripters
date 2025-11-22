// TODO: Replace with a real Skeleton component from a UI library like Material UI

export function Skeleton({ className }: {className: string}) {
  return <div className={className}></div>
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="w-full h-48 rounded-lg" />
      <Skeleton className="w-3/4 h-5" />
      <Skeleton className="w-1/2 h-4" />
      <Skeleton className="w-1/4 h-6" />
    </div>
  );
}