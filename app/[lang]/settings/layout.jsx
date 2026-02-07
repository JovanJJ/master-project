import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default async function HomeLayout({
  children,
  params
}) {
  const { lang } = await params;

  return (
    <div className="min-h-screen flex flex-col antialiased ">
      <Navbar lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}