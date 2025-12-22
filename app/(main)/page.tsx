import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import HowItWorks from "../components/HowItWorks";
import FeaturedWorkers from "../components/FeaturedWorkers";


export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Hero />
      <SearchBar />
      <Categories />
      <HowItWorks />
      <FeaturedWorkers />
    </main>
  );
}