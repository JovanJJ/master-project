import Link from "next/link";

export default function Footer() {
  

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-[56px]">
      <div className="container mx-auto px-4 text-center md:text-left grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-2xl font-bold text-white mb-4">WorkFinder</h4>
          <p>Connecting trusted professionals with local clients for over a decade.</p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/search" className="hover:text-white">Find a Worker</Link></li>
            <li><Link href="/join" className="hover:text-white">List Your Services</Link></li>
            <li><Link href="/about" className="hover:text-white">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Support</h4>
          <ul className="space-y-2">
            <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link href="/trust" className="hover:text-white">Trust & Safety</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center mt-8 pt-8 border-t border-gray-700">
        <p>&copy;  MasterHub Platforma. Sva prava zadržana.</p>
      </div>
    </footer>
  );
}