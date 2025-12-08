import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Categories from "./components/Categories";
import HowItWorks from "./components/HowItWorks";
import FeaturedWorkers from "./components/FeaturedWorkers";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Navbar />
      <Hero />
      <SearchBar />
      <Categories />
      <HowItWorks />
      <FeaturedWorkers />
      <Footer />
    </main>
  );
}