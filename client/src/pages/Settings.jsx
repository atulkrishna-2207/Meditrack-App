import React, { useEffect, useState } from "react";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Toggle dark/light mode by adding class to <html>
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          User Info
        </h3>
        {user ? (
          <p className="text-gray-800 dark:text-gray-200">
            Logged in as: <span className="font-semibold">{user.name}</span>
          </p>
        ) : (
          <p className="text-red-500">No user is logged in.</p>
        )}
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          Appearance
        </h3>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </div>
  );
};

export default Settings;
