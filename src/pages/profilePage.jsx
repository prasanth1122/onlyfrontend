import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import { useGlobalContext } from "../store/context/globalContext.jsx";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { isSidebarOpen } = useGlobalContext();
  const [isEditing, setIsEditing] = useState(false);

  // Static dummy data for the user
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    institution: "University of Example",
    preferences: ["Technology", "Science", "Health"],
  });

  const [newPreference, setNewPreference] = useState("");

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setNewPreference(""); // Clear the new preference input when toggling
  };

  const handlePreferenceChange = (e) => {
    setNewPreference(e.target.value);
  };

  const handlePreferenceSubmit = () => {
    if (
      newPreference.trim() &&
      !user.preferences.includes(newPreference.trim())
    ) {
      setUser((prevUser) => ({
        ...prevUser,
        preferences: [...prevUser.preferences, newPreference.trim()],
      }));
      setNewPreference("");
    } else if (newPreference.trim()) {
      toast.error("Preference already exists!");
    }
  };

  const handleDeletePreference = (index) => {
    setUser((prevUser) => ({
      ...prevUser,
      preferences: prevUser.preferences.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 overflow-x-hidden scrollbar-hide">
      {/* Sidebar */}
      {isSidebarOpen && <Sidebar />}
      <Navbar />

      {/* Main Content */}
      <main className="w-mainWidth bg-highlight_background rounded-xl p-6 items-start mt-20 flex flex-col gap-4">
        <div className="w-full flex items-center justify-between mb-4 mt-2">
          <p className="text-4xl font-bold">Profile</p>
          <button
            className="px-4 py-2 text-lg text-white font-semibold rounded-lg bg-secondary flex items-center gap-2"
            onClick={handleEditToggle}
          >
            {isEditing ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancel
              </>
            ) : (
              "Edit"
            )}
          </button>
        </div>

        <section className="w-full flex flex-col items-start gap-6">
          {/* Name */}
          <div className="w-full flex flex-col items-start gap-2">
            <p className="w-full text-lg font-bold">Name</p>
            <input
              className="w-full px-4 py-2 bg-white border rounded-md outline-none focus:ring-2 focus:ring-primary"
              type="text"
              value={user.name}
              disabled={!isEditing}
              placeholder="Enter your Name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="w-full flex flex-col items-start gap-2">
            <p className="w-full text-lg font-bold">Email</p>
            <input
              className="w-full px-4 py-2 bg-white border rounded-md outline-none focus:ring-2 focus:ring-primary"
              type="email"
              value={user.email}
              disabled
              placeholder="Enter your Email"
            />
          </div>

          {/* Role */}
          <div className="w-full flex items-center gap-6 my-8">
            <p className="text-lg font-bold">User:</p>
            <p className="text-lg">{user.role}</p>
          </div>

          {/* Institution */}
          <div className="w-full flex flex-col items-start gap-2">
            <p className="w-full text-lg font-bold">Institution</p>
            <input
              className="w-full px-4 py-2 bg-white border rounded-md outline-none focus:ring-2 focus:ring-primary"
              type="text"
              value={user.institution}
              disabled={!isEditing}
              placeholder="Enter Institution Name"
              onChange={(e) =>
                setUser({ ...user, institution: e.target.value })
              }
            />
          </div>

          {/* Preferences */}
          <div className="w-full flex flex-col items-start gap-2">
            <p className="w-full text-lg font-bold">Preferences</p>
            {user.preferences.length > 0 ? (
              <ul className="w-full">
                {user.preferences.map((pref, index) => (
                  <li
                    key={index}
                    className="text-lg flex items-center justify-between w-full"
                  >
                    {pref}
                    {isEditing && (
                      <button
                        className="flex items-center justify-center w-6 h-6 bg-red-500 text-white rounded-full hover:shadow-sm"
                        onClick={() => handleDeletePreference(index)}
                      >
                        ✕
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg">No preferences set</p>
            )}
            {isEditing && (
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white border rounded-md outline-none focus:ring-2 focus:ring-primary"
                  value={newPreference}
                  onChange={handlePreferenceChange}
                  placeholder="Add new preference"
                />
                <button
                  className="px-4 py-2 text-lg text-white font-semibold rounded-lg bg-primary"
                  onClick={handlePreferenceSubmit}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Submit Button */}
        {isEditing && (
          <button
            className="px-6 py-2 mt-6 text-lg text-white font-semibold rounded-lg bg-primary self-end"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </main>
    </section>
  );
}
