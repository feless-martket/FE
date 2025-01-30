const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative aspect-square w-full bg-gray-200 animate-pulse" />
      <div className="p-3">
        <div className="mb-1 h-3 w-16 rounded bg-gray-200 animate-pulse" />
        <div className="mb-2 h-4 w-full rounded bg-gray-200 animate-pulse" />
        <div className="h-5 w-24 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonCard;
