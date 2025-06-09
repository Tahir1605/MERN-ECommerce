import { useState, useEffect, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems
  } = useContext(ShopContext);

  const navigationItems = [
    { path: "/", label: "HOME" },
    { path: "/collection", label: "COLLECTION" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken('');
    setCartItems({});
  }

  const protectedNavClick = (e, path) => {
    if (!token) {
      e.preventDefault();
      toast.error("Please login to access this page");
    } else {
      closeMobileMenu();
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow border-b border-gray-100"
          : "bg-white shadow-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to='/'>
              <img
                src={assets.logo}
                alt="Logo"
                className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10">
              {navigationItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={token ? path : "#"}
                  onClick={(e) => protectedNavClick(e, path)}
                  className={({ isActive }) =>
                    `relative group text-sm font-medium ${isActive ? "text-black" : "text-gray-600"
                    } hover:text-black transition-all`
                  }
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                </NavLink>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <button
                onClick={() => {
                  if (token) {
                    setShowSearch(true);
                  } else {
                    toast.error("Please login to use search");
                  }
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <Search className="w-5 h-5 text-gray-600 hover:text-black" />
              </button>

              {/* Cart */}
              <button
                onClick={() => {
                  if (token) {
                    navigate("/cart");
                  } else {
                    toast.error("Please login to view your cart");
                  }
                }}
                className="p-2 rounded-full relative hover:bg-gray-100 transition"
              >
                <ShoppingBag className="w-5 h-5 text-gray-600 hover:text-black" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              </button>

              {/* Profile */}
              {token ? (
                <div className="relative group">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <User className="w-5 h-5 text-gray-600 hover:text-black" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-md z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <p onClick={() => navigate('/profile')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </p>
                    <p onClick={() => navigate('/orders')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </p>
                    <hr />
                    <p onClick={logout} className="cursor-pointer block px-4 py-2 text-sm text-red-500 hover:bg-gray-100">
                      Logout
                    </p>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <User className="w-5 h-5 text-gray-600 hover:text-black" />
                  </button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <div className="flex md:hidden">
                <button onClick={toggleMobileMenu} className="p-2 hover:bg-gray-100 rounded-full">
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={closeMobileMenu}
        ></div>
        <div
          className={`mobile-menu-container fixed top-0 right-0 w-80 max-w-sm bg-white h-full shadow-xl z-50 p-6 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
            <button onClick={closeMobileMenu}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 space-y-4">
            {navigationItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={token ? path : "#"}
                onClick={(e) => protectedNavClick(e, path)}
                className={({ isActive }) =>
                  `block text-base font-medium ${isActive
                    ? "text-black border-l-4 pl-4 border-black"
                    : "text-gray-600 hover:text-black"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}

export default Navbar;
