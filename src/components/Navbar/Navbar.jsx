import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router";
import userIcon from "../../assets/user.png";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signoutUserFunc, loading } = useContext(AuthContext);

  const handleLogOut = () => {
    signoutUserFunc()
      .then(() => toast.success("Logout Successful!"))
      .catch((error) => console.log(error));
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Toys", path: "/all-toys" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Services", path: "/services" },
  ];

  return (
    <nav className="bg-base-100 sticky top-0 shadow-md px-4 py-4 md:px-8 z-50">

      <div className="flex justify-between items-center">
        {/* Brand */}
        <NavLink to="/" className="text-3xl font-bold text-primary">
          ToyVerse
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-base-content hover:text-primary"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Authenticated Links */}
          {user && (
            <>
              <NavLink
                to="/my-cart"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-base-content hover:text-primary"
                }
              >
                MyCart
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-base-content hover:text-primary"
                }
              >
                My Profile
              </NavLink>
            </>
          )}
        </div>

        {/* User Section (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="flex items-center gap-2 text-primary">
              <span className="loading loading-spinner loading-md"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {/* Profile Image with Hover Name */}
              <div className="relative group">
                <img
                  className="w-12 h-12 rounded-full cursor-pointer border-2 border-transparent hover:border-primary transition"
                  src={user ? user.photoURL : userIcon}
                  alt="User"
                />
                {user && (
                  <span
                    className="absolute flex items-center bottom-full -top-2 -left-[65px] mb-2
                    bg-gradient-to-r from-pink-500 to-rose-400 text-white text-sm font-semibold
                    px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 whitespace-nowrap"
                  >
                    {user.displayName}
                  </span>
                )}
              </div>

              {/* Login / Logout Button */}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary px-10"
                >
                  LogOut
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  className="px-10 py-2 rounded-lg bg-[#EB1551] hover:bg-[#C71145] text-white font-semibold transition-colors duration-200"
                >
                  Login/Register
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl font-bold"
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 bg-base-100 p-4 rounded-lg shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <span className="loading loading-spinner loading-md text-primary"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {/* User Section */}
              <div className="w-full flex flex-col items-center gap-2 justify-center">
                <div className="my-2">
                  <img
                    className="w-12 rounded-full"
                    src={user ? user.photoURL : userIcon}
                    alt="User"
                  />
                </div>
                {user && (
                  <div className="w-full mb-1 text-center">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-2 rounded">
                      {user.displayName}
                    </span>
                  </div>
                )}
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col items-center gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold"
                        : "text-base-content hover:text-primary"
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {user && (
                  <>
                    <NavLink
                      to="/my-cart"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary font-semibold"
                          : "text-base-content hover:text-primary"
                      }
                    >
                      MyCart
                    </NavLink>
                    <NavLink
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "text-primary font-semibold"
                          : "text-base-content hover:text-primary"
                      }
                    >
                      My Profile
                    </NavLink>
                  </>
                )}
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 mt-2">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogOut();
                      setIsOpen(false);
                    }}
                    className="px-10 py-2 w-full rounded-lg text-center bg-[#EB1551] hover:bg-[#C71145] text-white font-semibold transition-colors duration-200"
                  >
                    LogOut
                  </button>
                ) : (
                  <Link
                    to="/auth/login"
                    onClick={() => setIsOpen(false)}
                    className="px-10 py-2 w-full text-center rounded-lg bg-[#EB1551] hover:bg-[#C71145] text-white font-semibold transition-colors duration-200"
                  >
                    Login/Register
                  </Link>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
