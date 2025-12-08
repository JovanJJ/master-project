import Link from "next/link";

const categories = [
  { icon: "🏗️", title: "Construction" },
  { icon: "🔧", title: "Plumbing & Electrical" },
  { icon: "🧹", title: "Cleaning Services" },
  { icon: "💻", title: "IT Professionals" },
  { icon: "🚚", title: "Drivers & Movers" },
];

export default function Categories() {
  return (
    <section id="categories" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Services</h2>
          <p className="mt-4 text-lg text-gray-600">Find the right professional for your specific needs.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              href={`/category/${cat.title.toLowerCase().replace(/ /g, '-')}`} 
              className="group block bg-gray-50 rounded-xl p-6 text-center hover:bg-blue-50 hover:shadow-md transition border border-gray-100 hover:border-blue-200"
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-700">{cat.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}