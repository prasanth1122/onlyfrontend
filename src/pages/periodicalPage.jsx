import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import ArticleCard from "../components/articlesCard/articleCard";
import demoImg from "../assets/demoIMG.png";
import { useGlobalContext } from "../store/context/globalContext";

export default function PeriodicalPage() {
  const { isSidebarOpen } = useGlobalContext();

  // Static dummy data for the periodical
  const periodical = {
    data: {
      title: "Scientific Innovations of the Month",
      introduction:
        "Explore groundbreaking discoveries and advancements from the world of science and technology this month.",
      category: "Science & Technology",
      image: demoImg,
      author: "John Doe",
      month: "January",
      year: "2024",
      tags: ["Science", "Innovation", "Technology"],
      articles: [
        {
          articleId: "1",
          title: "AI Revolution in Healthcare",
          description:
            "A comprehensive look at how AI is transforming the healthcare industry, enabling better outcomes and efficiency.",
          author: "Jane Smith",
        },
        {
          articleId: "2",
          title: "Renewable Energy Breakthroughs",
          description:
            "Innovations in solar and wind energy are reshaping the global energy landscape.",
          author: "Michael Brown",
        },
        {
          articleId: "3",
          title: "Space Exploration Milestones",
          description:
            "New achievements in space exploration are bringing us closer to understanding the universe.",
          author: "Sarah Johnson",
        },
      ],
    },
  };

  const { title, introduction, category, author, month, year, articles } =
    periodical.data;

  return (
    <section className="w-screen h-screen flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth h-full mt-20 flex flex-col items-center gap-4">
        {/* Periodical Intro Section */}
        <section className="w-full rounded-xl bg-[#2c2c2c] py-4 h-auto flex text-white justify-center">
          <div className="w-mainWidth flex flex-col-reverse items-center md:flex-row md:items-start gap-6 md:justify-between">
            <img
              src={demoImg}
              className="w-coverImage rounded-xl h-coverImage"
              alt={title}
            />
            <div className="w-full flex flex-col items-center md:items-start md:gap-4 lg:gap-8 gap-4">
              <p className="text-2xl md:text-4xl font-bold">{title}</p>
              <p className="text-sm lg:text-lg" style={{ lineHeight: "1.2" }}>
                {introduction}
              </p>
              <p className="font-semibold">{author}</p>
              <p className="px-4 py-2 border-2 border-black bg-white rounded-lg text-black">
                {category}
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Edition Section */}
        <section className="w-full flex flex-col items-center gap-2">
          <p className="text-2xl font-bold">
            Monthly Edition: {`${month}/${year}`}
          </p>
          <p className="text-lg">Highlights of the month.</p>
        </section>

        {/* Articles Section */}
        <section className="w-full flex flex-col items-center gap-4 mt-2 pb-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.articleId}
              id={article.articleId}
              article={article}
              parentcategory={category}
            />
          ))}
        </section>
      </main>
    </section>
  );
}
