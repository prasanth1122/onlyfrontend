import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import CollectionCard from "../components/NewLibraryCards/collectionCard.jsx";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import dayjs from "dayjs"; // For date manipulation
import { useNavigate } from "react-router-dom";

export default function LibPage() {
  const { isSidebarOpen } = useGlobalContext();
  const navigate = useNavigate();

  // Static data for collections
  const collections = [
    {
      _id: "1",
      name: "AI Research Papers",
      updatedTime: "2024-01-10T10:00:00Z",
    },
    {
      _id: "2",
      name: "Health and Wellness Journals",
      updatedTime: "2024-01-08T15:30:00Z",
    },
    {
      _id: "3",
      name: "Economics Reports",
      updatedTime: "2024-01-05T12:15:00Z",
    },
  ];

  // Function to get the current week number
  const getWeekNumber = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff =
      date -
      start +
      (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
    return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
  };

  return (
    <section className="w-screen h-screen flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {isSidebarOpen && <Sidebar />}
      <Navbar />
      <main className="w-mainWidth h-full mt-20 flex flex-col items-start gap-4">
        {/* Library Section */}
        <section className="w-full h-2/3 flex flex-col mt-2 items-start justify-between bg-highlight_background p-4 rounded-xl">
          <div className="w-full flex flex-col gap-2">
            <p className="text-2xl font-bold">Library</p>
            <div className="w-full flex items-start gap-8 lg:gap-0 lg:justify-between overflow-x-scroll scrollbar-hide">
              <div
                className="min-w-60 h-28 px-4 rounded-xl bg-terinary flex items-center justify-between hover:cursor-pointer hover:shadow-card_shadow"
                onClick={() => {
                  navigate("/library/today");
                }}
              >
                <p className="text-lg font-bold">Today</p>
                <p className="text-base">{dayjs().format("DD MMM YYYY")}</p>
              </div>
              <div
                className="min-w-60 h-28 px-4 rounded-xl bg-terinary flex items-center justify-between hover:cursor-pointer hover:shadow-card_shadow"
                onClick={() => {
                  navigate("/library/thisweek");
                }}
              >
                <p className="text-lg font-bold">This Week</p>
                <p className="text-base">Week {getWeekNumber(new Date())}</p>
              </div>
              <div
                className="min-w-60 h-28 px-4 rounded-xl bg-terinary flex items-center justify-between hover:cursor-pointer hover:shadow-card_shadow"
                onClick={() => {
                  navigate("/library/thismonth");
                }}
              >
                <p className="text-lg font-bold">This Month</p>
                <p className="text-base">{dayjs().format("MMMM YYYY")}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <p className="text-2xl font-bold">Saved</p>
            <div className="w-full flex items-start gap-8 lg:gap-0 lg:justify-between overflow-x-scroll scrollbar-hide">
              <div
                className="min-w-60 h-28 px-4 rounded-xl bg-terinary flex items-center justify-between hover:cursor-pointer hover:shadow-card_shadow"
                onClick={() => {
                  navigate("/collection/allsaved");
                }}
              >
                <p className="text-lg font-bold">All saved</p>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Section */}
        <section className="w-full h-1/3 flex flex-col items-center justify-center rounded-xl px-4 bg-terinary">
          <div className="w-full flex flex-col gap-2">
            <p className="text-2xl font-bold">Collections</p>
            <div className="w-full flex items-start gap-8 overflow-x-scroll scrollbar-hide">
              {collections.map((collection) => (
                <CollectionCard
                  id={collection._id}
                  key={collection._id}
                  name={collection.name}
                  updated={dayjs(collection.updatedTime).format("DD MMM YYYY")}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}
