import { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { FaChevronLeft, FaChevronRight, FaShareAlt } from "react-icons/fa";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaBookBookmark } from "react-icons/fa6";
import Comments from "../components/comments/comments.jsx";
import SimilarArticleCard from "../components/similarArticle/similarArticleCard.jsx";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import demoImg from "../assets/demoIMG.png";

export default function ArticleReader() {
  const { isSidebarOpen, isCardOpen, toggleCollectionbar } = useGlobalContext();
  const [newComment, setNewComment] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current string in the array
  const [typedText, setTypedText] = useState(""); // For typing effect
  const [status, setStatus] = useState("neither"); // "liked" | "disliked" | "neither"
  const [isArticleSaved, setIsArticleSaved] = useState(false); // State for article status
  const typingSpeed = 10; // Typing speed in milliseconds

  // Static article data
  const article = {
    data: {
      title: "Exploring the Future of AI",
      relevence:
        "An insightful journey into AI's transformative impact on society.",
      valueProposition:
        "This article delves into how artificial intelligence is reshaping industries and creating opportunities for the future.",
      tags: ["AI", "Technology", "Innovation"],
      cite: "IEEE & Nature",
      subscription: "premium",
      content: [
        "Artificial intelligence (AI) has made tremendous strides in recent years...",
        "Industries such as healthcare, finance, and transportation are being revolutionized by AI...",
        "As we move forward, ethical considerations and responsible development will be crucial...",
      ],
      comments: [
        { _id: "1", username: "Jane Doe", text: "Great insights into AI!" },
        { _id: "2", username: "John Smith", text: "Very informative article!" },
      ],
    },
  };

  const periodical = {
    data: {
      articles: [
        {
          articleId: "1",
          title: "AI in Healthcare",
          category: "Technology",
          month: 1,
          year: 2024,
        },
        {
          articleId: "2",
          title: "Renewable Energy Breakthroughs",
          category: "Science",
          month: 1,
          year: 2024,
        },
      ],
    },
  };

  const fullTextArray = article.data.content || [];

  // Typing effect logic
  useEffect(() => {
    let index = 0;
    const currentText = fullTextArray[currentIndex] || ""; // Ensure currentText is always valid
    let typingTimeout;

    setTypedText(""); // Reset the typed text on index change

    const type = () => {
      if (index <= currentText.length) {
        setTypedText(currentText.slice(0, index)); // Slice ensures valid characters are typed
        index++;
        typingTimeout = setTimeout(type, typingSpeed);
      }
    };

    type();

    // Cleanup timeout on component unmount or index change
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [currentIndex, fullTextArray]);

  // Handlers for navigation
  const handleNext = () => {
    if (currentIndex < fullTextArray.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePostComment = () => {
    if (newComment.trim()) {
      article.data.comments.push({
        _id: `${Date.now()}`,
        username: "Guest",
        text: newComment,
      });
      setNewComment("");
    }
  };

  return (
    <section className="w-full relative h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {isCardOpen && <div>Collection Card Placeholder</div>}
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth mt-24 flex flex-col items-center gap-4">
        {/* Article Details */}
        <section className="w-full h-44 flex flex-col items-start lg:flex-row lg:items-start lg:gap-4">
          <section className="w-full lg:w-2/3 h-full bg-highlight_background rounded-xl p-4 flex flex-col items-start justify-between">
            <p className="text-2xl font-bold text-important_text">
              {article.data.title}
            </p>
            <p className="text-base">{article.data.relevence}</p>
            <div className="flex items-center gap-8">
              {article.data.tags.map((tag, index) => (
                <p key={index} className="bg-terinary px-2 py-1 rounded-lg">
                  {tag}
                </p>
              ))}
            </div>
          </section>
          <section className="w-full lg:flex-1 lg:w-0 lg:ml-4 p-4 h-full bg-terinary rounded-xl flex flex-col items-start justify-between">
            <p className="text-lg font-bold">Subscription</p>
            <p className="text-base">IEEE & Nature</p>
            <p className="text-base">Cite: {article.data.cite}</p>
          </section>
        </section>

        {/* Article Content */}
        <section className="w-full flex flex-col items-start lg:flex-row lg:items-start min-h-96">
          <section className="w-full lg:w-2/3 flex flex-col items-start gap-4">
            <div className="w-full min-h-36 rounded-xl bg-important_text shadow-card_shadow text-white p-4">
              {article.data.valueProposition}
            </div>
            <div className="w-full h-[450px] rounded-xl bg-highlight_background border-2 p-4 text-lg text-gray-800 relative">
              <p>{typedText}</p>
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-secondary text-white p-2 rounded-full hover:shadow-lg"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-secondary text-white p-2 rounded-full hover:shadow-lg"
                onClick={handleNext}
                disabled={currentIndex === fullTextArray.length - 1}
              >
                <FaChevronRight />
              </button>
            </div>
          </section>
          <section className="w-full lg:flex-1 lg:w-0 lg:ml-4 p-4 h-full bg-highlight_background rounded-xl flex flex-col items-start gap-4">
            <div className="flex w-full items-center gap-8 bg-white rounded-xl p-4">
              <AiOutlineLike color={status === "liked" ? "green" : "black"} />
              <AiOutlineDislike
                color={status === "disliked" ? "red" : "black"}
              />
              <FaShareAlt style={{ fill: "black", width: "25px" }} />
              <FaBookBookmark
                style={{
                  fill: isArticleSaved ? "green" : "black",
                  width: "25px",
                  cursor: "pointer",
                }}
                onClick={() => toggleCollectionbar()}
              />
            </div>
            <p className="text-2xl font-bold">Similar Articles</p>
            <div className="flex-1 w-full max-h-96 overflow-y-scroll flex flex-col gap-4 scrollbar-hide">
              {periodical.data.articles.map((similarArticle) => (
                <SimilarArticleCard
                  key={similarArticle.articleId}
                  id={similarArticle.articleId}
                  title={similarArticle.title}
                  category={similarArticle.category}
                />
              ))}
            </div>
          </section>
        </section>

        {/* Comments Section */}
        <section className="w-full flex flex-col items-center gap-4 bg-highlight_background p-4 rounded-xl">
          <p className="text-2xl font-bold w-full">Comments:</p>
          <div className="w-full flex items-center gap-8">
            <input
              className="w-2/3 rounded-lg bg-white text-lg border-2 border-black-500 py-2 px-2 shadow-input_shadow"
              type="text"
              placeholder="Enter your comment"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <p
              className="text-lg font-bold text-white rounded-xl bg-secondary px-4 py-2 hover:cursor-pointer hover:shadow-cta_button_shadow"
              onClick={handlePostComment}
            >
              Comment
            </p>
          </div>
          <div className="w-full flex flex-col items-start gap-4 mt-2">
            {article.data.comments.map((comment) => (
              <Comments
                key={comment._id}
                name={comment.username}
                comment={comment.text}
              />
            ))}
          </div>
        </section>
      </main>
    </section>
  );
}
