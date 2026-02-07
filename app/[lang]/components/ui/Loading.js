

export default function Loading() {
    return (
        <div className=" w-full h-[50px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            <p className="ml-4">Loading...</p>
        </div>
    );
} 