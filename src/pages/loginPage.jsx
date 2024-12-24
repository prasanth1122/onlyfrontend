import Navbar from "../components/navbar/navbar";
import LandingNavbar from "../components/navbar/landingpageNavbar";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Simulate login logic
    setTimeout(() => {
      setIsLoading(false);

      if (email && password) {
        // Simulate saving user info in localStorage
        localStorage.setItem("token", "dummyToken123");
        localStorage.setItem("user", "dummyUserId");
        localStorage.setItem("name", "John Doe");

        // Navigate to the home page
        window.location.href = "/";
      } else {
        setErrorMessage("Invalid email or password.");
      }
    }, 1000); // Simulate a 1-second API call
  };

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden">
      <LandingNavbar />
      <main className="w-mainWidth mt-24 flex flex-col items-center gap-8">
        <h1 className="text-4xl text-important_text w-full text-center font-bold">
          Welcome Back!
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-terinary p-8 rounded-lg flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="p-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition"
            disabled={isLoading}
          >
            {isLoading ? "Logging In..." : "Login"}
          </button>
        </form>

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </main>
    </section>
  );
}
