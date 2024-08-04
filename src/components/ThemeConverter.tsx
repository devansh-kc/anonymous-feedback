"use client"
import React from "react";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeConverter = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div>
      {" "}
      {darkMode ? (
        <Sun
          className="text-white m-2 2"
          onClick={() => setDarkMode(!darkMode)}
        />
      ) : (
        <Moon
          className="text-black m-2 "
          onClick={() => setDarkMode(!darkMode)}
        />
      )}
    </div>
  );
};

export default ThemeConverter;
