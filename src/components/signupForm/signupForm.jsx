import { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    institution: "",
  });
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Simulate email validation
    if (formData.email === "existing@example.com") {
      setEmailError("Email is already registered.");
      return;
    }

    setIsLoading(true);

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      alert("Signup successful! Redirecting to login...");
      window.location.href = "/login"; // Redirect to login page
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-1/2 bg-terinary px-8 py-4 rounded-xl flex flex-col items-center gap-6 mt-8"
    >
      <p className="text-2xl font-bold text-important_text">Sign Up</p>

      {/* Name Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="name" className="text-lg font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Email Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="email" className="text-lg font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 ${
            emailError
              ? "focus:ring-red-500 border-red-500"
              : "focus:ring-primary"
          }`}
          required
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>

      {/* Role Selection */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="role" className="text-lg font-medium">
          Role
        </label>
        <select
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="educator">Educator</option>
        </select>
      </div>

      {/* Password Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="password" className="text-lg font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Confirm Password Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="text-lg font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter your password"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Institution Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="institution" className="text-lg font-medium">
          Institution
        </label>
        <input
          type="text"
          id="institution"
          value={formData.institution}
          onChange={handleChange}
          placeholder="Enter Institution"
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary transition duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>

      <p className="text-sm">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-important_text font-medium hover:underline"
        >
          Login
        </a>
      </p>
    </form>
  );
}
