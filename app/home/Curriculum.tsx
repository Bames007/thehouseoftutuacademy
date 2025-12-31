// components/Sections/Curriculum.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  CheckCircle,
  BookOpen,
  Target,
  BarChart,
  Package,
  Rocket,
  Globe,
  Award,
  Users,
  Clock,
  Mail,
  Sparkles,
} from "lucide-react";

const Curriculum = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const modules = [
    {
      title: "Understanding Fragrance Oil Grades",
      description: "Master A, B, C grades, diffuser, and burning oils",
      icon: BookOpen,
    },
    {
      title: "Top, Middle & Base Notes",
      description: "Simplified explanation of fragrance composition",
      icon: Target,
    },
    {
      title: "Product Development",
      description: "From concept to finished fragrance product",
      icon: Package,
    },
    {
      title: "Branding & Packaging",
      description: "Create luxury brand identity and packaging",
      icon: Rocket,
    },
    {
      title: "Supplier Sourcing",
      description: "Local and international supplier networks",
      icon: Globe,
    },
    {
      title: "Pricing & Profit",
      description: "Costing strategies and profit calculation",
      icon: BarChart,
    },
  ];

  return (
    <section
      id="curriculum"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background Pattern - Subtle */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.05]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header - Static without hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 md:py-3 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#691C33] rounded-full"></div>
            <span
              className={`text-[#691C33] font-semibold tracking-wider text-xs md:text-sm ${gothamOffice.className}`}
            >
              CURRICULUM OVERVIEW
            </span>
          </div>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-black text-[#691C33] mt-2 mb-4 leading-tight ${italiana.className}`}
          >
            What You Will Learn
          </h2>
          <p
            className={`text-[#691C33]/80 text-base md:text-lg max-w-2xl mx-auto ${gothamOffice.className} leading-relaxed`}
          >
            A comprehensive curriculum designed to transform you into a
            professional fragrance entrepreneur
          </p>
        </motion.div>

        {/* Modules Grid with Hover Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {modules.map((module, index) => (
            <div
              key={module.title}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container with Conditional Background */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-xl md:rounded-2xl p-5 md:p-6 border shadow-sm transition-all duration-300 h-full overflow-hidden ${
                  hoveredCard === index
                    ? "bg-[#691C33] border-transparent"
                    : "bg-white border-[#691C33]/10"
                }`}
              >
                {/* Pattern Overlay - Only shows on hover */}
                <div
                  className={`absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
                    hoveredCard === index ? "opacity-20" : "opacity-0"
                  }`}
                  style={{ filter: "brightness(0) invert(1)" }}
                ></div>

                {/* Module Icon */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 relative z-10 ${
                    hoveredCard === index
                      ? "bg-white"
                      : index % 2 === 0
                      ? "bg-[#691C33]"
                      : "bg-white border-2 border-[#691C33]"
                  }`}
                >
                  <module.icon
                    className={`w-6 h-6 md:w-7 md:h-7 ${
                      hoveredCard === index
                        ? "text-[#691C33]"
                        : index % 2 === 0
                        ? "text-white"
                        : "text-[#691C33]"
                    }`}
                  />
                </div>

                {/* Module Title */}
                <h3
                  className={`text-lg md:text-xl font-bold mb-2 md:mb-3 relative z-10 ${
                    hoveredCard === index ? "text-white" : "text-[#691C33]"
                  } ${gothamOffice.className}`}
                >
                  {module.title}
                </h3>

                {/* Module Description */}
                <p
                  className={`text-sm md:text-base mb-4 md:mb-6 relative z-10 ${
                    hoveredCard === index
                      ? "text-white/90"
                      : "text-[#691C33]/70"
                  }`}
                >
                  {module.description}
                </p>

                {/* Included Badge */}
                <div
                  className={`flex items-center gap-2 relative z-10 ${
                    hoveredCard === index ? "text-white" : "text-[#691C33]"
                  }`}
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="font-medium text-sm md:text-base">
                    Included
                  </span>
                </div>

                {/* Hover Sparkle Effect */}
                {hoveredCard === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Included Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 bg-white rounded-xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-[#691C33]/10 shadow-xl relative overflow-hidden"
        >
          {/* Pattern Background for Features */}
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.05]"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-2 h-6 md:h-8 bg-[#691C33] rounded-full"></div>
              <h3
                className={`text-xl md:text-2xl lg:text-3xl font-bold text-[#691C33] ${italiana.className}`}
              >
                What's Included in Your Journey
              </h3>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  text: "Student Handbook & Workbook",
                  icon: BookOpen,
                },
                {
                  text: "Academy Calendar & Assignments",
                  icon: Clock,
                },
                {
                  text: "Certificate of Completion",
                  icon: Award,
                },
                {
                  text: "Direct Instructor Support",
                  icon: Users,
                },
                {
                  text: "WhatsApp Class Group",
                  icon: Mail,
                },
                {
                  text: "Supplier Contact List",
                  icon: Globe,
                },
                {
                  text: "Branding Templates",
                  icon: Package,
                },
                {
                  text: "Final Real-World Project",
                  icon: Rocket,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 bg-[#691C33]/5 rounded-lg p-3 md:p-4 hover:bg-[#691C33]/10 transition-all duration-300 cursor-pointer group"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#691C33] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B2846] transition-colors duration-300"
                  >
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </motion.div>
                  <span className="text-[#691C33] text-sm md:text-base font-medium group-hover:text-[#8B2846] transition-colors duration-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Course Info Cards */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#691C33]/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {[
                  {
                    title: "Course Duration",
                    value: "2 Weeks",
                    icon: Clock,
                    desc: "Intensive & Accelerated",
                    highlight: true,
                  },
                  {
                    title: "Format",
                    value: "Hybrid",
                    icon: Globe,
                    desc: "Online & Practical Sessions",
                  },
                  {
                    title: "Support",
                    value: "Lifetime Access",
                    icon: Users,
                    desc: "Community & Resources",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -5 }}
                    className={`bg-white rounded-xl p-4 text-center border-2 ${
                      item.highlight
                        ? "border-[#691C33] shadow-lg"
                        : "border-[#691C33]/20"
                    } hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#691C33] flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-[#691C33] mb-1">
                      {item.value}
                    </div>
                    <div className="font-medium text-[#691C33] text-sm">
                      {item.title}
                    </div>
                    <div className="text-[#691C33]/70 text-xs mt-1">
                      {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 md:mt-12 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#691C33] to-[#8B2846] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => (window.location.href = "/enrollment")}
                  className="relative bg-gradient-to-r from-[#691C33] to-[#8B2846] text-white px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg inline-flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                  <span>VIEW FULL CURRICULUM</span>
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
              </motion.div>
              <p className="text-[#691C33]/70 text-sm md:text-base mt-4">
                Limited spots available for our next cohort
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Stats - Enhanced */}
        <div className="mt-8 md:hidden bg-gradient-to-r from-[#691C33] to-[#8B2846] text-white rounded-xl p-5 shadow-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 rounded-lg p-3"
            >
              <div className="text-2xl font-bold mb-1">2</div>
              <div className="text-white/90 text-xs">Weeks</div>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 rounded-lg p-3 border-x border-white/20"
            >
              <div className="text-2xl font-bold mb-1">100%</div>
              <div className="text-white/90 text-xs">Practical</div>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 rounded-lg p-3"
            >
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-white/90 text-xs">Support</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
