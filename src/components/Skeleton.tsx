export function ProductCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden animate-pulse">
      <div className="aspect-square bg-white/5 flex items-center justify-center p-12">
        <div className="w-full h-full rounded-full bg-white/5" />
      </div>
      <div className="p-5 md:p-6 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-white/5 rounded-full" />
          <div className="h-4 w-12 bg-white/5 rounded" />
        </div>
        <div className="h-5 w-3/4 bg-white/5 rounded" />
        <div className="h-4 w-full bg-white/5 rounded" />
        <div className="h-4 w-2/3 bg-white/5 rounded" />
        <div className="flex justify-between pt-3 border-t border-white/10">
          <div className="h-6 w-16 bg-white/5 rounded" />
          <div className="h-6 w-20 bg-white/5 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
