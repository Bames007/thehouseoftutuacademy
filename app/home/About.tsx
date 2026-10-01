// components/Sections/AboutAcademy.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Target,
  Globe,
  Award,
  Shield,
  BookOpen,
  CheckCircle,
  Calendar,
  Clock,
  Users as UsersIcon,
  X,
  Bell,
  Mail,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

type ProgramId = "art6" | "art12" | "commercial" | "oneday";

const AboutAcademy = () => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ProgramId>("art6");
  const [isStudent, setIsStudent] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedReminders, setSelectedReminders] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 3, 1)); // April 2026

  // ─── Core Values ─────────────────────────────────────────
  const coreValues = [
    {
      icon: Target,
      label: "Business-Focused",
      description: "Real-world entrepreneurship training",
    },
    {
      icon: Globe,
      label: "Global Standards",
      description: "International quality benchmarks",
    },
    {
      icon: Award,
      label: "Certified Training",
      description: "Industry-recognized certification",
    },
    {
      icon: Shield,
      label: "Lifetime Support",
      description: "Ongoing mentorship & resources",
    },
  ];

  // ─── Program Catalogue ───────────────────────────────────
  const programs: Record<
    ProgramId,
    {
      label: string;
      short: string;
      subtitle: string;
      start: string;
      end: string;
      days: string;
      time: string;
      dayRange: number[]; // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
      color: string;
    }
  > = {
    art6: {
      label: "Art of Perfumery — 6 Weeks",
      short: "Art · 6 Weeks",
      subtitle: "Beginner Perfumery Program",
      start: "Tue, April 7, 2026",
      end: "Thu, May 14, 2026",
      days: "Tue · Wed · Thu",
      time: "10:00 AM – 1:00 PM",
      dayRange: [2, 3, 4],
      color: "#691C33",
    },
    art12: {
      label: "Art of Perfumery — 12 Weeks",
      short: "Art · 12 Weeks",
      subtitle: "Intermediate & Advanced Program",
      start: "Tue, April 7, 2026",
      end: "Thu, June 25, 2026",
      days: "Tue · Wed · Thu",
      time: "10:00 AM – 1:00 PM",
      dayRange: [2, 3, 4],
      color: "#691C33",
    },
    commercial: {
      label: "Commercial Perfumery — 2 Weeks",
      short: "Commercial · 2 Weeks",
      subtitle: "Business Masterclass",
      start: "Tue, April 7, 2026",
      end: "Thu, April 16, 2026",
      days: "Tue · Wed · Thu",
      time: "10:00 AM – 1:00 PM",
      dayRange: [2, 3, 4],
      color: "#691C33",
    },
    oneday: {
      label: "1-Day Intensive Workshop",
      short: "1-Day Workshop",
      subtitle: "Fast-track Introductory Class",
      start: "Fri, April 10, 2026",
      end: "Sun, April 26, 2026",
      days: "Fri · Sat · Sun",
      time: "12–2 PM or 4–6 PM",
      dayRange: [5, 6, 0],
      color: "#691C33",
    },
  };

  // ─── Weekly Schedule (Tue–Thu) ───────────────────────────
  const artWeeklyPlan = [
    {
      week: "Week 1",
      theme: "Discovering Your Nose",
      sessions: [
        { day: "Tuesday", topic: "What perfumery is — art meets science" },
        { day: "Wednesday", topic: "How the sense of smell works" },
        { day: "Thursday", topic: "First smelling session on blotters" },
      ],
    },
    {
      week: "Week 2",
      theme: "Story of Scent & Fragrance Families",
      sessions: [
        { day: "Tuesday", topic: "History — Egypt to the spice trade" },
        { day: "Wednesday", topic: "Africa's scent traditions" },
        { day: "Thursday", topic: "The 8 fragrance families" },
      ],
    },
    {
      week: "Week 3",
      theme: "Raw Materials & Extraction",
      sessions: [
        { day: "Tuesday", topic: "Natural vs synthetic materials" },
        { day: "Wednesday", topic: "The 5 extraction methods" },
        { day: "Thursday", topic: "Adulteration & safe storage" },
      ],
    },
    {
      week: "Week 4",
      theme: "The Art of Blending",
      sessions: [
        { day: "Tuesday", topic: "What an accord is + Rule of Three" },
        { day: "Wednesday", topic: "The 5 classic accord families" },
        { day: "Thursday", topic: "Build your first 3-note accord" },
      ],
    },
    {
      week: "Week 5",
      theme: "Formulation, Measuring & Safety",
      sessions: [
        { day: "Tuesday", topic: "The percentage formula" },
        { day: "Wednesday", topic: "Concentration ranges explained" },
        { day: "Thursday", topic: "Patch testing & IFRA basics" },
      ],
    },
    {
      week: "Week 6",
      theme: "Bringing It All Together",
      sessions: [
        { day: "Tuesday", topic: "Maceration explained" },
        { day: "Wednesday", topic: "Pricing: Cost × Markup" },
        { day: "Thursday", topic: "Mini Showcase — present your scent" },
      ],
    },
  ];

  const commercialWeeklyPlan = [
    {
      week: "Week 1",
      theme: "Building Your Perfume Brand",
      sessions: [
        { day: "Tuesday", topic: "The 4 business models" },
        { day: "Wednesday", topic: "Positioning, naming & identity" },
        { day: "Thursday", topic: "Pricing: Cost × Markup" },
      ],
    },
    {
      week: "Week 2",
      theme: "Marketing, Sales & Launch",
      sessions: [
        { day: "Tuesday", topic: "Where to sell — online & retail" },
        { day: "Wednesday", topic: "Digital marketing for fragrance" },
        { day: "Thursday", topic: "Launch your first commercial batch" },
      ],
    },
  ];

  const oneDaySchedule = [
    { day: "Friday", slots: ["12:00 PM – 2:00 PM", "4:00 PM – 6:00 PM"] },
    { day: "Saturday", slots: ["12:00 PM – 2:00 PM", "4:00 PM – 6:00 PM"] },
    { day: "Sunday", slots: ["12:00 PM – 2:00 PM", "4:00 PM – 6:00 PM"] },
  ];

  // ─── Calendar Generation ─────────────────────────────────
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const isClassDay = (date: Date | null, program: ProgramId) => {
    if (!date) return false;
    const month = currentMonth.getMonth();
    // Only mark class days within the program window
    if (program === "art6") {
      // Apr 7 – May 14, 2026 (Tue-Thu)
      return (
        date.getDay() >= 2 &&
        date.getDay() <= 4 &&
        ((date.getMonth() === 3 && date.getDate() >= 7) ||
          (date.getMonth() === 4 && date.getDate() <= 14))
      );
    }
    if (program === "art12") {
      // Apr 7 – Jun 25, 2026 (Tue-Thu)
      return (
        date.getDay() >= 2 &&
        date.getDay() <= 4 &&
        ((date.getMonth() === 3 && date.getDate() >= 7) ||
          date.getMonth() === 4 ||
          (date.getMonth() === 5 && date.getDate() <= 25))
      );
    }
    if (program === "commercial") {
      // Apr 7 – Apr 16, 2026 (Tue-Thu)
      return (
        date.getDay() >= 2 &&
        date.getDay() <= 4 &&
        date.getMonth() === 3 &&
        date.getDate() >= 7 &&
        date.getDate() <= 16
      );
    }
    if (program === "oneday") {
      // Fri, Sat, Sun April 10–26, 2026
      return (
        (date.getDay() === 5 || date.getDay() === 6 || date.getDay() === 0) &&
        date.getMonth() === 3 &&
        date.getDate() >= 10 &&
        date.getDate() <= 26
      );
    }
    return false;
  };

  const getDayName = (date: Date | null) => {
    if (!date) return "";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const formatMonthYear = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const nextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  const prevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );

  // ─── Reminder Logic ──────────────────────────────────────
  const reminderOptions = [
    { id: "week_before", label: "1 Week Before" },
    { id: "3_days_before", label: "3 Days Before" },
    { id: "day_before", label: "Day Before" },
    { id: "morning_of", label: "Morning of Class" },
  ];

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const toggleReminder = (id: string) => {
    setSelectedReminders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSetReminder = () => {
    if (!email) return alert("Please enter your email address");
    if (!validateEmail(email)) return alert("Please enter a valid email");
    if (selectedReminders.length === 0)
      return alert("Please select at least one reminder");

    alert(
      `Reminders set successfully! We'll email ${email} for ${programs[selectedProgram].label}.`,
    );
    setEmail("");
    setIsStudent(false);
    setSelectedReminders([]);
    setShowCalendarModal(false);
  };

  // ─── Body Scroll Lock ────────────────────────────────────
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showCalendarModal) setShowCalendarModal(false);
    };
    if (showCalendarModal) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "auto";
    };
  }, [showCalendarModal]);

  const current = programs[selectedProgram];

  return (
    <>
      {/* ─── About Section ─────────────────────────────────── */}
      <section
        id="about"
        className="relative overflow-hidden py-14 md:py-24"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/pattern.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.05,
            zIndex: 0,
          }}
        />

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-[#691C33] rounded-full" />
                <span
                  className={`text-[#691C33] font-semibold tracking-wider text-xs md:text-sm ${gothamOffice.className}`}
                >
                  ABOUT THE ACADEMY
                </span>
              </div>

              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-black text-[#691C33] leading-tight ${italiana.className}`}
              >
                Nigeria's Premier Fragrance Business School
              </h2>

              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-[#691C33]/10">
                  <p
                    className={`text-[#691C33] text-base md:text-lg ${gothamOffice.className} leading-relaxed`}
                  >
                    The House of Tutu Perfumery Academy is Nigeria's first
                    specialised fragrance school dedicated to teaching both the
                    commercial and artistic sides of perfumery.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 md:p-6 border-2 border-[#691C33]/10">
                  <p
                    className={`text-[#691C33] text-base md:text-lg ${gothamOffice.className} leading-relaxed`}
                  >
                    We blend creative scent design with real-world business
                    training, equipping students to become confident perfumers
                    and successful fragrance entrepreneurs.
                  </p>
                </div>
              </div>

              {/* Core Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {coreValues.map((value) => (
                  <div
                    key={value.label}
                    className="bg-white rounded-2xl p-4 border-2 border-[#691C33]/10 hover:border-[#691C33]/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#691C33] flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#691C33] text-sm md:text-base leading-tight">
                          {value.label}
                        </h3>
                        <p className="text-[#691C33]/80 text-xs md:text-sm mt-0.5 leading-snug">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats — Desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-3">
                <div className="bg-[#691C33] text-white rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold mb-1">3</div>
                  <div className="text-white/85 text-xs">Tracks Available</div>
                </div>
                <div className="bg-white border-2 border-[#691C33]/10 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#691C33] mb-1">
                    50+
                  </div>
                  <div className="text-[#691C33]/80 text-xs">
                    Successful Graduates
                  </div>
                </div>
                <div className="bg-[#691C33] text-white rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold mb-1">100%</div>
                  <div className="text-white/85 text-xs">
                    Practical Training
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Learning Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-[#691C33]/10 shadow-xl">
                <h3
                  className={`text-2xl md:text-3xl font-bold text-[#691C33] mb-6 md:mb-8 ${gothamOffice.className}`}
                >
                  Our Learning Journey
                </h3>

                <div className="space-y-4 md:space-y-5">
                  {[
                    {
                      step: "01",
                      title: "Learn Fundamentals",
                      description:
                        "Master fragrance theory & scent composition",
                      icon: BookOpen,
                    },
                    {
                      step: "02",
                      title: "Create Products",
                      description: "Develop unique fragrance formulas",
                      icon: Target,
                    },
                    {
                      step: "03",
                      title: "Build Brand",
                      description: "Create luxury brand identity & packaging",
                      icon: Award,
                    },
                    {
                      step: "04",
                      title: "Launch Business",
                      description: "Execute market strategy & sales",
                      icon: Briefcase,
                    },
                  ].map((step) => (
                    <div
                      key={step.step}
                      className="flex items-start gap-4 p-3 md:p-4 rounded-2xl border-2 border-[#691C33]/8 hover:border-[#691C33]/25 hover:bg-[#691C33]/5 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#691C33] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-base font-bold">
                          {step.step}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <step.icon className="w-4 h-4 text-[#691C33]" />
                          <h4 className="font-bold text-[#691C33] text-base md:text-lg">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-[#691C33] text-sm md:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Logo */}
                <div className="mt-8 flex justify-center">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-[#691C33]/15 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#691C33] flex items-center justify-center">
                      <div className="relative w-14 h-14 md:w-16 md:h-16">
                        <Image
                          src="/logo-white.png"
                          alt="The House of Tutu Logo"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 56px, 64px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats — Mobile */}
              <div className="lg:hidden mt-5 grid grid-cols-3 gap-3">
                <div className="bg-[#691C33] text-white rounded-2xl p-3 text-center">
                  <div className="text-lg font-bold mb-0.5">3</div>
                  <div className="text-white/85 text-[10px] leading-tight">
                    Tracks
                  </div>
                </div>
                <div className="bg-white border-2 border-[#691C33]/10 rounded-2xl p-3 text-center">
                  <div className="text-lg font-bold text-[#691C33] mb-0.5">
                    50+
                  </div>
                  <div className="text-[#691C33]/80 text-[10px] leading-tight">
                    Graduates
                  </div>
                </div>
                <div className="bg-[#691C33] text-white rounded-2xl p-3 text-center">
                  <div className="text-lg font-bold mb-0.5">100%</div>
                  <div className="text-white/85 text-[10px] leading-tight">
                    Practical
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Bottom CTA ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-20"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#691C33] p-6 md:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url('/pattern.png')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity: 0.08,
                  filter: "brightness(0) invert(1)",
                  zIndex: 0,
                }}
              />

              <div className="relative z-10">
                <h3
                  className={`text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4 ${italiana.className}`}
                >
                  Ready to Start Your Fragrance Journey?
                </h3>

                <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-2xl mb-8 leading-relaxed">
                  Join Nigeria's premier fragrance business school and transform
                  your passion into a profitable career.{" "}
                  <strong className="font-bold text-white">
                    Registration is free
                  </strong>{" "}
                  — pay only your course fee.
                </p>

                {/* Program Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-5">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-white/75 mb-2">
                      Popular
                    </div>
                    <div className="text-white font-bold text-base md:text-lg mb-1">
                      Art of Perfumery
                    </div>
                    <div className="text-white/80 text-xs mb-3">
                      6 Weeks · Tue–Thu
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                      ₦600,000
                    </div>
                    <div className="text-white/60 text-xs line-through mb-2">
                      ₦750,000
                    </div>
                    <div className="inline-block bg-white text-[#691C33] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      20% OFF
                    </div>
                  </div>

                  <div className="bg-white text-[#691C33] rounded-2xl p-4 md:p-5">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-[#691C33]/70 mb-2">
                      Pro
                    </div>
                    <div className="font-bold text-base md:text-lg mb-1">
                      Art of Perfumery
                    </div>
                    <div className="text-[#691C33]/70 text-xs mb-3">
                      12 Weeks · Tue–Thu
                    </div>
                    <div className="text-2xl md:text-3xl font-bold mb-0.5">
                      ₦800,000
                    </div>
                    <div className="text-[#691C33]/60 text-xs mb-2">
                      Comprehensive program
                    </div>
                    <div className="inline-block bg-[#691C33] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      DEEP DIVE
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-5">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-white/75 mb-2">
                      Quick Start
                    </div>
                    <div className="text-white font-bold text-base md:text-lg mb-1">
                      1-Day Workshop
                    </div>
                    <div className="text-white/80 text-xs mb-3">
                      Fri–Sun · 2-Hour Slot
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                      ₦120,000
                    </div>
                    <div className="text-white/60 text-xs mb-2">
                      Fast-track intro
                    </div>
                    <div className="inline-block bg-white text-[#691C33] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      FAST
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => (window.location.href = "/enrollment")}
                    className="w-full sm:w-auto bg-white text-[#691C33] px-6 py-3.5 md:py-4 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-white/95 transition-colors"
                  >
                    <span>ENROLL NOW</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>

                  <button
                    onClick={() => setShowCalendarModal(true)}
                    className="w-full sm:w-auto border-2 border-white/40 text-white px-6 py-3.5 md:py-4 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                    <span>VIEW SCHEDULE</span>
                  </button>
                </div>

                {/* Bottom Stats */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-3 gap-3 md:gap-6">
                    <div className="text-center">
                      <div className="text-lg md:text-3xl font-bold text-white">
                        100%
                      </div>
                      <div className="text-white/75 text-xs md:text-sm mt-1">
                        Practical
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-3xl font-bold text-white">
                        FREE
                      </div>
                      <div className="text-white/75 text-xs md:text-sm mt-1">
                        Registration
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg md:text-3xl font-bold text-white">
                        24/7
                      </div>
                      <div className="text-white/75 text-xs md:text-sm mt-1">
                        Support
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Calendar Modal ──────────────────────────────── */}
      <AnimatePresence>
        {showCalendarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setShowCalendarModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden h-[100dvh] sm:h-auto sm:max-h-[92vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-[#691C33] px-5 py-4 md:px-8 md:py-6 flex-shrink-0">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/80">
                        Class Schedule
                      </span>
                    </div>
                    <h2
                      className={`text-xl md:text-3xl font-black text-white leading-tight ${italiana.className}`}
                    >
                      {current.subtitle}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-white/90 text-xs md:text-sm mt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-medium">{current.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UsersIcon className="w-3.5 h-3.5" />
                        <span className="font-medium">{current.days}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCalendarModal(false)}
                    className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/15 border border-white/25 flex items-center justify-center text-white hover:bg-white/25 transition-colors flex-shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Program selector */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(programs) as ProgramId[]).map((key) => {
                    const p = programs[key];
                    const isActive = selectedProgram === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedProgram(key)}
                        className={`px-3 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all border-2 ${
                          isActive
                            ? "bg-white text-[#691C33] border-white"
                            : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                        }`}
                      >
                        <span className="block leading-tight">{p.short}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Calendar */}
                  <div className="space-y-5">
                    <div className="bg-white border-2 border-[#691C33]/10 rounded-2xl p-4 md:p-5">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg md:text-xl font-bold text-[#691C33]">
                          {formatMonthYear(currentMonth)}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={prevMonth}
                            className="w-9 h-9 rounded-lg bg-[#691C33]/10 flex items-center justify-center text-[#691C33] hover:bg-[#691C33]/20 transition-colors"
                            aria-label="Previous month"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={nextMonth}
                            className="w-9 h-9 rounded-lg bg-[#691C33]/10 flex items-center justify-center text-[#691C33] hover:bg-[#691C33]/20 transition-colors"
                            aria-label="Next month"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Day labels */}
                      <div className="grid grid-cols-7 gap-1 md:gap-1.5 mb-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                          (day) => (
                            <div
                              key={day}
                              className="text-center text-[10px] md:text-xs font-bold text-[#691C33]/60 py-1"
                            >
                              {day.slice(0, 1)}
                            </div>
                          ),
                        )}
                      </div>

                      {/* Calendar grid */}
                      <div className="grid grid-cols-7 gap-1 md:gap-1.5">
                        {generateCalendar().map((date, index) => {
                          const isClass =
                            date && isClassDay(date, selectedProgram);
                          const isToday =
                            date &&
                            date.getDate() === new Date().getDate() &&
                            date.getMonth() === new Date().getMonth() &&
                            date.getFullYear() === new Date().getFullYear();

                          return (
                            <div
                              key={index}
                              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs md:text-sm transition-all ${
                                date
                                  ? isClass
                                    ? "bg-[#691C33] text-white font-bold"
                                    : isToday
                                      ? "bg-[#691C33]/10 text-[#691C33] border-2 border-[#691C33]"
                                      : "text-[#691C33] hover:bg-[#691C33]/5"
                                  : ""
                              }`}
                            >
                              {date && (
                                <>
                                  <div className="text-[9px] opacity-70 hidden md:block">
                                    {getDayName(date)}
                                  </div>
                                  <div className="text-sm md:text-base font-bold">
                                    {date.getDate()}
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Legend */}
                      <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-[#691C33]"></div>
                          <span className="text-xs text-[#691C33] font-medium">
                            Class Day
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-[#691C33]/10 border border-[#691C33]"></div>
                          <span className="text-xs text-[#691C33] font-medium">
                            Today
                          </span>
                        </div>
                      </div>

                      {/* Program window */}
                      <div className="mt-4 pt-4 border-t border-[#691C33]/10 text-center text-xs md:text-sm text-[#691C33]">
                        <span className="font-semibold">Runs:</span>{" "}
                        {current.start} — {current.end}
                      </div>
                    </div>

                    {/* Program highlights */}
                    <div className="bg-[#691C33]/5 rounded-2xl p-4 md:p-5 border-2 border-[#691C33]/10">
                      <h4 className="text-base md:text-lg font-bold text-[#691C33] mb-4">
                        Program Highlights
                      </h4>
                      <div className="space-y-3">
                        {[
                          {
                            title: `${current.days} schedule`,
                            desc: `Weekly classes · ${current.time}`,
                          },
                          {
                            title: "Hands-on practical sessions",
                            desc: "Learn by making real fragrances",
                          },
                          {
                            title: "Business-ready curriculum",
                            desc: "From craft to commercial launch",
                          },
                          {
                            title: "Industry certification",
                            desc: "Recognised perfumery certificate",
                          },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#691C33] mt-0.5 flex-shrink-0" />
                            <div>
                              <h5 className="font-semibold text-[#691C33] text-sm md:text-base leading-snug">
                                {item.title}
                              </h5>
                              <p className="text-[#691C33] text-xs md:text-sm mt-0.5">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column — Weekly plan */}
                  <div className="space-y-5">
                    {selectedProgram === "oneday" ? (
                      /* 1-Day Workshop schedule */
                      <div className="bg-white border-2 border-[#691C33]/10 rounded-2xl p-4 md:p-5">
                        <h3 className="text-lg md:text-xl font-bold text-[#691C33] mb-4">
                          Pick Your Day & Time
                        </h3>
                        <p className="text-sm text-[#691C33] leading-relaxed mb-4">
                          1-Day Workshop runs every{" "}
                          <strong className="font-bold">
                            Friday, Saturday and Sunday
                          </strong>
                          . Choose any available day and a 2-hour time slot.
                        </p>

                        <div className="space-y-3">
                          {oneDaySchedule.map((day) => (
                            <div
                              key={day.day}
                              className="rounded-2xl border-2 border-[#691C33]/10 p-4"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-[#691C33] flex items-center justify-center">
                                  <Calendar className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-bold text-[#691C33] text-sm md:text-base">
                                  {day.day}
                                </h4>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {day.slots.map((slot) => (
                                  <div
                                    key={slot}
                                    className="bg-[#691C33]/5 border border-[#691C33]/15 rounded-xl px-3 py-2 text-xs md:text-sm font-medium text-[#691C33] text-center"
                                  >
                                    {slot}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 bg-[#691C33]/5 border border-[#691C33]/15 rounded-xl p-3 text-xs md:text-sm text-[#691C33] leading-relaxed">
                          <span className="font-bold">Note:</span> Duration is{" "}
                          <strong>2 hours</strong> per session. You'll be
                          contacted to confirm your preferred day and time after
                          enrollment.
                        </div>
                      </div>
                    ) : (
                      /* Art & Commercial weekly plan */
                      <div className="bg-white border-2 border-[#691C33]/10 rounded-2xl p-4 md:p-5">
                        <h3 className="text-lg md:text-xl font-bold text-[#691C33] mb-1">
                          Weekly Schedule
                        </h3>
                        <p className="text-xs md:text-sm text-[#691C33]/80 mb-4">
                          {current.days} · {current.time}
                        </p>

                        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                          {(selectedProgram === "commercial"
                            ? commercialWeeklyPlan
                            : artWeeklyPlan
                          ).map((week, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border-2 border-[#691C33]/10 p-3 md:p-4"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <span className="bg-[#691C33] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                  {week.week}
                                </span>
                                <h4 className="font-bold text-[#691C33] text-sm md:text-base leading-snug">
                                  {week.theme}
                                </h4>
                              </div>
                              <div className="space-y-2">
                                {week.sessions.map((s, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2 text-xs md:text-sm"
                                  >
                                    <span className="font-bold text-[#691C33] w-20 md:w-24 flex-shrink-0">
                                      {s.day}
                                    </span>
                                    <span className="text-[#691C33] flex-1">
                                      {s.topic}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reminder Form */}
                    <div className="bg-[#691C33] rounded-2xl p-4 md:p-5">
                      <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2 text-white">
                        <Bell className="w-5 h-5" />
                        Set Reminders
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-white/90 mb-2">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="w-full bg-white/10 border border-white/25 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isStudent}
                            onChange={(e) => setIsStudent(e.target.checked)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                              isStudent
                                ? "bg-white"
                                : "bg-white/10 border border-white/25"
                            }`}
                          >
                            {isStudent && (
                              <GraduationCap className="w-3.5 h-3.5 text-[#691C33]" />
                            )}
                          </div>
                          <span className="text-xs md:text-sm text-white/90">
                            I am a student
                          </span>
                        </label>

                        <div>
                          <label className="block text-xs md:text-sm font-medium text-white/90 mb-2">
                            When to remind you
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {reminderOptions.map((option) => {
                              const isSelected = selectedReminders.includes(
                                option.id,
                              );
                              return (
                                <button
                                  key={option.id}
                                  onClick={() => toggleReminder(option.id)}
                                  className={`py-2.5 px-2 rounded-xl text-[11px] md:text-xs font-semibold transition-colors ${
                                    isSelected
                                      ? "bg-white text-[#691C33]"
                                      : "bg-white/10 text-white hover:bg-white/20"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <button
                          onClick={handleSetReminder}
                          className="w-full bg-white text-[#691C33] py-3 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-white/95 transition-colors"
                        >
                          <Bell className="w-4 h-4" />
                          SET REMINDERS
                        </button>

                        <p className="text-white/60 text-[10px] md:text-xs text-center">
                          No spam. Unsubscribe anytime.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[#691C33]/10 px-4 py-3 md:px-6 md:py-4 bg-[#691C33]/5 flex-shrink-0">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[#691C33] text-xs md:text-sm text-center sm:text-left">
                    <span className="font-bold">Limited seats</span> · Next
                    cohort starts April 2026
                  </p>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setShowCalendarModal(false)}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border-2 border-[#691C33]/25 text-[#691C33] font-semibold hover:bg-[#691C33]/5 transition-colors text-xs md:text-sm"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => (window.location.href = "/enrollment")}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#691C33] text-white font-semibold hover:bg-[#691C33]/90 transition-colors flex items-center justify-center gap-2 text-xs md:text-sm"
                    >
                      <span>Enroll</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutAcademy;
