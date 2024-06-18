import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 fixed bottom-0 left-0 w-full">
            <div className="mx-auto text-center">
                <div className="flex flex-wrap justify-center">
                    <Link
                        to="/posts/categories/Agriculture"
                        className="footer-link text-white mx-2 my-1 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                        Agriculture
                    </Link>
                    <Link
                        to="/posts/categories/Business"
                        className="footer-link text-white mx-2 my-1 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                        Business
                    </Link>
                    <Link
                        to="/posts/categories/Art"
                        className="footer-link text-white mx-2 my-1 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                        Art
                    </Link>
                    <Link
                        to="/posts/categories/Education"
                        className="footer-link text-white mx-2 my-1 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                        Education
                    </Link>
                    <Link
                        to="/posts/categories/Sport"
                        className="footer-link text-white mx-2 my-1 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                        Sport
                    </Link>
                    <Link
                        to="/posts/categories/Investment"
                        className="footer-link text-white mx-2 my-1 bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                        Investment
                    </Link>
                    <Link
                        to="/posts/categories/Uncategorized"
                        className="footer-link text-white mx-2 my-1 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                        Uncategorized
                    </Link>
                    <Link
                        to="/posts/categories/Weather"
                        className="footer-link text-white mx-2 my-1 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                        Weather
                    </Link>
                </div>
            </div>
            <div className="mx-auto text-center mt-4">
                &copy; {new Date().getFullYear()} Blogger App By <span className="text-red-300 font-semibold">Leojo</span>
            </div>
        </footer>
    );
};

export default Footer;