// components/Sections/StudentSuccess.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  TrendingUp,
  DollarSign,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowRight,
  GraduationCap,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const StudentSuccess = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [statValues, setStatValues] = useState([0, 0, 0, 0]);
  const hasAnimated = useRef(false);

  // ─── Success Stories ────────────────────────────────────
  const successStories = [
    {
      name: "Chioma Ade",
      business: "LuxeScents NG",
      before: 0,
      after: 8500000,
      duration: "6 months",
      testimonial:
        "I went from mixing oils at home to supplying luxury hotels across Nigeria. The academy's business blueprint transformed my hobby into a thriving enterprise.",
      location: "Abuja, Nigeria",
      category: "Luxury Hospitality Supplier",
    },
    {
      name: "Kunle Bankole",
      business: "AromaCraft Export",
      before: 200000,
      after: 12000000,
      duration: "9 months",
      testimonial:
        "The international supplier directory and export training helped me scale from local markets to shipping to the UK and US. My revenue grew 60x.",
      location: "Abuja, Nigeria",
      category: "International Exporter",
    },
    {
      name: "Amara Eze",
      business: "ScentStory Boutique",
      before: 0,
      after: 5200000,
      duration: "4 months",
      testimonial:
        "Launching my brand was seamless with the academy's step-by-step blueprint. The packaging templates alone saved me 3 months of design work.",
      location: "Port Harcourt, Nigeria",
      category: "Premium Retail Brand",
    },
    {
      name: "Tunde Okafor",
      business: "Oasis Scents",
      before: 500000,
      after: 9500000,
      duration: "8 months",
      testimonial:
        "The pricing calculator tool helped me optimize my margins. I now supply corporate gifts to 15 major banks in Nigeria.",
      location: "Ibadan, Nigeria",
      category: "Corporate Gifts Specialist",
    },
  ];

  // ─── Stats ──────────────────────────────────────────────
  const successStats = [
    {
      icon: DollarSign,
      value: 60,
      label: "Collective Revenue",
      suffix: "M+",
      prefix: "₦",
    },
    {
      icon: TrendingUp,
      value: 300,
      label: "Average ROI",
      suffix: "%",
      prefix: "",
    },
    {
      icon: Users,
      value: 500,
      label: "Graduates",
      suffix: "+",
      prefix: "",
    },
    {
      icon: Award,
      value: 4.9,
      label: "Satisfaction",
      suffix: "/5",
      prefix: "",
      decimals: 1,
    },
  ];

  // ─── Animated counters ──────────────────────────────────
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1800;
    const steps = 60;
    const stepDuration = duration / steps;

    successStats.forEach((stat, index) => {
      let currentStep = 0;
      const stepValue = stat.value / steps;

      const interval = setInterval(() => {
        currentStep++;
        setStatValues((prev) => {
          const next = [...prev];
          next[index] = Math.min(stepValue * currentStep, stat.value);
          return next;
        });
        if (currentStep >= steps) clearInterval(interval);
      }, stepDuration);
    });
  }, []);

  // ─── Auto-rotate ────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) =>
        prev === successStories.length - 1 ? 0 : prev + 1,
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [successStories.length]);

  const nextStory = () =>
    setCurrentStory((prev) =>
      prev === successStories.length - 1 ? 0 : prev + 1,
    );

  const prevStory = () =>
    setCurrentStory((prev) =>
      prev === 0 ? successStories.length - 1 : prev - 1,
    );

  // ─── Helpers ────────────────────────────────────────────
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
    return `₦${amount}`;
  };

  const renderStatValue = (index: number, stat: (typeof successStats)[0]) => {
    const v = statValues[index];
    if (stat.decimals) return v.toFixed(stat.decimals);
    return Math.floor(v);
  };

  const story = successStories[currentStory];

  const growthMultiplier =
    story.before === 0
      ? "New business"
      : `${(((story.after - story.before) / story.before) * 100).toFixed(
          0,
        )}x growth`;

  return (
    <section
      id="success"
      className="relative overflow-hidden py-14 md:py-24"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Section pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/pattern.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.04,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-[#691C33]" />
            <span
              className={`text-xs md:text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              GRADUATE SUCCESS
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 leading-tight ${italiana.className}`}
          >
            From Passion to Profit
          </h2>

          <p
            className={`text-base md:text-lg text-[#691C33] max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Our graduates aren't just creating fragrances — they're building
            profitable, sustainable businesses. See real stories from
            entrepreneurs who transformed their passion.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-12 md:mb-16"
        >
          {successStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-4 md:p-5 border-2 border-[#691C33]/10 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#691C33] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xl md:text-2xl lg:text-3xl font-bold text-[#691C33] leading-none ${gothamOffice.className}`}
                    >
                      {stat.prefix}
                      {renderStatValue(index, stat)}
                      <span className="text-base md:text-lg">
                        {stat.suffix}
                      </span>
                    </div>
                    <div className="text-xs md:text-sm text-[#691C33] font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Featured Story */}
        <div className="mb-12 md:mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border-2 border-[#691C33]/10 shadow-xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-5">
                {/* Left: Identity block */}
                <div className="lg:col-span-2 bg-[#691C33] p-6 md:p-8 flex flex-col justify-between relative">
                  <div>
                    {/* Quote icon */}
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                      <Quote className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>

                    <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/60 mb-2">
                      Graduate Story
                    </div>

                    <h3
                      className={`text-2xl md:text-3xl font-bold text-white leading-tight mb-2 ${gothamOffice.className}`}
                    >
                      {story.name}
                    </h3>

                    <div className="text-white/90 font-semibold text-sm md:text-base mb-1">
                      {story.business}
                    </div>

                    <div className="text-white/70 text-xs md:text-sm">
                      {story.location}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-white" />
                      <span className="text-xs md:text-sm font-medium text-white">
                        {story.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Testimonial + growth */}
                <div className="lg:col-span-3 p-6 md:p-8 lg:p-10">
                  {/* Testimonial */}
                  <p className="text-[#691C33] text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                    "{story.testimonial}"
                  </p>

                  {/* Growth block */}
                  <div className="bg-[#691C33]/5 border border-[#691C33]/10 rounded-2xl p-4 md:p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4
                        className={`text-sm md:text-base font-bold text-[#691C33] ${gothamOffice.className}`}
                      >
                        Business Growth
                      </h4>
                      <div className="text-xs md:text-sm font-bold text-[#691C33] bg-[#691C33]/10 px-3 py-1 rounded-full">
                        {growthMultiplier}
                      </div>
                    </div>

                    {/* Before */}
                    <div className="mb-3">
                      <div className="flex justify-between items-baseline text-xs md:text-sm mb-1.5">
                        <span className="text-[#691C33]/70">
                          Starting Revenue
                        </span>
                        <span className="font-bold text-[#691C33]">
                          {formatCurrency(story.before)}
                        </span>
                      </div>
                      <div className="h-2 bg-[#691C33]/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{
                            width: story.before === 0 ? "2%" : "15%",
                          }}
                          transition={{ duration: 1.2, delay: 0.2 }}
                          className="h-full bg-[#691C33]/40 rounded-full"
                        />
                      </div>
                    </div>

                    {/* After */}
                    <div>
                      <div className="flex justify-between items-baseline text-xs md:text-sm mb-1.5">
                        <span className="text-[#691C33]/70">
                          After {story.duration}
                        </span>
                        <span className="font-bold text-[#691C33] text-base md:text-lg">
                          {formatCurrency(story.after)}
                        </span>
                      </div>
                      <div className="h-2.5 md:h-3 bg-[#691C33]/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{
                            width: `${Math.min(
                              100,
                              (story.after / 15000000) * 100,
                            )}%`,
                          }}
                          transition={{ duration: 1.8, delay: 0.4 }}
                          className="h-full bg-[#691C33] rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={prevStory}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white shadow-md border-2 border-[#691C33]/15 hover:border-[#691C33] flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5 text-[#691C33]" />
            </button>

            {/* Dots */}
            <div className="flex gap-2 justify-center flex-1">
              {successStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStory(index)}
                  aria-label={`Go to story ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStory
                      ? "w-8 bg-[#691C33]"
                      : "w-2 bg-[#691C33]/20 hover:bg-[#691C33]/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStory}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white shadow-md border-2 border-[#691C33]/15 hover:border-[#691C33] flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5 text-[#691C33]" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#691C33] rounded-3xl p-6 md:p-10 lg:p-12 relative overflow-hidden">
            {/* Pattern inside CTA */}
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

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h3
                className={`text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4 leading-tight ${italiana.className}`}
              >
                Ready to Write Your Success Story?
              </h3>

              <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">
                Join our next cohort of fragrance entrepreneurs and get the
                exact blueprint that helped these graduates build profitable
                businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8">
                <button
                  onClick={() => (window.location.href = "/enrollment")}
                  className="w-full sm:w-auto bg-white text-[#691C33] px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-white/95 transition-colors"
                >
                  <span>START YOUR JOURNEY</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <button className="w-full sm:w-auto border-2 border-white/40 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold text-sm md:text-base hover:bg-white/10 transition-colors">
                  DOWNLOAD BLUEPRINT
                </button>
              </div>

              {/* Trust strip */}
              <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-white fill-white" />
                    ))}
                  </div>
                  <span className="text-white text-sm font-medium">
                    Rated 4.9/5 by 500+ students
                  </span>
                </div>

                <div className="hidden sm:block h-4 w-px bg-white/30" />

                <div className="text-white text-sm">
                  Limited seats for the next cohort
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentSuccess;
