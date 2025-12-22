import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          MasterHub
        </Link>
        <div>
          <Link href="/login" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium">
            Nalog
          </Link>
          <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-2 font-medium transition">
            Registruj se
          </Link>
        </div>
      </div>
    </nav>
  );
}