import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import LibCard from "../components/libraryCard/libCard.jsx";

export default function AllSaved() {
  const { isSidebarOpen } = useGlobalContext();

  // Static data for all saved articles
  const allArticles = [
    {
      _id: "1",
      title: "Understanding AI",
      category: "Technology",
      month: 1,
      year: 2024,
    },
    {
      _id: "2",
      title: "Medical Innovations",
      category: "Medical",
      month: 12,
      year: 2023,
    },
    {
      _id: "3",
      title: "Economic Trends",
      category: "Economics",
      month: 11,
      year: 2023,
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="w-mainWidth mt-20 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-important_text">
          All Saved Articles
        </h1>

        {/* Display articles if available */}
        {allArticles.length > 0 ? (
          <div className="w-full flex flex-wrap gap-4 mt-6">
            {allArticles.map((article) => (
              <LibCard
                key={article._id}
                id={article._id}
                title={article.title}
                category={article.category}
                month={article.month}
                year={article.year}
              />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 mt-6">
            No saved articles found in your collections.
          </p>
        )}
      </main>
    </section>
  );
}
