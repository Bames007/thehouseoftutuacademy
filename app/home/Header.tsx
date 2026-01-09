// components/Layout/Header.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice } from "@/app/utils/constants";
import { Menu, X, Phone, Mail, GraduationCap } from "lucide-react";
import Image from "next/image";
import EnrollmentFormModal from "./modal/EnrollmentModal";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  const [enrollmentModal, setEnrollmentModal] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Navigation items with section IDs
  const navItems = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Founder",
      href: "#founder",
    },
    {
      name: "Curriculum",
      href: "#curriculum",
    },
    {
      name: "Courses",
      href: "#courses",
    },
    {
      name: "Tuition",
      href: "#tuition",
    },
    {
      name: "Enroll",
      href: "#enroll",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);

      // Update active section based on scroll position
      const sections = [
        "home",
        "about",
        "founder",
        "curriculum",
        "courses",
        "tuition",
        "enroll",
        "testimonials",
        "faq",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function
  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Account for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Main Header - Fixed at top */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#691C33]/95 backdrop-blur-xl shadow-xl"
            : "bg-[#691C33]"
        } ${gothamOffice.className}`}
      >
        {/* Pattern Background */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('/pattern.png')`,
            backgroundSize: "300px",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo - LARGER on Mobile */}
            <Link
              href="/"
              className="relative group flex-shrink-0"
              onClick={(e) => handleNavClick("#home", e)}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 md:gap-3"
              >
                <div className="relative w-14 h-14 md:w-12 md:h-12">
                  {" "}
                  {/* Increased from w-10 h-10 */}
                  <Image
                    alt="The House of Tutu Perfumery Academy"
                    src="/logo-white.png"
                    fill
                    className="object-contain drop-shadow-lg"
                    sizes="(max-width: 768px) 56px, 48px" /* Updated sizes */
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className={`px-6 py-3 transition-colors duration-300 font-medium text-sm tracking-wide uppercase relative ${
                      activeSection === item.href.replace("#", "")
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.name}

                    {/* Hover Underline - Classic bottom animation */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX:
                          hoveredNav === item.name ||
                          activeSection === item.href.replace("#", "")
                            ? 1
                            : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Active Indicator Dot */}
                    {activeSection === item.href.replace("#", "") && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Desktop CTA Button - HIDDEN on Mobile */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // onClick={(e) => handleNavClick("#enroll", e)}
                onClick={() => setEnrollmentModal(true)}
                className="hidden lg:flex bg-white text-[#691C33] px-6 py-3 rounded-full font-semibold text-base tracking-wide hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl items-center gap-2"
              >
                <GraduationCap className="w-5 h-5" />
                <span>ENROLL NOW</span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isMobileMenuOpen
                    ? "bg-white/20 text-white"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Bottom Accent Line */}
          <motion.div
            className="h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>
      </motion.header>

      {/* Mobile Menu with Pattern Background */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#691C33] shadow-2xl lg:hidden overflow-hidden"
            >
              {/* Pattern Background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url('/pattern.png')`,
                  backgroundSize: "300px",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat",
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#691C33] via-[#691C33]/95 to-[#691C33]"></div>

              <div className="relative z-10 h-full flex flex-col">
                {/* Menu Header with Larger Logo */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16">
                        {" "}
                        {/* Larger mobile logo */}
                        <Image
                          alt="The House of Tutu"
                          src="/logo-white.png"
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <X className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                  <nav className="space-y-2 mb-8">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                      >
                        <Link
                          href={item.href}
                          onClick={(e) => handleNavClick(item.href, e)}
                          className={`block px-4 py-4 rounded-lg transition-all text-lg font-medium ${
                            activeSection === item.href.replace("#", "")
                              ? "text-white bg-white/20"
                              : "text-white/90 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            {activeSection === item.href.replace("#", "") && (
                              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            )}
                          </div>

                          {/* Mobile active indicator */}
                          {activeSection === item.href.replace("#", "") && (
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile Enrollment CTA Button - INSIDE Menu */}
                  <div className="mb-8 px-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      // onClick={(e) => {
                      //   handleNavClick("#enroll", e);
                      //   setIsMobileMenuOpen(false);
                      // }}
                      onClick={() => setEnrollmentModal(true)}
                      className="w-full bg-white text-[#691C33] py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <GraduationCap className="w-6 h-6" />
                      <span>ENROLL NOW</span>
                    </motion.button>

                    <p className="text-white/60 text-xs text-center mt-3">
                      Limited spots available for next cohort
                    </p>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h3 className="text-white/80 text-sm font-semibold mb-4 px-4">
                      CONTACT US
                    </h3>
                    <div className="space-y-3 px-4">
                      <a
                        href="tel:+2349112644027"
                        className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-white/10">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="text-sm">+234 911 264 4027</span>
                      </a>
                      <a
                        href="mailto:info@thehouseoftutuacademy.com"
                        className="flex items-center gap-3 text-white/90 hover:text-white transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-white/10">
                          <Mail className="w-4 h-4" />
                        </div>
                        <span className="text-sm">
                          info@thehouseoftutuacademy.com
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="p-6 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">100%</div>
                      <div className="text-white/80 text-xs mt-1">
                        Practical
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">24/7</div>
                      <div className="text-white/80 text-xs mt-1">Support</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">₦500K</div>
                      <div className="text-white/80 text-xs mt-1">Starting</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <EnrollmentFormModal
        isOpen={enrollmentModal}
        onClose={() => setEnrollmentModal(false)}
      />

      {/* Spacer div to prevent content from being hidden under fixed header */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "h-24" : "h-28" /* Increased for larger mobile logo */
        }`}
      />
    </>
  );
};

export default Header;
