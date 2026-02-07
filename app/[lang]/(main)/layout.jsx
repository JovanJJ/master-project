import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Suspense } from "react";
import Loading from "../(main)/profile/[id]/Loading";

export default async function HomeLayout({
  children,
  params
}) {
  const { lang } = await params;
  return (
    <div className="min-h-screen flex flex-col antialiased ">
      <Navbar lang={lang} />
      <Suspense fallback={<Loading />}>
        <main className="flex-1">{children}</main>
      </Suspense>
      <Footer lang={lang} />
    </div>
  );
}