import Link from "next/link";

export default function Footer({ lang }) {

  console.log(lang)
  return (
    <footer className="bg-blue-100 text-gray-800 py-8  rounded-tl-[50px] rounded-tr-[50px]">
      <div className="container mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Master Hub</h4>
          <p>{lang === 'en' ? 'Connecting masters with employers and employers with masters.' : 'Spajamo majstore sa poslodavcima i poslodavce sa majstorima.'}</p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4"> {lang === 'en' ? 'Links' : 'Linkovi'}</h4>
          <div className="flex flex-col md:flex-row md:gap-6">
            <div>
              <ul className="space-y-2">
                <li><Link href="/search" className="hover:text-black">{lang === 'en' ? 'Home' : 'Početna'}</Link></li>
                <li><Link href="/join" className="hover:text-black">{lang === 'en' ? 'Log in' : 'Uloguj se'}</Link></li>
                <li><Link href="/about" className="hover:text-black">{lang === 'en' ? 'Register' : 'Registruj se'}</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><Link href="/search" className="hover:text-black"> {lang === 'en' ? 'About' : 'O nama'}</Link></li>
                <li><Link href="/about" className="hover:text-black">{lang === 'en' ? 'Home' : 'Početna'}</Link></li>
              </ul>
            </div>

          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4"> {lang === 'en' ? 'Support' : 'Podrška'}</h4>
          <ul className="space-y-2">
            <li><Link href="/contact" className="hover:text-black">{lang === 'en' ? 'Contact us' : 'Kontaktirajte nas'}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center mt-8 pt-8 border-t border-gray-700">
        <p>&copy;   {lang === 'en' ? 'MasterHub Platform. All rights reserved.' : 'MasterHub Platforma. Sva prava zadržana.'}</p>
      </div>
    </footer>
  );
}