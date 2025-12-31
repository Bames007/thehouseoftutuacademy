// components/Sections/StudentSuccess.tsx
"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Star,
  Award,
  Zap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const StudentSuccess = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [statValues, setStatValues] = useState([0, 0, 0, 0]);

  const successStories = [
    {
      name: "Chioma Ade",
      business: "LuxeScents NG",
      before: 0,
      after: 8500000,
      duration: "6 months",
      testimonial:
        "I went from mixing oils at home to supplying luxury hotels across Nigeria. The academy's business blueprint transformed my hobby into a thriving enterprise.",
      image: "/student-1.jpg",
      location: "Lagos, Nigeria",
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
      image: "/student-2.jpg",
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
      image: "/student-3.jpg",
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
      image: "/student-4.jpg",
      location: "Ibadan, Nigeria",
      category: "Corporate Gifts Specialist",
    },
  ];

  const successStats = [
    {
      icon: DollarSign,
      targetValue: 60000000,
      label: "Collective Revenue",
      suffix: "M+",
    },
    { icon: TrendingUp, targetValue: 300, label: "Average ROI", suffix: "%" },
    {
      icon: Users,
      targetValue: 500,
      label: "Successful Graduates",
      suffix: "+",
    },
    {
      icon: Award,
      targetValue: 4.9,
      label: "Satisfaction Rating",
      suffix: "/5",
    },
  ];

  // Animated counter for stats
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    successStats.forEach((stat, index) => {
      let currentStep = 0;
      const stepValue = stat.targetValue / steps;

      const interval = setInterval(() => {
        currentStep++;
        setStatValues((prev) => {
          const newValues = [...prev];
          newValues[index] = Math.min(
            stepValue * currentStep,
            stat.targetValue
          );
          return newValues;
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    });
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStory((prev) =>
        prev === successStories.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [successStories.length]);

  const nextStory = () => {
    setCurrentStory((prev) =>
      prev === successStories.length - 1 ? 0 : prev + 1
    );
  };

  const prevStory = () => {
    setCurrentStory((prev) =>
      prev === 0 ? successStories.length - 1 : prev - 1
    );
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `₦${(amount / 1000).toFixed(0)}K`;
    }
    return `₦${amount}`;
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
              PROVEN SUCCESS TRACK RECORD
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 md:mb-6 ${italiana.className}`}
          >
            From Passion to <span className="text-[#8B2846]">Profit</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-base md:text-xl text-[#691C33]/80 max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Our graduates aren't just creating fragrances – they're building
            profitable, sustainable businesses. See real stories from
            entrepreneurs who transformed their passion.
          </motion.p>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20"
        >
          {successStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                y: -4,
                boxShadow: "0 10px 25px rgba(105, 28, 51, 0.15)",
              }}
              className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 border border-[#691C33]/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#691C33]/10 flex items-center justify-center mb-2 md:mb-4 group-hover:bg-[#691C33]/20 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-[#691C33]" />
                </motion.div>
                <div
                  className={`text-xl md:text-3xl lg:text-4xl font-bold text-[#691C33] mb-1 md:mb-2 ${gothamOffice.className}`}
                >
                  {stat.targetValue <= 100
                    ? statValues[index].toFixed(1)
                    : Math.floor(statValues[index] / 1000000)}
                  <span className="text-[#8B2846]">{stat.suffix}</span>
                </div>
                <div className="text-[#691C33]/70 text-xs md:text-sm font-medium text-center">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Stories Carousel */}
        <div className="max-w-6xl mx-auto mb-12 md:mb-20">
          <motion.div
            key={currentStory}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white rounded-xl md:rounded-3xl shadow-xl border border-[#691C33]/10 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Student Image Section */}
                <div className="lg:w-2/5 relative h-64 md:h-80 lg:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#691C33]/10 to-[#8B2846]/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4">
                        <Quote className="w-8 h-8 md:w-10 md:h-10 text-white" />
                      </div>
                      <h3 className="text-white text-lg md:text-xl font-bold">
                        {successStories[currentStory].name}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {successStories[currentStory].business}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm px-3 md:px-4 py-2 rounded-lg">
                      <div className="text-xs text-[#691C33]/70">Graduate</div>
                      <div className="font-bold text-[#691C33] text-sm">
                        {successStories[currentStory].duration} after academy
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonial Content */}
                <div className="lg:w-3/5 p-4 md:p-8 lg:p-12">
                  <div className="mb-4 md:mb-6">
                    <p className="text-[#691C33] text-base md:text-lg lg:text-xl italic leading-relaxed mb-6 md:mb-8">
                      "{successStories[currentStory].testimonial}"
                    </p>
                  </div>

                  <div className="mb-6 md:mb-8">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div>
                        <h3
                          className={`text-lg md:text-2xl font-bold text-[#691C33] ${gothamOffice.className}`}
                        >
                          {successStories[currentStory].name}
                        </h3>
                        <div className="text-[#8B2846] font-semibold text-sm md:text-base">
                          {successStories[currentStory].business}
                        </div>
                        <div className="text-[#691C33]/70 text-xs md:text-sm mt-1">
                          {successStories[currentStory].location} •{" "}
                          {successStories[currentStory].category}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Growth Visualization */}
                  <div className="bg-gradient-to-r from-[#691C33]/5 to-[#8B2846]/5 rounded-lg md:rounded-2xl p-4 md:p-6">
                    <h4
                      className={`font-bold text-[#691C33] mb-3 md:mb-4 text-base md:text-lg ${gothamOffice.className}`}
                    >
                      Business Growth
                    </h4>
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <div className="flex justify-between text-xs md:text-sm text-[#691C33]/70 mb-1">
                          <span>Starting Revenue</span>
                          <span className="font-semibold">
                            {formatCurrency(
                              successStories[currentStory].before
                            )}
                          </span>
                        </div>
                        <div className="h-2 bg-[#691C33]/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-[#691C33]/30 to-[#8B2846]/30 rounded-full"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs md:text-sm text-[#691C33]/70 mb-1">
                          <span>
                            After {successStories[currentStory].duration}
                          </span>
                          <span className="font-semibold text-[#691C33]">
                            {formatCurrency(successStories[currentStory].after)}
                          </span>
                        </div>
                        <div className="h-2 md:h-3 bg-[#691C33]/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{
                              width: `${Math.min(
                                100,
                                (successStories[currentStory].after /
                                  15000000) *
                                  100
                              )}%`,
                            }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-[#691C33] to-[#8B2846] rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 md:mt-4 flex items-center justify-between">
                      <div className="text-xs md:text-sm text-[#691C33]/70">
                        Growth:{" "}
                        <span className="font-bold text-[#691C33]">
                          {successStories[currentStory].before === 0
                            ? "∞"
                            : `${(
                                ((successStories[currentStory].after -
                                  successStories[currentStory].before) /
                                  successStories[currentStory].before) *
                                100
                              ).toFixed(0)}x`}
                        </span>
                      </div>
                      <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#691C33]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-6 md:mt-8">
              <button
                onClick={prevStory}
                className="p-2 md:p-3 rounded-full bg-white shadow-lg border border-[#691C33]/20 hover:border-[#691C33] hover:bg-[#691C33]/5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#691C33]" />
              </button>

              {/* Indicators */}
              <div className="flex gap-2">
                {successStories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStory(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                      index === currentStory
                        ? "w-4 md:w-8 bg-[#691C33]"
                        : "bg-[#691C33]/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextStory}
                className="p-2 md:p-3 rounded-full bg-white shadow-lg border border-[#691C33]/20 hover:border-[#691C33] hover:bg-[#691C33]/5 transition-colors"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#691C33]" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[#691C33] to-[#8B2846] rounded-xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-white overflow-hidden relative">
            {/* Pattern Background */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.07]"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h3
                className={`text-xl md:text-4xl font-bold mb-4 md:mb-6 ${italiana.className}`}
              >
                Ready to Write <span className="text-yellow-300">Your</span>{" "}
                Success Story?
              </h3>
              <p className="text-white/80 text-sm md:text-xl mb-6 md:mb-10">
                Join our next cohort of fragrance entrepreneurs and get the
                exact blueprint that helped these graduates build profitable
                businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-6 md:mb-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#691C33] px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-full font-bold text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 hover:shadow-2xl transition-shadow w-full sm:w-auto"
                >
                  <Zap className="w-4 h-4 md:w-5 md:h-5" />
                  <span>START YOUR JOURNEY TODAY</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white/50 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-full font-bold text-sm md:text-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
                >
                  DOWNLOAD SUCCESS BLUEPRINT
                </motion.button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 md:w-6 md:h-6 text-yellow-300 fill-yellow-300"
                      />
                    ))}
                  </div>
                  <div className="text-white/80 text-sm">
                    Rated <span className="font-bold">4.9/5</span> by 500+
                    students
                  </div>
                </div>

                <div className="h-4 w-px bg-white/30 hidden sm:block" />

                <div className="text-white/80 text-sm">
                  <span className="font-bold text-yellow-300">Limited</span>{" "}
                  seats available for APRIL intake
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
