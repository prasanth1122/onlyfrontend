import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import StorePage from "./pages/storePage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import SubscriptionPage from "./pages/subscriptionPage";
import HomePage from "./pages/homePage";
import { GlobalProvider } from "./store/context/globalContext.jsx";
import LibPage from "./pages/libpage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import PeriodicalPage from "./pages/periodicalPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import ArticleReader from "./pages/articleReader.jsx";
import Today from "./pages/todayPage.jsx";
import ThisWeek from "./pages/thisWeekPage.jsx";
import ThisMonth from "./pages/thisMonth.jsx";
import CollectionPage from "./pages/collectionPage.jsx";
import AllSaved from "./pages/allsaved.jsx";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="w-screen h-screen scrollbar-hide">
          <Routes>
            {/* Static Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/library" element={<LibPage />} />
            <Route path="/library/today" element={<Today />} />
            <Route path="/library/thisweek" element={<ThisWeek />} />
            <Route path="/library/thismonth" element={<ThisMonth />} />
            <Route path="/periodical" element={<PeriodicalPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/article" element={<ArticleReader />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/collection/allsaved" element={<AllSaved />} />

            {/* Handle 404 for undefined routes */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
