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
  GraduationCap,
  CheckCircle,
  Target,
  BookOpen,
  ShieldCheck,
  Tag,
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

  // ─── Pricing (Registration is FREE) ──────────────────────
  const REG_FEE = 0;
  const ORIGINAL_COURSE_FEES = {
    "offline-6weeks": 750000, // ₦750k → 20% off → ₦600k
    "offline-3months": 800000, // ₦800k flat
    "intensive-1day": 120000, // ₦120k flat
  };
  const DISCOUNT_RATE = 0.2; // applies only to 6-week offline

  const getDiscountedCourseFee = (type: keyof typeof ORIGINAL_COURSE_FEES) => {
    if (type === "intensive-1day") return ORIGINAL_COURSE_FEES[type];
    if (type === "offline-3months") return ORIGINAL_COURSE_FEES[type];
    return ORIGINAL_COURSE_FEES[type] * (1 - DISCOUNT_RATE);
  };

  const getTotalWithReg = (type: keyof typeof ORIGINAL_COURSE_FEES) =>
    getDiscountedCourseFee(type) + REG_FEE;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);

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
              className="inline-flex flex-wrap items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-8"
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white animate-pulse" />
              <span
                className={`text-[10px] md:text-sm font-semibold text-white tracking-wider ${gothamOffice.className}`}
              >
                NIGERIA'S PREMIER FRAGRANCE ACADEMY
              </span>
              <div className="bg-white text-[#691C33] text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                20% OFF
              </div>
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
              our comprehensive 6‑Weeks or 3‑Months Commercial Perfumery
              Masterclass — or fast‑track with our intensive 1‑Day Class.
              Industry‑level training, professional tools, and complete business
              blueprint.{" "}
              <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 text-white font-semibold px-2 py-0.5 rounded-md mt-1">
                20% discount for early birds students!
              </span>
            </motion.p>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 md:mb-8"
            >
              {[
                "Industry‑Recognized Certificate",
                "Complete Business Blueprint",
                "1‑on‑1 Mentorship",
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

            {/* Stats — FIXED KEYS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 mb-6 md:mb-8 lg:mb-10"
            >
              {[
                {
                  number: "6 Weeks",
                  label: "Masterclass",
                  icon: Clock,
                  description: "Popular",
                },
                {
                  number: "3 Months",
                  label: "Masterclass",
                  icon: BookOpen,
                  description: "Pro",
                },
                {
                  number: "1 Day",
                  label: "Intensive",
                  icon: Users,
                  description: "Quick start",
                },
              ].map((stat, index) => (
                <motion.div
                  key={`${stat.number}-${index}`}
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

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEnrollmentModal(true)}
                className="bg-white text-[#691C33] px-4 py-2.5 sm:px-5 sm:py-3 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 hover:bg-white/95 transition-colors"
              >
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>ENROLL NOW</span>
              </motion.button>

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

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 md:mt-8 lg:mt-12 flex flex-wrap items-center gap-3 md:gap-4 lg:gap-6"
            >
              <div className="flex items-center gap-1.5 md:gap-2">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">
                  Award-Winning
                </span>
              </div>

              <div className="hidden md:block h-4 lg:h-6 w-px bg-white/30" />

              <div className="flex items-center gap-1.5 md:gap-2">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">
                  50+ Graduates
                </span>
              </div>

              <div className="hidden lg:block h-6 w-px bg-white/30" />

              <div className="flex items-center gap-1.5 md:gap-2">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">
                  Certified Program
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image with Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative order-first lg:order-last mt-8 lg:mt-0"
          >
            <div className="relative">
              {/* Floating Cards */}
              <div className="relative z-30">
                {/* 6 Weeks — TOP LEFT */}
                <motion.div
                  initial={{ x: -20, y: -20, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  }}
                  className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 md:-top-6 md:-left-6 bg-white p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[200px] z-40"
                >
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#691C33]"
                    />
                    <span className="font-semibold text-[10px] sm:text-xs text-[#691C33]">
                      6 WEEKS
                    </span>
                    <Tag className="w-2.5 h-2.5 text-[#691C33] ml-0.5" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#691C33] mb-0.5 md:mb-1">
                    {formatCurrency(getTotalWithReg("offline-6weeks"))}
                  </h3>
                  <p className="text-[#691C33]/60 text-[9px] sm:text-xs md:text-sm line-through">
                    ₦{ORIGINAL_COURSE_FEES["offline-6weeks"].toLocaleString()}
                  </p>
                  <div className="text-[#691C33] text-[8px] sm:text-[10px] md:text-xs font-bold mt-1">
                    20% OFF applied
                  </div>
                  <p className="text-[#691C33]/50 text-[8px] sm:text-[10px] md:text-xs">
                    In-person · Abuja
                  </p>
                </motion.div>

                {/* 3 Months — TOP RIGHT */}
                <motion.div
                  initial={{ x: 20, y: -20, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  }}
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 bg-[#691C33] text-white p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[200px] z-40"
                >
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white"
                    />
                    <span className="font-semibold text-[10px] sm:text-xs text-white/95">
                      3 MONTHS
                    </span>
                    <Tag className="w-2.5 h-2.5 text-white/90 ml-0.5" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-0.5 md:mb-1">
                    {formatCurrency(getTotalWithReg("offline-3months"))}
                  </h3>
                  <p className="text-white/90 text-[9px] sm:text-xs md:text-sm">
                    Full comprehensive program
                  </p>
                  <div className="text-white text-[8px] sm:text-[10px] md:text-xs font-bold mt-1">
                    Deep dive
                  </div>
                  <p className="text-white/70 text-[8px] sm:text-[10px] md:text-xs">
                    In-person · Abuja
                  </p>
                </motion.div>

                {/* 1 Day Intensive — BOTTOM LEFT */}
                <motion.div
                  initial={{ x: -20, y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{
                    y: -5,
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  }}
                  className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-6 md:-left-6 bg-white p-2 sm:p-3 md:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[200px] z-40"
                >
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                      className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#691C33]"
                    />
                    <span className="font-semibold text-[10px] sm:text-xs text-[#691C33]">
                      1 DAY INTENSIVE
                    </span>
                    <Tag className="w-2.5 h-2.5 text-[#691C33] ml-0.5" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-[#691C33] mb-0.5 md:mb-1">
                    {formatCurrency(getTotalWithReg("intensive-1day"))}
                  </h3>
                  <p className="text-[#691C33]/70 text-[9px] sm:text-xs md:text-sm">
                    Workshop
                  </p>
                  <div className="text-[#691C33] text-[8px] sm:text-[10px] md:text-xs font-bold mt-1">
                    Come Explore
                  </div>
                  <p className="text-[#691C33]/50 text-[8px] sm:text-[10px] md:text-xs">
                    In-person · Abuja
                  </p>
                </motion.div>
              </div>

              {/* Main Image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-20"
              >
                <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl">
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

              {/* Decorative Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 sm:-inset-3 md:-inset-4 lg:-inset-6 border border-white/20 rounded-full z-10"
              />

              {/* Floating Icon — Middle Right */}
              <div className="absolute top-1/2 -right-2 sm:-right-3 md:-right-4 z-30 hidden sm:block">
                <motion.div
                  animate={{ rotate: -360, y: [0, 6, 0], scale: [1, 1.08, 1] }}
                  transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                    y: { duration: 3.5, repeat: Infinity },
                    scale: { duration: 3.5, repeat: Infinity },
                  }}
                  className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg sm:shadow-xl flex items-center justify-center border-2 border-[#691C33]/20"
                >
                  <Target className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#691C33]" />
                </motion.div>
              </div>

              {/* Animated Dots */}
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

            {/* Mobile Price Cards */}
            <div className="lg:hidden mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 6 Weeks */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-[10px] font-bold text-white/70 mb-1 tracking-wider">
                    6 WEEKS
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-base sm:text-lg font-bold text-white">
                      {formatCurrency(getTotalWithReg("offline-6weeks"))}
                    </div>
                  </div>
                  <div className="text-[10px] text-white/60 line-through">
                    ₦{ORIGINAL_COURSE_FEES["offline-6weeks"].toLocaleString()}
                  </div>
                  <div className="text-white text-[9px] font-bold mt-0.5">
                    20% OFF
                  </div>
                </div>
              </div>

              {/* 3 Months */}
              <div className="bg-[#691C33] border border-white/20 rounded-xl p-3 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-[10px] font-bold text-white/70 mb-1 tracking-wider">
                    3 MONTHS
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-base sm:text-lg font-bold text-white">
                      {formatCurrency(getTotalWithReg("offline-3months"))}
                    </div>
                  </div>
                  <div className="text-[10px] text-white/60">Full program</div>
                  <div className="text-white text-[9px] font-bold mt-0.5">
                    Pro
                  </div>
                </div>
              </div>

              {/* 1 Day Intensive */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-[10px] font-bold text-white/70 mb-1 tracking-wider">
                    1 DAY
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-base sm:text-lg font-bold text-white">
                      {formatCurrency(getTotalWithReg("intensive-1day"))}
                    </div>
                  </div>
                  <div className="text-[10px] text-white/60">
                    Fast‑track class
                  </div>
                  <div className="text-white text-[9px] font-bold mt-0.5">
                    Quick start
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
                  src="https://www.youtube.com/embed/LgC_l3K6X?autoplay=1"
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
