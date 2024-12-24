import Navbar from "../components/navbar/navbar";
import demoImg from "../assets/demoIMG.png";
import { FaArrowRight, FaGlobe } from "react-icons/fa";
import { GiDna2 } from "react-icons/gi";
import { RiComputerFill } from "react-icons/ri";
import { IoIosPricetag } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Sidebar from "../components/sidebar/sidebar";
import Trending from "../components/trendingJournlas/trending";
import PeriodicalCard from "../components/libraryCard/periodicalCard";
import { useGlobalContext } from "../store/context/globalContext.jsx";
export default function HomePage() {
  const { isSidebarOpen } = useGlobalContext();
  const navigate = useNavigate();

  // Dummy periodicals data
  const periodicals = [
    {
      _id: "1",
      title: "The Global Economy Today",
      category: "Economics",
      month: "January",
      year: 2024,
      articles: [
        {
          articleId: {
            _id: "101",
            title: "Economic Growth Trends",
            category: "Economics",
            valueProposition:
              "Exploring the driving factors behind global growth.",
          },
        },
      ],
    },
    {
      _id: "2",
      title: "AI in Healthcare",
      category: "Medical",
      month: "February",
      year: 2024,
      articles: [
        {
          articleId: {
            _id: "102",
            title: "AI Transforming Diagnosis",
            category: "Medical",
            valueProposition:
              "The role of AI in improving diagnostic accuracy.",
          },
        },
      ],
    },
  ];

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide bg-highlight_background">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />

      {/* Main Content */}
      <main className="w-full mt-20 flex flex-col items-center">
        {/* Intro Section */}
        <section className="w-mainWidth rounded-xl mt-1 bg-[#2c2c2c] py-8 h-auto flex text-white justify-center">
          <div className="w-mainWidth flex flex-col-reverse items-center md:flex-row md:items-start gap-6 md:justify-between">
            <div className="w-full md:h-coverImage md:w-2/3 flex flex-col items-center md:items-start md:gap-4 lg:gap-8 gap-4">
              <p className="text-2xl md:text-4xl font-bold">
                Coherence Applied
              </p>
              <p className="text-sm lg:text-lg" style={{ lineHeight: "1.2" }}>
                Coherence Applied is a monthly periodical by the coherence
                editorial board, collecting the latest scientific and
                technological developments across the globe and presenting them
                concisely and comprehensively.
              </p>
              <div className="w-full flex flex-row flex-wrap gap-4 lg:gap-8 text-white">
                <p className="text-sm, md:text-lg font-bold flex items-center gap-2">
                  <FaGlobe style={{ width: "20px", height: "20px" }} />
                  Nature
                </p>
                <p className="text-sm, md:text-lg font-bold flex items-center gap-2">
                  <GiDna2 style={{ width: "20px", height: "20px" }} />
                  Medical
                </p>
                <p className="text-sm, md:text-lg font-bold flex items-center gap-2">
                  <RiComputerFill style={{ width: "20px", height: "20px" }} />
                  Computers
                </p>
                <p className="text-sm, md:text-lg font-bold flex items-center gap-2">
                  <IoIosPricetag style={{ width: "20px", height: "20px" }} />
                  Economics
                </p>
              </div>
              <div className="flex flex-col items-start w-full gap-4 md:flex-row">
                <button
                  className="px-4 py-2 md:text-sm lg:text-lg bg-secondary rounded-lg text-lg font-semibold flex items-center gap-4 group"
                  onClick={() => {
                    navigate("/store");
                  }}
                >
                  Visit Store
                  <FaArrowRight
                    style={{ width: "25px" }}
                    className="transition-transform duration-300 group-hover:-rotate-45"
                  />
                </button>
              </div>
            </div>
            <img
              src={demoImg}
              className="w-coverImage rounded-xl h-coverImage"
              alt="Demo"
            />
          </div>
        </section>

        {/* Latest Periodicals Section */}
        <section className="w-mainWidth bg-terinary mt-4 rounded-lg p-4">
          <div className="w-full flex items-center justify-between">
            <p className="text-2xl font-bold">Latest Periodicals</p>
            <p
              className="flex items-center gap-4 text-lg hover:underline hover:text-secondary text-important_text hover:cursor-pointer"
              onClick={() => {
                navigate("/store");
              }}
            >
              See All <ArrowRight />
            </p>
          </div>

          <div className="w-full flex items-start gap-4 overflow-x-auto mt-4 scrollbar-hide">
            {periodicals.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                {periodicals.map((periodical) => (
                  <PeriodicalCard
                    key={periodical._id}
                    id={periodical._id}
                    title={periodical.title}
                    category={periodical.category}
                    month={periodical.month}
                    year={periodical.year}
                  />
                ))}
              </div>
            ) : (
              <p>No periodicals available this month.</p>
            )}
          </div>
        </section>

        {/* Trending Articles Section */}
        <section className="w-mainWidth py-4">
          <div className="w-full flex items-center justify-between">
            <p className="text-2xl font-bold">Trending Articles</p>
            <p
              className="flex items-center gap-4 text-lg hover:underline hover:text-secondary text-important_text hover:cursor-pointer"
              onClick={() => {
                navigate("/store");
              }}
            >
              See All <ArrowRight />
            </p>
          </div>

          <div className="w-full flex p-2 items-start gap-8 overflow-x-auto mt-4 scrollbar-hide">
            {periodicals[0]?.articles.map((article) => (
              <div
                key={article.articleId._id}
                className="flex-shrink-0 rounded-xl overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
              >
                <Trending
                  id={article.articleId._id}
                  category={article.articleId.category}
                  title={article.articleId.title}
                  value={article.articleId.valueProposition}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}
