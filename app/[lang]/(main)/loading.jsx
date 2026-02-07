export default function Loading({ lang }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
      <p className="text-sm text-gray-500">{lang === 'en' ? 'Loading...' : 'Učitava se...'}</p>
    </div>
  );
}