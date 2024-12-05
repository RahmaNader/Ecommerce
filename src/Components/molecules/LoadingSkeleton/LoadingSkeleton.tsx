import React from "react";

const LoadingSkeleton: React.FC = () => {
  const renderSkeletonBlocks = (count: number, className: string) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className={className}></div>
    ));
  };

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
