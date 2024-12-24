import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import LibCard from "../components/libraryCard/libCard.jsx";

export default function ThisMonth() {
  const { isSidebarOpen } = useGlobalContext();

  // Static data for liked articles this month
  const thisMonthLikedArticles = [
    {
      articleId: "1",
      title: "AI Advancements in 2024",
      category: "Technology",
      likedAt: "2024-01-05T10:00:00Z",
    },
    {
      articleId: "2",
      title: "Health Innovations",
      category: "Medical",
      likedAt: "2024-01-15T12:30:00Z",
    },
    {
      articleId: "3",
      title: "Global Economic Trends",
      category: "Economics",
      likedAt: "2024-01-20T15:45:00Z",
    },
    {
      articleId: "4",
      title: "Sustainability Practices",
      category: "Environment",
      likedAt: "2024-01-10T11:00:00Z",
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      {/* Main Content */}
      <main className="w-mainWidth mt-20 flex flex-col items-center">
        <p className="text-2xl w-full font-bold mt-2 text-important_text">
          Articles Liked This Month
        </p>
        {thisMonthLikedArticles.length > 0 ? (
          <div className="w-full flex items-start gap-4 mt-4 flex-wrap">
            {thisMonthLikedArticles.map((article) => (
              <LibCard
                key={article.articleId}
                id={article.articleId}
                title={article.title}
                category={article.category}
              />
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-600 mt-4">
            No articles liked this month.
          </p>
        )}
      </main>
    </section>
  );
}
