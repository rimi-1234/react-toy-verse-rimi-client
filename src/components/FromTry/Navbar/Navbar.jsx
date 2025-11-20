import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import userIcon from "../../assets/user.png";
import { Link } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { user, signoutUserFunc, loading } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    console.log("user trying to LogOut");
    signoutUserFunc()
      .then(() => {
        toast.success("Logout Successful!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className="bg-base-100 shadow-md px-4 py-4 md:px-8">
      <div className="flex justify-between items-center">
        <NavLink to="/" className="text-3xl font-bold text-primary">
          ToyVerse
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "text-base-content hover:text-primary"
            }
          >
            Home
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

          {user && (
     
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
          
          )}

        </div>

        {/* User Section (Desktop) */}
        <div className="hidden md:flex items-center gap-4 relative group">
          {loading ? (
            <div className="flex items-center gap-2  bg-gradient-to-r from-[#EB1551] via-[#FF5FA8] to-[#FF8DC7] text-transparent bg-clip-text">
              <span className="loading loading-spinner loading-md text-primary"></span>
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <img
                className="w-12 rounded-full"
                src={user ? user.photoURL : userIcon}
                alt="User"
              />

              {user && (
                <span
                  className="absolute -top-2 -left-7 -translate-x-1/2 
                text-white text-sm px-3 py-1 rounded-lg shadow-lg
                bg-gradient-to-r from-pink-500 to-rose-400
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300 whitespace-nowrap"
                >
                  {user.displayName}
                </span>
              )}

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
                  Login
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
              <div className="w-full flex-col flex items-center gap-2 justify-center">
                <div className="my-2">
                  <img
                    className="w-12 rounded-full"
                    src={user ? user.photoURL : userIcon}
                    alt="User"
                  />
                </div>
                {user && (
                  <div className="w-full mb-1">
                    <span className="bg-gradient-to-r from-pink-500 to-rose-400 text-white p-2 rounded">
                      {user.displayName}
                    </span>
                  </div>
                )}
              </div>

              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-base-content hover:text-primary"
                }
              >
                Home
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

              <div className="flex items-center gap-2 mt-2">
                {user ? (
                  <button
                    onClick={handleLogOut}
                    className="px-10 py-2 w-full rounded-lg bg-[#EB1551] hover:bg-[#C71145] text-white font-semibold transition-colors duration-200"
                  >
                    LogOut
                  </button>
                ) : (
                  <Link
                    to="/auth/login"
                    className="px-10 py-2 w-full rounded-lg bg-[#EB1551] hover:bg-[#C71145] text-white font-semibold transition-colors duration-200"
                  >
                    Login
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
