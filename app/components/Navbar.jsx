import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';
import HeaderContainer from "../components/ui/HeaderContainer";
import MobileMenu from "../components/ui/MobileMenu";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  const role = session?.user.role;
  const id = session?.user.id;

  const res = await fetch(`http://localhost:3000/api/current-user?role=${role}&id=${id}`);
  const data = await res.json();
  
  return (
    data && 
    <nav className="bg-white shadow-sm py-4 px-10 sticky top-0 z-100 h-[70px] flex items-center justify-between">
      <div className='leftSection'>
        <Link href="/" className="text-2xl font-bold text-blue-500 sticky z-60">
          MasterHub
        </Link>
      </div>

      <div className='hidden md:flex items-center mr-15 lg:mr-30'>
        <div className='hidden md:flex px-4 border-r'>
          <Link href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium">
          Početna
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium">
          O nama
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium">
          Kontakt
        </Link>
        </div>
        <Link href={id && role ? "account" : "/login"} className="text-gray-600 hover:text-blue-600 px-3 py-2 font-medium ml-4">
          {id && role? "Nalog": "Prijavi se"}
        </Link>
        <Link href="/register/worker" className="bg-blue-500 text-white px-4 h-2/3 py-2 rounded-md hover:bg-blue-700 ml-2 font-medium transition">
          Registruj se
        </Link>
        
         

        {role && id && <HeaderContainer profilePicture={data.data.profileImage} />}
      </div>

      {<MobileMenu />}


    </nav>
    
  );
}