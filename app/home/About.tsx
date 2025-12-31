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
} from "lucide-react";
import Image from "next/image";

const AboutAcademy = () => {
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

  return (
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
                  training, equipping students to become confident perfumers and
                  successful fragrance entrepreneurs.
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
                <div className="text-2xl md:text-3xl font-bold mb-1">100%</div>
                <div className="text-white/90 text-sm">Practical Training</div>
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
                <div className="text-xl font-bold text-[#691C33] mb-1">10+</div>
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
              your passion into a profitable career. Limited spots available for
              our next cohort.
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
                onClick={() => (window.location.href = "/curriculum")}
                className="bg-transparent border-2 border-white text-white px-6 py-4 rounded-full font-semibold text-base md:text-lg inline-flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
              >
                <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                <span>VIEW CURRICULUM</span>
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
  );
};

export default AboutAcademy;
