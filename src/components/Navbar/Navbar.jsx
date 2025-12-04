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
    <nav className="bg-base-100 sticky top-0 shadow-md px-4 py-4 md:px-6 lg:px-10 z-50">
      <div className="flex justify-between items-center relative">
        {/* Logo */}
        <NavLink to="/" className="text-2xl md:text-3xl font-bold text-primary">
          ToyVerse
        </NavLink>

        {/* Desktop + Tablet Menu */}
        <div className="hidden md:flex flex-wrap md:gap-x-6 md:gap-y-2 lg:flex-nowrap items-center
                        md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                        lg:static lg:translate-x-0 lg:translate-y-0">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                (isActive
                  ? "text-primary font-semibold"
                  : "text-base-content hover:text-primary") +
                " text-base md:text-lg lg:text-base"
              }
            >
              {link.name}
            </NavLink>
          ))}

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

        {/* User Section */}
        <div className="hidden md:flex items-center md:gap-3 lg:gap-4">
          {loading ? (
            <div className="flex items-center gap-2 text-primary">
              <span className="loading loading-spinner loading-md"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {/* Profile Image */}
              <div className="relative group">
                <img
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full cursor-pointer border-2 border-transparent hover:border-primary transition"
                  src={user ? user.photoURL : userIcon}
                  alt="User"
                />
                {user && (
                  <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-14
                                   bg-gradient-to-r from-pink-500 to-rose-400 text-white text-sm
                                   px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition">
                    {user.displayName}
                  </span>
                )}
              </div>

              {/* Login / Logout */}
              {user ? (
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary md:px-6 lg:px-10 md:py-2"
                >
                  LogOut
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  className="px-8 py-2 rounded-lg bg-[#EB1551] hover:bg-[#C71145]
                             text-white font-semibold md:text-sm lg:text-base"
                >
                  Login/Register
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-base-100 p-4 rounded-lg shadow-lg flex flex-col gap-3">
          {/* User Section */}
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-12 rounded-full"
              src={user ? user.photoURL : userIcon}
              alt="User"
            />
            {user && (
              <span className="bg-gradient-to-r from-pink-500 to-rose-400 text-white px-3 py-1 rounded">
                {user.displayName}
              </span>
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
                  className="hover:text-primary"
                >
                  MyCart
                </NavLink>
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-primary"
                >
                  My Profile
                </NavLink>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="mt-2 w-full">
            {user ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setIsOpen(false);
                }}
                className="w-full px-10 py-2 rounded-lg bg-[#EB1551] hover:bg-[#C71145] text-white font-semibold"
              >
                LogOut
              </button>
            ) : (
              <Link
                to="/auth/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex justify-center px-10 py-2 rounded-lg bg-[#EB1551] hover:bg-[#C71145] text-white font-semibold"
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
