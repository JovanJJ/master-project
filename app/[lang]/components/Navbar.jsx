import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth-config';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import HeaderContainer from "../components/ui/HeaderContainer";
import MobileMenu from "../components/ui/MobileMenu";
import Languages from './Languages';
import NavLink from './NavLink';

export default async function Navbar({ lang }) {
  const session = await getServerSession(authOptions);

  const role = session?.user.role;
  const id = session?.user.id;

  let profileImage = null;

  if (role && id) {
    try {
      const headersList = await headers();
      const host = headersList.get('host') || 'localhost:3000';
      const protocol = headersList.get('x-forwarded-proto') || 'http';
      const baseUrl = `${protocol}://${host}`;

      const res = await fetch(`${baseUrl}/api/current-user?role=${role}&id=${id}`, {
        cache: 'no-store',
        headers: {
          'Cookie': headersList.get('cookie') || '',
        }
      });
      if (res.ok) {
        const data = await res.json();
        profileImage = data?.data?.profileImage;
      }
    } catch (error) {
      console.error('Failed to fetch profile image:', error);
    }
  }

  const home = lang === 'en' ? 'Home' : 'Početna';
  const about = lang === 'en' ? 'About' : 'O nama';
  const contact = lang === 'en' ? 'Contact' : 'Kontakt';
  const account = lang === 'en' ? 'Account' : 'Nalog';
  const login = lang === 'en' ? 'Login' : 'Prijavi se';
  const register = lang === 'en' ? 'Register' : 'Registruj se';

  return (
    <nav className="bg-white shadow-sm px-5 sticky top-0 z-100 h-[57px] flex items-center justify-between">
      <div className='leftSection lg:w-[200px]'>
        <Link href="/" className="text-2xl font-bold text-blue-500 sticky z-60">
          MasterHub
        </Link>
      </div>

      <div className='hidden lg:flex items-center  '>
        <div className='hidden lg:flex px-4 border-r'>
          <NavLink href="/" children={home} />
          <NavLink href="/about" children={about} />
          <NavLink href="/contact" children={contact} />
        </div>
        <div>
          <Link href={id && role ? "account" : "/login"} className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium ml-4">
            {id && role ? lang === 'en' ? "Account" : "Nalog" : lang === 'en' ? "Login" : "Prijavi se"}
          </Link>
          <Link href="/register/worker" className="bg-blue-500 text-white px-4 h-2/3 py-2 rounded-md hover:bg-blue-700 ml-2 font-medium transition">
            {lang === 'en' ? 'Register' : 'Registruj se'}
          </Link>
        </div>
      </div>

      <div className='flex h-full items-center justify-center'>
        <Languages />
        {role && id && <HeaderContainer profilePicture={profileImage} lang={lang} />}
      </div>

      {<MobileMenu lang={lang} />}


    </nav>

  );
}