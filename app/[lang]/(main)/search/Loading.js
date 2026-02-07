

export default function Loading() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            <p className="ml-4">loading...</p>
        </div>
    );
}