import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function HomeLayout({
  children,
}) {

  return (
    <div className="min-h-screen flex flex-col antialiased ">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}