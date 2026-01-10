import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, User, LogOut, Home, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = ({ showAuth = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Dynamic navbar behavior - hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    
    // Add blur/translucency after scrolling
    if (latest > 20) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }

    // Hide/show logic
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    lastScrollY.current = latest;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ 
        y: isVisible ? 0 : -120,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        hasScrolled 
          ? "w-[calc(100%-3rem)] max-w-5xl" 
          : "w-[calc(100%-3rem)] max-w-6xl"
      }`}
    >
      <div 
        className={`
          relative overflow-hidden rounded-2xl border transition-all duration-500
          ${hasScrolled 
            ? "bg-white/80 backdrop-blur-2xl border-slate-200/60 shadow-lg shadow-slate-900/5" 
            : "bg-white/95 backdrop-blur-sm border-slate-200/40 shadow-sm"
          }
        `}
      >
        <div className="px-6 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate(isAuthenticated ? "/home" : "/")}
          >
            <motion.div 
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-slate-900 rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-slate-900 text-white w-9 h-9 rounded-lg flex items-center justify-center">
                <span className="font-bold text-base">R</span>
              </div>
            </motion.div>
            <span className="font-semibold text-lg tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
              ReadmeAI
            </span>
          </motion.div>

          {/* Auth Section */}
          {showAuth && isAuthenticated ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="hidden md:flex items-center gap-1">
                <motion.button
                  whileHover={{ backgroundColor: "rgb(248 250 252)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/home")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    location.pathname === "/home" 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Home size={15} strokeWidth={2} />
                  <span>Repositories</span>
                </motion.button>
                <motion.button
                  whileHover={{ backgroundColor: "rgb(248 250 252)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/profile")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    location.pathname === "/profile" 
                      ? "bg-slate-100 text-slate-900" 
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <FileText size={15} strokeWidth={2} />
                  <span>Active Repos</span>
                </motion.button>
              </div>

              <div className="relative z-50" ref={dropdownRef}>
                {user?.avatarUrl ? (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-9 h-9 rounded-full overflow-hidden border-2 border-slate-200 hover:border-slate-300 transition-all relative z-50"
                  >
                    <img
                      src={user.avatarUrl}
                      alt={user.githubUsername || "User"}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="bg-slate-900 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-800 transition-all relative z-50"
                  >
                    <User size={16} strokeWidth={2} />
                  </motion.button>
                )}

                <AnimatePresence>
                  {showDropdown && (
                    <>
                      {/* Backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDropdown(false)}
                      />
                      
                      {/* Dropdown */}
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            {user?.avatarUrl ? (
                              <img
                                src={user.avatarUrl}
                                alt={user.githubUsername || "User"}
                                className="w-11 h-11 rounded-full border-2 border-slate-200"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-full bg-slate-900 text-white flex items-center justify-center">
                                <User size={20} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-900 truncate">
                                {user?.githubUsername || "User"}
                              </p>
                              <p className="text-xs text-slate-500">
                                GitHub Account
                              </p>
                            </div>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ backgroundColor: "rgb(248 250 252)" }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut size={15} strokeWidth={2} />
                          Logout
                        </motion.button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-1"
            >
              {/* Navigation Links */}
              <div className="flex items-center gap-1 mr-2">
                {[
                  { label: "How it works", id: "how-it-works" },
                  { label: "Features", id: "features" },
                  { label: "Security", id: "security" }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ backgroundColor: "rgb(248 250 252)" }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-all relative group"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/login")}
                className="relative overflow-hidden bg-slate-900 text-white pl-4 pr-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <Github size={15} strokeWidth={2} className="relative z-10" />
                <span className="relative z-10">Connect GitHub</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
