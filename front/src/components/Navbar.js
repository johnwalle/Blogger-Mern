import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";
import NoAvatar from "../assets/no-profile-picture-15257.png";
const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuClose = () => {
    setMenuOpen(false);
  }


  const logoutHandler = () => {
    logout();
  };



  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold text-xl">
                <button onClick={menuClose}>
                  <Link
                    to="/"
                    className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Blogger
                  </Link>
                </button>

              </span>
            </div>
          </div>
          <div className="hidden md:flex">
            {user ? (
              <div className="flex items-center">
                <Link
                  to="/create"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Create Post
                </Link>
                <Link
                  to="/author"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Authors
                </Link>
                <button
                  onClick={logoutHandler}
                  className="text-gray-100 border-cyan-400 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log out
                </button>
                <Link
                  to="/profile"
                  className="text-gray-300  hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <div className="flex items-center justify-center">
                    <div>
                      <img
                        src={
                          user.avatar
                            ? `${user.avatar}`
                            : NoAvatar
                        }
                        alt="Post Thumbnail"
                        className="rounded-full object-cover border border-white w-12 h-12 mr-2"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex">
                <Link
                  to="/author"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Authors
                </Link>
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <button onClick={menuClose} className="w-full">
                  <Link
                    to="/create"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Create Post
                  </Link>
                </button>
                <button onClick={menuClose} className="w-full">
                  <Link
                    to="/author"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Authors
                  </Link>
                </button>

                <button onClick={menuClose} className="w-full">
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {user.name}
                  </Link>
                </button>

                <button
                  onClick={logoutHandler}
                  className="w-full text-gray-100 border-cyan-400 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button onClick={menuClose} className="w-full">
                  <Link
                    to="/author"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Authors
                  </Link>
                </button>
                <button onClick={menuClose} className="w-full">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
