// components/Sections/Founder.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Quote,
  Award,
  Star,
  Target,
  Users,
  Palette,
  Beaker,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const Founder = () => {
  return (
    <section
      id="founder"
      className="py-16 md:py-24 pb-28 md:pb-36 relative overflow-hidden"
    >
      {/* Solid Color Background */}
      <div className="absolute inset-0 bg-[#691C33]"></div>

      {/* Pattern Background - Visible on all screens */}
      <div
        className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat"
        style={{ opacity: 0.15 }}
      ></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1 mb-12 md:mb-16 lg:mb-0"
          >
            {/* Main Image Container */}
            <div className="relative w-full max-w-md mx-auto lg:max-w-none lg:mx-0 aspect-square rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={"/ramatu.jpeg"}
                alt="Founder - Ramatu Shehu"
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#691C33]/50 via-transparent to-transparent" />

              {/* Image Badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white px-4 py-2 md:px-5 md:py-3 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-[#691C33]" />
                  <span className="font-bold text-[#691C33] text-sm md:text-base">
                    Founder & Master Perfumer
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-20 -right-2 md:-bottom-20 md:-right-4 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-2xl max-w-[90%] md:max-w-xs border-l-4 border-[#691C33]"
            >
              <Quote className="w-6 h-6 md:w-8 md:h-8 text-[#691C33] mb-2 md:mb-3" />
              <p
                className={`text-[#691C33] text-sm md:text-base italic ${gothamOffice.className} mb-2 md:mb-3`}
              >
                "Perfume is identity made visible."
              </p>
              <div className="h-px w-8 md:w-12 bg-[#691C33] mb-1 md:mb-2"></div>
              <p className="font-bold text-[#691C33] text-base md:text-lg">
                Ramatu Shehu
              </p>
              <p className="text-[#691C33]/70 text-xs md:text-sm">
                Founder, The House of Tutu
              </p>
            </motion.div>
          </motion.div>

          {/* Founder Story */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 space-y-6 md:space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 md:py-3 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-[#691C33] rounded-full"></div>
              <span
                className={`text-[#691C33] font-semibold tracking-wider text-xs md:text-sm ${gothamOffice.className}`}
              >
                MEET THE FOUNDER
              </span>
            </div>

            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-black text-white mt-2 mb-4 leading-tight ${italiana.className}`}
            >
              The Visionary Behind{" "}
              <span className="text-white/95">The House of Tutu</span>
            </h2>

            {/* Founder Bio */}
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-md">
                <p
                  className={`text-[#691C33] text-base md:text-lg ${gothamOffice.className} leading-relaxed`}
                >
                  With over{" "}
                  <strong className="text-[#691C33] font-bold">13 years</strong>{" "}
                  in the luxury fragrance industry, Ramatu Shehu has dedicated
                  her career to{" "}
                  <strong className="text-[#691C33] font-bold">
                    demystifying perfumery
                  </strong>
                  and making it accessible to aspiring entrepreneurs.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-md">
                <p
                  className={`text-[#691C33] text-base md:text-lg ${gothamOffice.className} leading-relaxed`}
                >
                  She created The House of Tutu to teach the{" "}
                  <strong className="text-[#691C33] font-bold">
                    art of fragrance creation
                  </strong>
                  , the{" "}
                  <strong className="text-[#691C33] font-bold">
                    science of perfumery
                  </strong>
                  , and the{" "}
                  <strong className="text-[#691C33] font-bold">
                    business of building a successful brand
                  </strong>
                  .
                </p>
              </div>
            </div>

            {/* Stats - Mobile Responsive */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {[
                { number: "13+", label: "Years Experience", icon: Star },
                { number: "20+", label: "Students Trained", icon: Users },
                { number: "10+", label: "Global Partners", icon: Target },
                { number: "7", label: "Industry Awards", icon: Award },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className={`text-center p-3 md:p-4 rounded-lg md:rounded-xl shadow-md ${
                    index % 2 === 0 ? "bg-white" : "bg-[#8B2846]"
                  } hover:shadow-lg transition-shadow`}
                >
                  <div className="flex justify-center mb-2 md:mb-3">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                        index % 2 === 0 ? "bg-[#691C33]/10" : "bg-white/20"
                      }`}
                    >
                      <stat.icon
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          index % 2 === 0 ? "text-[#691C33]" : "text-white"
                        }`}
                      />
                    </div>
                  </div>
                  <div
                    className={`text-xl md:text-2xl lg:text-3xl font-bold mb-1 ${
                      index % 2 === 0 ? "text-[#691C33]" : "text-white"
                    } ${gothamOffice.className}`}
                  >
                    {stat.number}
                  </div>
                  <div
                    className={`font-medium text-xs md:text-sm ${
                      index % 2 === 0 ? "text-[#691C33]/80" : "text-white/90"
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Philosophy Section */}
            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 shadow-lg">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="w-2 h-6 md:h-8 bg-[#691C33] rounded-full"></div>
                  <h3
                    className={`text-xl md:text-2xl font-bold text-[#691C33] ${gothamOffice.className}`}
                  >
                    Our Core Philosophy
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  {[
                    {
                      title: "Art",
                      desc: "Master the creative expression of scent composition",
                      icon: Palette,
                      bg: "bg-[#691C33]",
                    },
                    {
                      title: "Science",
                      desc: "Learn precise formulation techniques for quality",
                      icon: Beaker,
                      bg: "bg-white",
                      border: "border-2 border-[#691C33]",
                    },
                    {
                      title: "Business",
                      desc: "Build profitable and sustainable fragrance brands",
                      icon: TrendingUp,
                      bg: "bg-[#691C33]",
                    },
                  ].map((item, index) => (
                    <div key={item.title} className="text-center group">
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${
                          item.bg
                        } ${
                          item.border || ""
                        } flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md group-hover:scale-105 transition-transform`}
                      >
                        <item.icon
                          className={`w-8 h-8 md:w-10 md:h-10 ${
                            item.bg === "bg-white"
                              ? "text-[#691C33]"
                              : "text-white"
                          }`}
                        />
                      </div>
                      <h4
                        className={`font-bold text-base md:text-lg mb-2 text-[#691C33]`}
                      >
                        {item.title}
                      </h4>
                      <p className={`text-xs md:text-sm text-[#691C33]/80`}>
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-5 md:pt-6 border-t border-[#691C33]/20">
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
                  {[
                    "100% Practical Training",
                    "Industry Certified",
                    "Business Focused",
                    "24/7 Support",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 bg-[#691C33]/5 px-3 py-2 rounded-lg flex-1 min-w-[150px]"
                    >
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#691C33] flex-shrink-0" />
                      <span className="text-[#691C33] text-xs md:text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info - Mobile Only */}
            <div className="lg:hidden mt-6 bg-[#8B2846] rounded-xl p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg md:text-xl font-bold text-white mb-1">
                    100%
                  </div>
                  <div className="text-white/80 text-xs md:text-sm">
                    Practical
                  </div>
                </div>
                <div className="border-x border-white/20 px-4">
                  <div className="text-lg md:text-xl font-bold text-white mb-1">
                    24/7
                  </div>
                  <div className="text-white/80 text-xs md:text-sm">
                    Support
                  </div>
                </div>
                <div>
                  <div className="text-lg md:text-xl font-bold text-white mb-1">
                    ₦500K
                  </div>
                  <div className="text-white/80 text-xs md:text-sm">
                    Starting
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
