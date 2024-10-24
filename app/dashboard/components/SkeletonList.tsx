import React from 'react';

const SkeletonList: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="animate-pulse flex space-x-4">
          {/* Avatar/Circle */}
          {/* <div className="rounded-full bg-gray-300 h-10 w-10"></div> */}
          {/* Lines */}
          <div className="flex-1  ">
            <div className="h-4 bg-gray-300 rounded w-[90%]"></div>
            {/* <div className="h-4 bg-gray-300 rounded"></div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonList;
