import React from 'react';

export default function PostSkeleton() {
    const SkeletonCard = () => (
        <div className="border dark:border-gray-700 lg:w-[70%] w-full m-auto flex flex-col justify-center my-3 p-3 animate-pulse bg-white dark:bg-[#1e293b] rounded-md">
            <div className='flex items-center mb-3 gap-3'>
                <div className='rounded-full w-[70px] h-[70px] overflow-hidden p-1 shadow-md bg-gray-200 dark:bg-gray-600'></div>
                <div>
                    <h3 className='font-bold text-[#24919B] lg:w-96 w-52 h-5 bg-gray-200 dark:bg-gray-600 rounded'></h3>
                    <p className='text-sm text-gray-400 lg:w-60 w-40 my-3 h-3 bg-gray-200 dark:bg-gray-600 rounded'></p>
                    <p className='text-xs text-gray-400 lg:w-40 w-30 h-2 bg-gray-200 dark:bg-gray-600 rounded'></p>
                </div>
            </div>
            <div className='bg-gray-300 dark:bg-gray-700 h-40 rounded-md'></div>
            <div className="mt-3">
                <p className="w-full h-3 bg-gray-200 dark:bg-gray-600 mb-2 rounded"></p>
                <p className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded"></p>
            </div>
        </div>
    );

    return (
        <div>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    );
}
