import Link from "next/link";

export default function Footer() {


  return (
    <footer className="bg-blue-100 text-gray-800 py-8  rounded-tl-[50px] rounded-tr-[50px]">
      <div className="container mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Master Hub</h4>
          <p>Spajamo majstore sa poslodavcima i poslodavce sa majstorima.</p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Linkovi</h4>
          <div className="flex flex-col md:flex-row md:gap-6">
            <div>
              <ul className="space-y-2">
                <li><Link href="/search" className="hover:text-black">Početna</Link></li>
                <li><Link href="/join" className="hover:text-black">Uloguj se</Link></li>
                <li><Link href="/about" className="hover:text-black">Registruj se</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><Link href="/search" className="hover:text-black">O nama</Link></li>
                <li><Link href="/about" className="hover:text-black">Početna</Link></li>
              </ul>
            </div>

          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Podrška</h4>
          <ul className="space-y-2">
            <li><Link href="/contact" className="hover:text-black">Kontaktirajte nas</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center mt-8 pt-8 border-t border-gray-700">
        <p>&copy;  MasterHub Platforma. Sva prava zadržana.</p>
      </div>
    </footer>
  );
}