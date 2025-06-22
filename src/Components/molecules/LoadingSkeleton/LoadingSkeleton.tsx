import React from "react";

interface LoadingSkeletonProps {
  variant?: 'product' | 'order' | 'return';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ variant = 'product' }) => {
  const renderSkeletonBlocks = (count: number, className: string) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className={className}></div>
    ));
  };

  if (variant === 'order' || variant === 'return') {
    return (
      <div className="space-y-4 w-full">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center">
          <div className="w-1/3 h-8 bg-grayColor animate-pulse rounded-md"></div>
          <div className="w-1/4 h-8 bg-grayColor animate-pulse rounded-md"></div>
        </div>

        {/* Items Skeleton */}
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex gap-4 p-4 border-b border-ForthColor/30">
            <div className="w-24 h-24 bg-grayColor animate-pulse rounded-md flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-6 bg-grayColor animate-pulse rounded-md"></div>
              <div className="w-1/2 h-4 bg-grayColor animate-pulse rounded-md"></div>
              <div className="w-1/3 h-4 bg-grayColor animate-pulse rounded-md"></div>
            </div>
            <div className="w-24 space-y-2">
              <div className="w-full h-6 bg-grayColor animate-pulse rounded-md"></div>
              <div className="w-2/3 h-4 bg-grayColor animate-pulse rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Original product skeleton
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      <div className="flex-1">
        <div className="w-full h-[400px] bg-grayColor animate-pulse rounded-md"></div>
        <div className="flex gap-4 mt-4">
          {renderSkeletonBlocks(4, "w-16 h-16 bg-grayColor animate-pulse rounded-md")}
        </div>
      </div>
      <div className="flex-1 space-y-6">
        {renderSkeletonBlocks(1, "w-3/4 h-8 bg-grayColor animate-pulse rounded-md")}
        {renderSkeletonBlocks(1, "w-1/2 h-6 bg-grayColor animate-pulse rounded-md")}
        {renderSkeletonBlocks(1, "w-1/3 h-4 bg-grayColor animate-pulse rounded-md")}
        <div className="space-y-2">
          {renderSkeletonBlocks(4, "w-full h-4 bg-grayColor animate-pulse rounded-md")}
        </div>
        <div className="flex gap-4">
          {renderSkeletonBlocks(2, "w-32 h-10 bg-grayColor animate-pulse rounded-md")}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
