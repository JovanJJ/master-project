

export default function Loading() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            <p className="ml-4">Učitava se...</p>
        </div>
    );
}