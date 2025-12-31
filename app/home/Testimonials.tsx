// components/Sections/Testimonials.tsx
"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Quote,
  Star,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Target,
  MapPin,
} from "lucide-react";
import Image from "next/image";
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
      image: "/testimonial-1.jpg",
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
      image: "/testimonial-2.jpg",
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
      image: "/testimonial-3.jpg",
      location: "Abuja, Nigeria",
      category: "Premium Brand",
      growth: "∞",
    },
    {
      id: 4,
      name: "James Wilson",
      business: "ScentCraft UK",
      revenue: "₦25M",
      duration: "1.5 years",
      text: "As an international student, the online format was perfect. The quality of instruction rivals any European perfumery school at a fraction of the cost.",
      image: "/testimonial-4.jpg",
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.09]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#691C33]" />
            <span
              className={`text-xs md:text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              SUCCESS STORIES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 md:mb-6 ${italiana.className}`}
          >
            Graduate Transformations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-base md:text-xl text-[#691C33]/80 max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            See how our graduates have transformed their passion into profitable
            fragrance businesses.
          </motion.p>
        </motion.div>

        {/* Testimonial Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 border border-[#691C33]/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#691C33]/10 flex items-center justify-center mb-2 md:mb-4">
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-[#691C33]" />
                </div>
                <div
                  className={`text-xl md:text-3xl lg:text-4xl font-bold text-[#691C33] mb-1 md:mb-2 ${gothamOffice.className}`}
                >
                  {stat.value}
                </div>
                <div className="text-[#691C33]/70 text-xs md:text-sm text-center">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Active Testimonial */}
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl md:rounded-3xl shadow-xl border border-[#691C33]/10 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left Column - Testimonial */}
                <div className="p-4 md:p-6 lg:p-8 lg:w-3/5">
                  <div className="flex items-start justify-between mb-4 md:mb-6">
                    <Quote className="w-8 h-8 md:w-12 md:h-12 text-[#691C33]/30 flex-shrink-0" />
                    <div className="flex items-center ml-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[#691C33] text-base md:text-xl lg:text-2xl leading-relaxed mb-6 md:mb-8">
                    "{testimonials[activeTestimonial].text}"
                  </p>

                  {/* Student Info */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#691C33]/20 to-[#8B2846]/20 flex items-center justify-center text-[#691C33] font-bold text-lg">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-[#691C33] text-base md:text-xl">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-[#691C33]/70 text-sm md:text-base mb-1">
                        Founder, {testimonials[activeTestimonial].business}
                      </div>
                      <div className="flex items-center gap-2 text-[#691C33]/50 text-xs md:text-sm">
                        <MapPin className="w-3 h-3" />
                        {testimonials[activeTestimonial].location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Results */}
                <div className="bg-gradient-to-br from-[#691C33] to-[#8B2846] p-4 md:p-6 lg:p-8 text-white lg:w-2/5">
                  <h3
                    className={`text-lg md:text-2xl font-bold mb-4 md:mb-6 ${gothamOffice.className}`}
                  >
                    Business Results
                  </h3>

                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <div className="text-xs md:text-sm text-white/80 mb-1">
                        Revenue Generated
                      </div>
                      <div className="text-2xl md:text-4xl font-bold">
                        {testimonials[activeTestimonial].revenue}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs md:text-sm text-white/80 mb-1">
                        Time to Profit
                      </div>
                      <div className="text-xl md:text-2xl font-bold">
                        {testimonials[activeTestimonial].duration}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs md:text-sm text-white/80 mb-1">
                        Business Growth
                      </div>
                      <div className="text-2xl md:text-3xl font-bold">
                        {testimonials[activeTestimonial].growth}
                      </div>
                    </div>

                    <div className="pt-4 md:pt-6 border-t border-white/20">
                      <div className="text-xs md:text-sm text-white/80 mb-2">
                        Business Category
                      </div>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        <span className="px-2 md:px-3 py-1 bg-white/10 rounded-full text-xs md:text-sm">
                          {testimonials[activeTestimonial].category}
                        </span>
                        <span className="px-2 md:px-3 py-1 bg-white/10 rounded-full text-xs md:text-sm">
                          E-commerce
                        </span>
                        <span className="px-2 md:px-3 py-1 bg-white/10 rounded-full text-xs md:text-sm">
                          Wholesale
                        </span>
                      </div>
                    </div>

                    {/* Achievement Badge */}
                    <div className="mt-4 md:mt-6 p-3 md:p-4 bg-white/10 rounded-lg md:rounded-xl border border-white/20">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 md:w-6 md:h-6 mr-2 md:mr-3" />
                        <div>
                          <div className="font-bold text-sm md:text-base">
                            Top Performing Graduate
                          </div>
                          <div className="text-white/80 text-xs md:text-sm">
                            The House of Tutu Academy
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Student Images Navigation */}
          <div className="flex justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTestimonial(index)}
                className={`relative rounded-lg md:rounded-xl overflow-hidden border-2 transition-all ${
                  activeTestimonial === index
                    ? "border-[#691C33] scale-110"
                    : "border-[#691C33]/20 hover:border-[#691C33]/40"
                }`}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-[#691C33]/10 to-[#8B2846]/10 flex items-center justify-center">
                  <div className="text-[#691C33] font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                {activeTestimonial === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#691C33] flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-3 md:gap-4 mt-4 md:mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#691C33]/20 flex items-center justify-center text-[#691C33] hover:border-[#691C33] hover:bg-[#691C33]/5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#691C33]/20 flex items-center justify-center text-[#691C33] hover:border-[#691C33] hover:bg-[#691C33]/5 transition-colors"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 bg-gradient-to-r from-[#691C33]/5 to-[#8B2846]/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-[#691C33]/10">
            <div className="text-center sm:text-left">
              <div className="font-bold text-[#691C33] text-base md:text-lg">
                Ready to join our success stories?
              </div>
              <div className="text-[#691C33]/70 text-sm">
                Next cohort starts 27th April 2026
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#691C33] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-full font-semibold text-sm md:text-base hover:shadow-lg transition-shadow"
            >
              Reserve Your Seat
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
