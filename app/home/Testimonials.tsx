// components/Sections/Testimonials.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Quote,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Chiamaka Okoro",
      business: "ScentCouture NG",
      revenue: "₦8.5M",
      duration: "6 months",
      text: "Before joining The House of Tutu, I was just mixing oils for friends. Now I have a thriving business with clients across Africa. The business training alone was worth 10x the tuition.",
      location: "Lagos, Nigeria",
      category: "Luxury Retail",
      growth: "850%",
    },
    {
      id: 2,
      name: "David Chen",
      business: "AromaEssentials",
      revenue: "₦12M",
      duration: "9 months",
      text: "The supplier sourcing module transformed my business. I now source directly from France and Dubai at 60% lower costs. The academy's network is invaluable.",
      location: "Accra, Ghana",
      category: "International Export",
      growth: "600%",
    },
    {
      id: 3,
      name: "Fatima Bello",
      business: "LuxeScents Africa",
      revenue: "₦15M",
      duration: "1 year",
      text: "I went from zero perfume knowledge to launching a luxury brand in 4 months. The step-by-step curriculum and direct instructor support made it possible.",
      location: "Abuja, Nigeria",
      category: "Premium Brand",
      growth: "New",
    },
    {
      id: 4,
      name: "James Wilson",
      business: "ScentCraft UK",
      revenue: "₦25M",
      duration: "1.5 years",
      text: "As an international student, the format was perfect. The quality of instruction rivals any European perfumery school at a fraction of the cost.",
      location: "London, UK",
      category: "International Brand",
      growth: "500%",
    },
  ];

  const stats = [
    { icon: DollarSign, value: "₦60M+", label: "Collective Revenue" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
    { icon: Users, value: "500+", label: "Graduates" },
    { icon: Award, value: "4.9/5", label: "Average Rating" },
  ];

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const next = () =>
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  const story = testimonials[activeTestimonial];

  return (
    <section
      id="testimonials"
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
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 rounded-full bg-[#691C33]" />
            <span
              className={`text-xs md:text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              GRADUATE TRANSFORMATIONS
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 leading-tight ${italiana.className}`}
          >
            Real Stories, Real Results
          </h2>

          <p
            className={`text-base md:text-lg text-[#691C33] max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            See how our graduates turned their passion into profitable fragrance
            businesses — with proof.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-10 md:mb-14"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-4 md:p-5 border-2 border-[#691C33]/10 shadow-md"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#691C33] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-lg md:text-2xl font-bold text-[#691C33] leading-none ${gothamOffice.className}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[11px] md:text-sm text-[#691C33] font-medium mt-1 leading-snug">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Featured Testimonial */}
        <div className="mb-10 md:mb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border-2 border-[#691C33]/10 shadow-xl overflow-hidden"
            >
              <div className="grid lg:grid-cols-5">
                {/* Left: Identity + Results */}
                <div className="lg:col-span-2 bg-[#691C33] p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    {/* Quote */}
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

                    <div className="flex items-center gap-1.5 text-white/70 text-xs md:text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{story.location}</span>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mt-8 pt-6 border-t border-white/20 space-y-4">
                    <div>
                      <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                        Revenue Generated
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-white">
                        {story.revenue}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                          Time to Profit
                        </div>
                        <div className="text-base md:text-lg font-bold text-white">
                          {story.duration}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                          Growth
                        </div>
                        <div className="text-base md:text-lg font-bold text-white">
                          {story.growth}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-white" />
                        <span className="text-xs md:text-sm font-medium text-white">
                          {story.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Testimonial */}
                <div className="lg:col-span-3 p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 text-[#691C33] fill-[#691C33]"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p
                    className={`text-[#691C33] text-base md:text-xl lg:text-2xl leading-relaxed mb-6 md:mb-8 ${gothamOffice.className} font-light`}
                  >
                    "{story.text}"
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 md:gap-4 pt-6 border-t border-[#691C33]/10">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#691C33] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg md:text-xl font-bold">
                        {story.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[#691C33] text-sm md:text-base leading-tight">
                        {story.name}
                      </div>
                      <div className="text-[#691C33]/70 text-xs md:text-sm mt-0.5">
                        Founder, {story.business}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#691C33]/15 hover:border-[#691C33] flex items-center justify-center transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-[#691C33]" />
            </button>

            {/* Dots */}
            <div className="flex gap-2 justify-center flex-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === activeTestimonial
                      ? "w-8 bg-[#691C33]"
                      : "w-2 bg-[#691C33]/20 hover:bg-[#691C33]/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white border-2 border-[#691C33]/15 hover:border-[#691C33] flex items-center justify-center transition-colors flex-shrink-0"
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
          <div className="bg-[#691C33] rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3
                className={`text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 ${italiana.className}`}
              >
                Ready to Join Our Success Stories?
              </h3>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Next cohort starts{" "}
                <span className="font-bold text-white">April 2026</span> ·
                Registration is free
              </p>
            </div>

            <button
              onClick={() => (window.location.href = "/enrollment")}
              className="w-full md:w-auto bg-white text-[#691C33] px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-white/95 transition-colors whitespace-nowrap flex-shrink-0"
            >
              <span>Reserve Your Seat</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
