function LoadingBlock({ className }) {
  return <div className={`shimmer rounded-lg ${className}`} />;
}

function LoadingCard() {
  return (
    <div className="glass-card w-full max-w-[800px] rounded-3xl p-6 sm:p-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
        <LoadingBlock className="mx-auto h-[120px] w-[120px] rounded-full sm:mx-0" />

        <div className="flex-1 space-y-3">
          <LoadingBlock className="h-9 w-56" />
          <LoadingBlock className="h-5 w-32" />
          <LoadingBlock className="h-4 w-full max-w-xl" />
          <LoadingBlock className="h-4 w-full max-w-lg" />

          <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
            <LoadingBlock className="h-4 w-40" />
            <LoadingBlock className="h-4 w-36" />
            <LoadingBlock className="h-4 w-48" />
            <LoadingBlock className="h-4 w-44" />
          </div>

          <LoadingBlock className="h-4 w-32" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingBlock key={index} className="h-28 w-full rounded-xl" />
        ))}
      </div>

      <LoadingBlock className="mt-8 h-12 w-full rounded-xl" />
    </div>
  );
}

export default LoadingCard;
