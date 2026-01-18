import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Suspense } from "react";
import Loading from "../(main)/profile/[id]/Loading";

export default function HomeLayout({
  children,
}) {
  return (
    <div className="min-h-screen flex flex-col antialiased ">
      <Navbar />
      <Suspense fallback={<Loading />}>
      <main className="flex-1">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}