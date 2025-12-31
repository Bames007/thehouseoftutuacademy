// components/Sections/AboutAcademy.tsx
"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Target,
  Globe,
  Award,
  Shield,
  BookOpen,
  Users,
  Rocket,
  Sparkles,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Users as UsersIcon,
  X,
  Bell,
  Mail,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const AboutAcademy = () => {
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedReminders, setSelectedReminders] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 3, 1)); // April 2026

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

  // Commercial Perfumery Masterclass Schedule - April 27 to May 10, 2026
  const masterclassSchedule = [
    {
      date: "Mon, Apr 27",
      day: "Day 1",
      title: "Introduction to Perfumery",
      description: "Fragrance theory, history & business overview",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Tue, Apr 28",
      day: "Day 2",
      title: "Fragrance Families & Notes",
      description: "Understanding scent categories and structure",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Wed, Apr 29",
      day: "Day 3",
      title: "Essential Ingredients",
      description: "Working with base materials and carriers",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Thu, Apr 30",
      day: "Day 4",
      title: "Scent Blending Workshop",
      description: "Practical blending techniques and exercises",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Fri, May 1",
      day: "Day 5",
      title: "Creating Signature Scents",
      description: "Developing unique fragrance formulas",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Mon, May 4",
      day: "Day 6",
      title: "Business Fundamentals",
      description: "Pricing, costing, and business setup",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Tue, May 5",
      day: "Day 7",
      title: "Branding & Packaging",
      description: "Creating luxury brand identity",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Wed, May 6",
      day: "Day 8",
      title: "Marketing Strategies",
      description: "Digital and physical marketing techniques",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Thu, May 7",
      day: "Day 9",
      title: "Sales & Distribution",
      description: "Selling online and offline",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Fri, May 8",
      day: "Day 10",
      title: "Business Plan Development",
      description: "Creating comprehensive business plans",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Mon, May 11",
      day: "Day 11",
      title: "Supplier Relations",
      description: "Sourcing and managing suppliers",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Tue, May 12",
      day: "Day 12",
      title: "Quality Control",
      description: "Ensuring product consistency and safety",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Wed, May 13",
      day: "Day 13",
      title: "Advanced Business Skills",
      description: "Financial planning and scaling",
      time: "10:00 AM - 1:00 PM",
    },
    {
      date: "Thu, May 14",
      day: "Day 14",
      title: "Graduation & Certification",
      description: "Final presentations and certification",
      time: "10:00 AM - 1:00 PM",
    },
  ];

  const reminderOptions = [
    { id: "week_before", label: "1 Week Before", days: 7 },
    { id: "3_days_before", label: "3 Days Before", days: 3 },
    { id: "day_before", label: "Day Before", days: 1 },
    { id: "morning_of", label: "Morning of Class", days: 0 },
  ];

  const handleSetReminder = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (selectedReminders.length === 0) {
      alert("Please select at least one reminder option");
      return;
    }

    // Here you would typically send this data to your backend
    console.log({
      email,
      isStudent,
      reminders: selectedReminders,
      course: "Commercial Perfumery Masterclass",
      startDate: "April 27, 2026",
    });

    // Show success message
    alert(
      `Reminders set successfully! We'll send reminders to ${email} for the Commercial Perfumery Masterclass.`
    );

    // Reset form and close modal
    setEmail("");
    setIsStudent(false);
    setSelectedReminders([]);
    setShowCalendarModal(false);
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const toggleReminder = (id: string) => {
    if (selectedReminders.includes(id)) {
      setSelectedReminders(selectedReminders.filter((item) => item !== id));
    } else {
      setSelectedReminders([...selectedReminders, id]);
    }
  };

  // Generate calendar for April 2026
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const startDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isClassDay = (date: Date | null) => {
    if (!date) return false;

    const classDates = [
      // April 27-30, 2026
      new Date(2026, 3, 27),
      new Date(2026, 3, 28),
      new Date(2026, 3, 29),
      new Date(2026, 3, 30),
      // May 1, 2026
      new Date(2026, 4, 1),
      new Date(2026, 4, 4),
      new Date(2026, 4, 5),
      new Date(2026, 4, 6),
      new Date(2026, 4, 7),
      new Date(2026, 4, 8),
      new Date(2026, 4, 11),
      new Date(2026, 4, 12),
      new Date(2026, 4, 13),
      new Date(2026, 4, 14),
    ];

    return classDates.some(
      (classDate) =>
        date.getDate() === classDate.getDate() &&
        date.getMonth() === classDate.getMonth() &&
        date.getFullYear() === classDate.getFullYear()
    );
  };

  const getDayName = (date: Date | null) => {
    if (!date) return "";
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showCalendarModal) {
        setShowCalendarModal(false);
      }
    };

    if (showCalendarModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [showCalendarModal]);

  return (
    <>
      <section className="py-16 md:py-24 relative overflow-hidden" id="about">
        {/* Solid White Background */}
        <div className="absolute inset-0 bg-white"></div>

        {/* Pattern Background - Visible */}
        <div
          className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat"
          style={{ opacity: 0.08 }}
        ></div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 md:py-3 rounded-full">
                <div className="w-2 h-2 bg-[#691C33] rounded-full"></div>
                <span
                  className={`text-[#691C33] font-semibold tracking-wider text-xs md:text-sm ${gothamOffice.className}`}
                >
                  ABOUT THE ACADEMY
                </span>
              </div>

              {/* Title */}
              <h2
                className={`text-3xl md:text-4xl lg:text-5xl font-black text-[#691C33] leading-tight ${italiana.className}`}
              >
                Nigeria's Premier Fragrance Business School
              </h2>

              {/* Description */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-[#691C33]/10">
                  <p
                    className={`text-[#691C33] text-base md:text-lg ${gothamOffice.className} leading-relaxed`}
                  >
                    The House of Tutu Perfumery Academy is Nigeria's first
                    specialized fragrance school dedicated to teaching both the
                    commercial and artistic sides of perfumery.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-[#691C33]/10">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={value.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="bg-white rounded-xl p-4 border border-[#691C33]/10 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#691C33] flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#691C33] text-base md:text-lg">
                          {value.label}
                        </h3>
                        <p className="text-[#691C33]/70 text-sm">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats - Desktop Only */}
              <div className="hidden lg:grid grid-cols-3 gap-4">
                <div className="bg-[#691C33] text-white rounded-xl p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">
                    2 Weeks
                  </div>
                  <div className="text-white/90 text-sm">Intensive Program</div>
                </div>
                <div className="bg-white border border-[#691C33]/10 rounded-xl p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#691C33] mb-1">
                    10+
                  </div>
                  <div className="text-[#691C33]/80 text-sm">
                    Successful Graduates
                  </div>
                </div>
                <div className="bg-[#691C33] text-white rounded-xl p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-1">
                    100%
                  </div>
                  <div className="text-white/90 text-sm">
                    Practical Training
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Animated Process */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              {/* Main Container */}
              <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[#691C33]/10 shadow-xl overflow-hidden">
                {/* Pattern Inside */}
                <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.04]"></div>

                <div className="relative z-10">
                  <h3
                    className={`text-2xl md:text-3xl font-bold text-[#691C33] mb-8 ${gothamOffice.className}`}
                  >
                    Our Learning Journey
                  </h3>

                  {/* Process Steps */}
                  <div className="space-y-6">
                    {[
                      {
                        step: "01",
                        title: "Learn Fundamentals",
                        description:
                          "Master fragrance theory & scent composition",
                        icon: BookOpen,
                        color: "bg-[#691C33]",
                      },
                      {
                        step: "02",
                        title: "Create Products",
                        description: "Develop unique fragrance formulas",
                        icon: Sparkles,
                        color: "bg-white border-2 border-[#691C33]",
                      },
                      {
                        step: "03",
                        title: "Build Brand",
                        description: "Create luxury brand identity & packaging",
                        icon: Target,
                        color: "bg-[#691C33]",
                      },
                      {
                        step: "04",
                        title: "Launch Business",
                        description: "Execute market strategy & sales",
                        icon: Rocket,
                        color: "bg-white border-2 border-[#691C33]",
                      },
                    ].map((step, index) => (
                      <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#691C33]/5 transition-colors group"
                      >
                        {/* Step Number */}
                        <div
                          className={`w-12 h-12 rounded-lg ${step.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                        >
                          <span
                            className={`text-lg font-bold ${
                              step.color.includes("bg-white")
                                ? "text-[#691C33]"
                                : "text-white"
                            }`}
                          >
                            {step.step}
                          </span>
                        </div>

                        {/* Step Content */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <step.icon
                              className={`w-5 h-5 ${
                                step.color.includes("bg-white")
                                  ? "text-[#691C33]"
                                  : "text-[#691C33]"
                              }`}
                            />
                            <h4 className="font-bold text-[#691C33] text-lg">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-[#691C33]/70 text-sm md:text-base">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Central Logo */}
                  <div className="mt-8 flex justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="relative w-24 h-24 md:w-32 md:h-32"
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-[#691C33]/20"></div>
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#691C33] to-[#8B2846] flex items-center justify-center">
                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                          <Image
                            src="/logo-white.png"
                            alt="The House of Tutu Logo"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 64px, 80px"
                            priority
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Mobile Stats */}
              <div className="lg:hidden mt-6 grid grid-cols-3 gap-4">
                <div className="bg-[#691C33] text-white rounded-xl p-4 text-center">
                  <div className="text-xl font-bold mb-1">2 Weeks</div>
                  <div className="text-white/90 text-xs">Intensive</div>
                </div>
                <div className="bg-white border border-[#691C33]/10 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-[#691C33] mb-1">
                    10+
                  </div>
                  <div className="text-[#691C33]/80 text-xs">Graduates</div>
                </div>
                <div className="bg-[#691C33] text-white rounded-xl p-4 text-center">
                  <div className="text-xl font-bold mb-1">100%</div>
                  <div className="text-white/90 text-xs">Practical</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 md:mt-16 rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden"
          >
            {/* Solid Background */}
            <div className="absolute inset-0 bg-[#691C33]"></div>

            {/* Pattern Overlay - White */}
            <div
              className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat"
              style={{ opacity: 0.2, filter: "brightness(0) invert(1)" }}
            ></div>

            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 md:mb-6 ${italiana.className}`}
              >
                Ready to Start Your Fragrance Journey?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/95 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Join Nigeria's premier fragrance business school and transform
                your passion into a profitable career. Limited spots available
                for our next cohort.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.href = "/enrollment")}
                  className="bg-white text-[#691C33] px-6 py-4 rounded-full font-semibold text-base md:text-lg inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                  <span>ENROLL NOW</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCalendarModal(true)}
                  className="bg-transparent border-2 border-white text-white px-6 py-4 rounded-full font-semibold text-base md:text-lg inline-flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
                >
                  <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                  <span>VIEW SCHEDULE</span>
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-6 border-t border-white/20"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      100%
                    </div>
                    <div className="text-white/80 text-sm md:text-base mt-1">
                      Practical
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      24/7
                    </div>
                    <div className="text-white/80 text-sm md:text-base mt-1">
                      Support
                    </div>
                  </div>
                  <div className="text-center col-span-2 md:col-span-1">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      ₦500K
                    </div>
                    <div className="text-white/80 text-sm md:text-base mt-1">
                      Starting Tuition
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 md:p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-6xl bg-white rounded-2xl md:rounded-3xl overflow-hidden max-h-[90vh] md:max-h-[85vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCalendarModal(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#691C33]/10 backdrop-blur-sm border border-[#691C33]/20 flex items-center justify-center text-[#691C33] hover:bg-[#691C33]/20 transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#691C33] to-[#8B2846] p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                    <span className="text-sm md:text-base font-semibold uppercase tracking-wider">
                      COMMERCIAL PERFUMERY MASTERCLASS
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">
                    2-Week Intensive Program
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>April 27 - May 14, 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-4 h-4" />
                      <span>10:00 AM - 1:00 PM Daily</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl font-bold">
                      ₦500,000
                    </div>
                    <div className="text-sm text-white/80">Full Course Fee</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
              <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                {/* Left Column - Calendar */}
                <div className="space-y-6">
                  <div className="bg-white border border-[#691C33]/10 rounded-2xl p-4 md:p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-[#691C33]">
                        {formatDate(currentMonth)}
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevMonth}
                          className="w-8 h-8 rounded-lg bg-[#691C33]/10 flex items-center justify-center text-[#691C33] hover:bg-[#691C33]/20 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextMonth}
                          className="w-8 h-8 rounded-lg bg-[#691C33]/10 flex items-center justify-center text-[#691C33] hover:bg-[#691C33]/20 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-xs md:text-sm font-semibold text-[#691C33]/70 py-2"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {generateCalendar().map((date, index) => {
                        const isClass = date && isClassDay(date);
                        const isToday =
                          date &&
                          date.getDate() === new Date().getDate() &&
                          date.getMonth() === new Date().getMonth() &&
                          date.getFullYear() === new Date().getFullYear();

                        return (
                          <div
                            key={index}
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all ${
                              date
                                ? isClass
                                  ? "bg-[#691C33] text-white"
                                  : isToday
                                  ? "bg-[#691C33]/10 text-[#691C33] border-2 border-[#691C33]"
                                  : "text-[#691C33] hover:bg-[#691C33]/5"
                                : ""
                            }`}
                          >
                            {date && (
                              <>
                                <div className="text-xs opacity-70">
                                  {getDayName(date)}
                                </div>
                                <div className="font-bold">
                                  {date.getDate()}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#691C33]"></div>
                        <span className="text-sm text-[#691C33]">
                          Class Day
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#691C33]/10 border border-[#691C33]"></div>
                        <span className="text-sm text-[#691C33]">Today</span>
                      </div>
                    </div>
                  </div>

                  {/* Class Details Summary */}
                  <div className="bg-gradient-to-br from-[#691C33]/5 to-[#8B2846]/5 rounded-2xl p-4 md:p-6 border border-[#691C33]/10">
                    <h4 className="text-lg md:text-xl font-bold text-[#691C33] mb-4">
                      Program Highlights
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#691C33] mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-[#691C33]">
                            14 Days of Intensive Training
                          </h5>
                          <p className="text-[#691C33]/70 text-sm">
                            3 hours daily, Monday to Friday
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#691C33] mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-[#691C33]">
                            Hands-on Practical Sessions
                          </h5>
                          <p className="text-[#691C33]/70 text-sm">
                            Create 5+ signature fragrances
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#691C33] mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-[#691C33]">
                            Business Development
                          </h5>
                          <p className="text-[#691C33]/70 text-sm">
                            Complete business plan & launch strategy
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-[#691C33] mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-semibold text-[#691C33]">
                            Industry Certification
                          </h5>
                          <p className="text-[#691C33]/70 text-sm">
                            Receive professional perfumer certification
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Schedule and Reminder Form */}
                <div className="space-y-6">
                  {/* Schedule */}
                  <div className="bg-white border border-[#691C33]/10 rounded-2xl p-4 md:p-6 shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-[#691C33] mb-4 md:mb-6">
                      Detailed Schedule
                    </h3>
                    <div className="space-y-4 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
                      {masterclassSchedule.map((session, index) => (
                        <motion.div
                          key={session.date}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-4 p-3 md:p-4 rounded-xl border border-[#691C33]/10 hover:bg-[#691C33]/5 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#691C33] text-white flex flex-col items-center justify-center">
                              <div className="text-xs font-semibold">
                                {session.day}
                              </div>
                              <div className="text-xs opacity-90">Day</div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <h4 className="font-bold text-[#691C33] text-base md:text-lg">
                                {session.title}
                              </h4>
                              <div className="text-xs md:text-sm font-medium bg-[#691C33]/10 text-[#691C33] px-2 py-1 rounded-full">
                                {session.date}
                              </div>
                            </div>
                            <p className="text-[#691C33]/70 text-sm md:text-base mb-2">
                              {session.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-[#691C33]/70">
                              <Clock className="w-3 h-3 md:w-4 md:h-4" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Reminder Form */}
                  <div className="bg-gradient-to-br from-[#691C33] to-[#8B2846] rounded-2xl p-4 md:p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                      <Bell className="w-5 h-5 md:w-6 md:h-6" />
                      Set Reminders
                    </h3>

                    <div className="space-y-6">
                      {/* Email Input */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl pl-12 pr-4 py-3 md:py-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                          />
                        </div>
                      </div>

                      {/* Student Status */}
                      <div>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={isStudent}
                              onChange={(e) => setIsStudent(e.target.checked)}
                              className="sr-only"
                            />
                            <div
                              className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                isStudent
                                  ? "bg-white"
                                  : "bg-white/10 border border-white/20"
                              }`}
                            >
                              {isStudent && (
                                <GraduationCap className="w-4 h-4 text-[#691C33]" />
                              )}
                            </div>
                          </div>
                          <span className="font-medium">
                            I am a student (special discounts available)
                          </span>
                        </label>
                      </div>

                      {/* Reminder Options */}
                      <div>
                        <label className="block text-sm font-medium mb-3">
                          When would you like to be reminded?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {reminderOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => toggleReminder(option.id)}
                              className={`flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
                                selectedReminders.includes(option.id)
                                  ? "bg-white text-[#691C33]"
                                  : "bg-white/10 hover:bg-white/20 text-white"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                  selectedReminders.includes(option.id)
                                    ? "bg-[#691C33] text-white"
                                    : "bg-white/20"
                                }`}
                              >
                                {selectedReminders.includes(option.id) && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>
                              <span className="text-sm font-medium">
                                {option.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSetReminder}
                        className="w-full bg-white text-[#691C33] py-3 md:py-4 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <Bell className="w-5 h-5" />
                        <span>SET REMINDERS</span>
                      </motion.button>

                      <p className="text-white/70 text-xs md:text-sm text-center">
                        We'll send you reminders about the program start date
                        and important deadlines. No spam, unsubscribe anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#691C33]/10 p-4 md:p-6 bg-[#691C33]/5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <p className="text-[#691C33] font-medium">
                    Limited spots available for April 2026 cohort
                  </p>
                  <p className="text-[#691C33]/70 text-sm">
                    Early enrollment discount ends March 15, 2026
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCalendarModal(false)}
                    className="px-6 py-3 rounded-xl border border-[#691C33] text-[#691C33] font-medium hover:bg-[#691C33]/5 transition-colors"
                  >
                    CLOSE
                  </button>
                  <button
                    onClick={() => (window.location.href = "/enrollment")}
                    className="px-6 py-3 rounded-xl bg-[#691C33] text-white font-medium hover:bg-[#8B2846] transition-colors flex items-center gap-2"
                  >
                    <Rocket className="w-4 h-4" />
                    ENROLL NOW
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AboutAcademy;
