// components/Sections/Hero.tsx
"use client";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Play,
  ChevronDown,
  Award,
  Clock,
  Users,
  Zap,
  Star,
  GraduationCap,
  CheckCircle,
  Sparkles,
  Target,
  BookOpen,
  Briefcase,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import EnrollmentFormModal from "./modal/EnrollmentModal";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [videoModal, setVideoModal] = useState(false);
  const [enrollmentModal, setEnrollmentModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#691C33] pt-16 md:pt-20"
    >
      {/* Background Logo Watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("/logo-white.png")`,
            backgroundSize: "70%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Bottom Right Rotating Half Logo */}
      <div className="absolute bottom-0 right-0 w-64 h-32 overflow-hidden pointer-events-none md:w-80 md:h-40 lg:w-96 lg:h-48">
        <div className="absolute -top-0 left-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage: `url("/logo-white.png")`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-20"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-8"
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse" />
              <span
                className={`text-[10px] md:text-sm font-semibold text-white tracking-wider ${gothamOffice.className}`}
              >
                NIGERIA'S PREMIER FRAGRANCE ACADEMY
              </span>
              <Sparkles className="w-2.5 h-2.5 md:w-4 md:h-4 text-white" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight md:leading-tight mb-4 ${italiana.className}`}
            >
              <span className="block">Master The Art</span>
              <span className="block text-white/80">Of Luxury</span>
              <span className="block">Perfumery</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 lg:mb-10 leading-relaxed ${gothamOffice.className} font-light`}
            >
              Transform your passion into a profitable fragrance business with
              our comprehensive 2-Weeks Commercial Perfumery Masterclass.
              Industry-level training, professional tools, and complete business
              blueprint.
            </motion.p>

            {/* Key Features - Responsive Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8"
            >
              {[
                "Industry-Recognized Certificate",
                "Complete Business Blueprint",
                "1-on-1 Mentorship",
                "Lifetime Access to Resources",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-white/95 font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Stats - Fully Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 mb-6 md:mb-8 lg:mb-10"
            >
              {[
                {
                  number: "2 Weeks",
                  label: "Intensive Training",
                  icon: Clock,
                  description: "Masterclass",
                },
                {
                  number: "50+",
                  label: "Successful",
                  icon: Users,
                  description: "Graduates",
                },
                {
                  number: "₦520K",
                  label: "Online Course",
                  icon: Globe,
                  description: "Total Cost",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 hover:bg-white/15 transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-1 md:gap-2 mb-1">
                      <stat.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                      <div
                        className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white ${gothamOffice.className}`}
                      >
                        {stat.number}
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-white/80">
                      {stat.label}
                    </div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs text-white/60 mt-0.5">
                      {stat.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Responsive Stacking */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              {/* Enroll Now Button */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(105, 28, 51, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEnrollmentModal(true)}
                className="bg-white text-[#691C33] px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 hover:bg-white/95 transition-colors"
              >
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>ENROLL NOW</span>
              </motion.button>

              {/* Watch Masterclass Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setVideoModal(true)}
                className="border border-white/30 text-white px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors"
              >
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="text-xs sm:text-sm md:text-base">
                  WATCH MASTERCLASS
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Indicators - Responsive */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 md:mt-8 lg:mt-12 flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 md:gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white fill-white"
                  />
                ))}
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">
                  4.9/5 Rating
                </span>
              </div>

              {/* Divider - Hidden on mobile, visible on md+ */}
              <div className="hidden md:block h-4 lg:h-6 w-px bg-white/30" />

              {/* Award Indicator */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">
                  Award-Winning
                </span>
              </div>

              {/* Divider - Hidden on mobile, visible on lg+ */}
              <div className="hidden lg:block h-6 w-px bg-white/30" />

              {/* Professional Certification */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">
                  Certified Program
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image with Floating Boxes */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative order-first lg:order-last mt-8 lg:mt-0"
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Floating Boxes - Responsive Positioning */}
              <div className="relative z-30">
                {/* In-Class Badge - Responsive */}
                <motion.div
                  initial={{ x: -20, y: -20, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                  }}
                  className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 bg-white p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[200px] z-40"
                >
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#691C33]"
                    />
                    <span className="font-semibold text-[10px] sm:text-xs text-gray-600">
                      IN-CLASS
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#691C33] mb-0.5 md:mb-1">
                    ₦670K
                  </h3>
                  <p className="text-gray-500 text-[9px] sm:text-xs md:text-sm">
                    (₦650K course + ₦20K reg)
                  </p>
                  <p className="text-gray-400 text-[8px] sm:text-[10px] md:text-xs">
                    Physical training in Abuja
                  </p>
                </motion.div>

                {/* Online Live Badge - Responsive */}
                <motion.div
                  initial={{ x: 20, y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(105, 28, 51, 0.2)",
                  }}
                  className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 bg-[#691C33] text-white p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[200px] z-40"
                >
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white"
                    />
                    <span className="font-semibold text-[10px] sm:text-xs text-white/90">
                      ONLINE LIVE
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-0.5 md:mb-1">
                    ₦520K
                  </h3>
                  <p className="text-white/90 text-[9px] sm:text-xs md:text-sm">
                    (₦500K course + ₦20K reg)
                  </p>
                  <p className="text-white/80 text-[8px] sm:text-[10px] md:text-xs">
                    Live sessions from anywhere
                  </p>
                </motion.div>
              </div>

              {/* Main Image with Floating Effect */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-20"
              >
                <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl lg:shadow-3xl">
                  <Image
                    src={"/hero.jpeg"}
                    alt="Luxury Perfumery Masterclass"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#691C33]/40 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Decorative Orbs - Responsive */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 sm:-inset-3 md:-inset-4 lg:-inset-6 border border-white/20 rounded-full z-10"
              />

              {/* Floating Icon Elements - Responsive */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 z-30">
                <motion.div
                  animate={{
                    rotate: 360,
                    y: [0, -8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    y: { duration: 3, repeat: Infinity },
                    scale: { duration: 3, repeat: Infinity },
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white rounded-full shadow-lg sm:shadow-xl flex items-center justify-center border-2 border-[#691C33]/20"
                >
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-[#691C33]" />
                </motion.div>
              </div>

              <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 md:-bottom-4 md:-left-4 z-30">
                <motion.div
                  animate={{
                    rotate: -360,
                    y: [0, 8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    y: { duration: 4, repeat: Infinity },
                    scale: { duration: 4, repeat: Infinity },
                  }}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#691C33] rounded-full shadow-lg sm:shadow-xl flex items-center justify-center border-2 border-white/20"
                >
                  <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-white" />
                </motion.div>
              </div>

              {/* Animated Dots - Responsive */}
              <div className="absolute top-1/4 left-2 sm:left-3 z-10">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/40 rounded-full"
                />
              </div>
              <div className="absolute bottom-1/3 right-4 sm:right-6 z-10">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white/30 rounded-full"
                />
              </div>
              <div className="absolute top-3 right-1/4 z-10">
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                  className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/50 rounded-full"
                />
              </div>
            </div>

            {/* Mobile Price Display - Updated */}
            <div className="lg:hidden mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center flex-1">
                <div className="flex flex-col items-center">
                  <div className="text-base sm:text-lg font-bold text-white">
                    ₦670K
                  </div>
                  <div className="text-xs text-white/80">In-Class Total</div>
                  <div className="text-[10px] text-white/60">
                    (₦650K + ₦20K)
                  </div>
                </div>
              </div>
              <div className="bg-white text-[#691C33] rounded-xl p-3 text-center flex-1">
                <div className="flex flex-col items-center">
                  <div className="text-base sm:text-lg font-bold">₦520K</div>
                  <div className="text-xs">Online Live Total</div>
                  <div className="text-[10px] text-[#691C33]/70">
                    (₦500K + ₦20K)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/70" />
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModal(false)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                ✕
              </button>

              <div className="relative pt-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/LgC_l3K6LXI?autoplay=1"
                  title="Masterclass Preview"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enrollment Form Modal */}
      <EnrollmentFormModal
        isOpen={enrollmentModal}
        onClose={() => setEnrollmentModal(false)}
      />
    </section>
  );
};

export default Hero;
