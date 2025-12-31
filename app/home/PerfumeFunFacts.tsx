// components/Sections/PerfumeFunFacts.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Flower,
  Brain,
  History,
  Beaker,
  Globe,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const PerfumeFunFacts = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const funFacts = [
    {
      id: 1,
      title: "The Rose's Secret",
      fact: "It takes approximately 10,000 hand-picked roses (about 60lbs) to produce just one ounce of pure rose otto essential oil, making it one of the most precious materials in perfumery.",
      icon: Flower,
      color: "#691C33",
      image: "/rose-fact.jpg",
    },
    {
      id: 2,
      title: "Scent & Memory",
      fact: "The sense of smell is directly wired to the brain's limbic system, the area responsible for emotion and memory. This is why a fragrance can instantly trigger a vivid memory, more powerfully than any other sense.",
      icon: Brain,
      color: "#691C33",
      image: "/brain-fact.jpg",
    },
    {
      id: 3,
      title: "Ancient Perfumers",
      fact: "The world's first recorded chemist was a woman named Tapputi, a Babylonian perfume-maker mentioned on a cuneiform tablet from 1200 BC. She used flowers, oils, and distillation techniques.",
      icon: History,
      color: "#691C33",
      image: "/ancient-fact.jpg",
    },
    {
      id: 4,
      title: "The 300-Step Rule",
      fact: "A professional 'nose' (perfumer) can distinguish and memorize over 3,000 different scent notes. Creating a single fragrance often involves blending 50-300 different ingredients.",
      icon: Beaker,
      color: "#691C33",
      image: "/beaker-fact.jpg",
    },
    {
      id: 5,
      title: "A Global Language",
      fact: "The term 'perfume' comes from the Latin 'per fumum,' meaning 'through smoke,' referring to the original use of burning incense. Every major civilization independently developed its own rich perfume traditions.",
      icon: Globe,
      color: "#691C33",
      image: "/globe-fact.jpg",
    },
  ];

  const goToNext = () => {
    setActiveIndex((prev) => (prev === funFacts.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? funFacts.length - 1 : prev - 1));
  };

  return (
    <section className="py-12 md:py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.09]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
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
              DID YOU KNOW?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 md:mb-6 ${italiana.className}`}
          >
            The Secret World of Scent
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-base md:text-xl text-[#691C33]/80 max-w-2xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Swipe to uncover fascinating, little-known facts about perfumes that
            will change how you think about fragrance forever.
          </motion.p>
        </motion.div>

        {/* Swipeable Card Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white p-2 md:p-3 rounded-full shadow-lg border border-[#691C33]/10"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-[#691C33]" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white p-2 md:p-3 rounded-full shadow-lg border border-[#691C33]/10"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-[#691C33]" />
          </button>

          {/* Main Card */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="cursor-grab active:cursor-grabbing"
          >
            <div className="bg-white rounded-xl md:rounded-3xl shadow-xl border border-[#691C33]/10 overflow-hidden flex flex-col lg:flex-row min-h-[400px] md:min-h-[500px]">
              {/* Image Side */}
              <div className="lg:w-2/5 relative h-48 md:h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#691C33]/10 to-[#8B2846]/10"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4">
                      {(() => {
                        const IconComponent = funFacts[activeIndex].icon;
                        return (
                          <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        );
                      })()}
                    </div>
                    <div className="text-white text-lg md:text-xl font-bold">
                      Fact #{funFacts[activeIndex].id}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:w-3/5 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                <div className="mb-3 md:mb-4">
                  <span
                    className={`text-xs md:text-sm font-bold tracking-wider ${gothamOffice.className}`}
                    style={{ color: funFacts[activeIndex].color }}
                  >
                    FUN FACT #{funFacts[activeIndex].id}
                  </span>
                </div>
                <h3
                  className={`text-xl md:text-3xl lg:text-4xl font-bold text-[#691C33] mb-3 md:mb-6 ${italiana.className}`}
                >
                  {funFacts[activeIndex].title}
                </h3>
                <p className="text-[#691C33] text-base md:text-xl leading-relaxed mb-6 md:mb-10">
                  {funFacts[activeIndex].fact}
                </p>

                {/* Progress Dots */}
                <div className="flex justify-center gap-2 md:gap-3 mt-auto">
                  {funFacts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? "w-6 md:w-8 bg-[#691C33]"
                          : "w-2 bg-[#691C33]/20"
                      }`}
                      aria-label={`Go to fact ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Mobile Navigation */}
                <div className="flex justify-between mt-4 md:hidden">
                  <button
                    onClick={goToPrev}
                    className="flex items-center gap-1 text-[#691C33] text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button
                    onClick={goToNext}
                    className="flex items-center gap-1 text-[#691C33] text-sm"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instruction Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-[#691C33]/50 mt-4 md:mt-8 text-sm md:text-base"
          >
            <span className="hidden md:inline">
              Click arrows or dots to explore more secrets
            </span>
            <span className="inline md:hidden">
              Tap arrows or dots to explore more
            </span>
          </motion.p>
        </div>

        {/* Additional Facts Grid for Mobile */}
        <div className="mt-8 md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {funFacts.slice(0, 4).map((fact, index) => (
              <motion.button
                key={fact.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveIndex(index)}
                className={`p-3 rounded-lg border ${
                  activeIndex === index
                    ? "border-[#691C33] bg-[#691C33]/5"
                    : "border-[#691C33]/10 bg-white hover:border-[#691C33]/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center ${
                      activeIndex === index
                        ? "bg-[#691C33] text-white"
                        : "bg-[#691C33]/10 text-[#691C33]"
                    }`}
                  >
                    {(() => {
                      const IconComponent = fact.icon;
                      return <IconComponent className="w-3 h-3" />;
                    })()}
                  </div>
                  <span className="text-xs font-bold text-[#691C33]">
                    {fact.title.split(" ")[0]}
                  </span>
                </div>
                <p className="text-[#691C33]/70 text-xs line-clamp-2">
                  {fact.fact.split(".")[0]}.
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfumeFunFacts;
