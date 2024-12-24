import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import LibCard from "../components/libraryCard/libCard.jsx"; // Assuming you have a LibCard component
import { useGlobalContext } from "../store/context/globalContext.jsx";

export default function CollectionPage() {
  const { isSidebarOpen } = useGlobalContext();

  // Static data for a single collection
  const collection = {
    name: "Tech Innovations",
    articles: [
      {
        articleId: "1",
        title: "Understanding AI",
        category: "Technology",
        month: 1,
        year: 2024,
      },
      {
        articleId: "2",
        title: "The Future of Computing",
        category: "Computers",
        month: 12,
        year: 2023,
      },
      {
        articleId: "3",
        title: "Blockchain Breakthroughs",
        category: "Technology",
        month: 11,
        year: 2023,
      },
    ],
  };

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />

      {/* Main Content */}
      <main className="w-full mt-20 flex flex-col items-center">
        <p className="w-mainWidth mt-2 text-2xl font-bold text-important_text">
          Collection: {collection.name}
        </p>
        <div className="w-mainWidth mt-4 flex items-start gap-4 flex-wrap">
          {collection.articles.map((article) => (
            <LibCard
              key={article.articleId}
              id={article.articleId}
              title={article.title}
              category={article.category}
              month={article.month}
              year={article.year}
            />
          ))}
        </div>
      </main>
    </section>
  );
}
