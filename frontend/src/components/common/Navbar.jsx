import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "./LoadingSpinner";
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
    const [hoveredButton, setHoveredButton] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const queryParams = new URLSearchParams(window.location.search)
    const [search, setSearch] = useState(queryParams.get("search") || "")

    const nav = useNavigate()

    const sub = () => {
        console.log(search)
        const url = `/?${new URLSearchParams({search: search}).toString()}`
        nav(url)
    }

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-primary px-4 py-2 lg:py-3 z-50">
            <div className="flex items-center justify-between w-full">
                
                {/* Fully left-aligned logo */}
                <div className="flex-shrink-0">
                    <Link to="/">
                        <img
                            src="./logo.png"
                            alt="Logo"
                            className="w-16 md:w-20 lg:w-24"
                        />
                    </Link>
                </div>

                {/* Centered search bar */}
                <div className="flex flex-grow justify-center px-4">
                    <form className="flex w-full max-w-md">
                        <input
                            type="search"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => {setSearch(e.target.value)}}
                            aria-label="Search"
                            className="form-input w-full border border-gray-800 px-4 py-2 text-base focus:outline-none"
                        />
                        <div
                            onClick={sub}
                            className={`ml-2 border cursor-pointer border-gray-800 px-4 py-2 transition-colors ${hoveredButton ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                            onMouseEnter={() => setHoveredButton(true)}
                            onMouseLeave={() => setHoveredButton(false)}
                        >
                            Search
                        </div>
                    </form>
                </div>

                {/* Right-aligned dark mode toggle */}
                <div className="flex-shrink-0">
                    <button onClick={toggleDarkMode} className="text-sm font-medium text-white">
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
            </div>        
        </nav>
    );
}
