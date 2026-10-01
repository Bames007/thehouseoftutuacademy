// components/Sections/EnrollmentProcess.tsx
"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  FileText,
  Phone,
  Mail,
  Users,
  CheckCircle,
  Clock,
  ArrowRight,
  Calendar,
  GraduationCap,
  Sparkle,
} from "lucide-react";

const EnrollmentProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Fill the Enrollment Form",
      description:
        "Complete the 5-step application in under 3 minutes — personal details, program choice, background, payment, and signature.",
      icon: FileText,
    },
    {
      number: "02",
      title: "Pick Your Program",
      description:
        "Choose from Art of Perfumery (6 Weeks or 12 Weeks) or Commercial Perfumery (2 Weeks). Registration is always free.",
      icon: GraduationCap,
    },
    {
      number: "03",
      title: "Confirm Payment by Phone",
      description:
        "Call our admissions team to complete your course payment. They'll guide you through the transfer and verify it instantly.",
      icon: Phone,
    },
    {
      number: "04",
      title: "Receive Welcome Pack",
      description:
        "Get your student workbook, class calendar, WhatsApp group access, and instructor contacts by email.",
      icon: Mail,
    },
    {
      number: "05",
      title: "Start Your Transformation",
      description:
        "Attend orientation, meet your cohort, and begin building your fragrance journey.",
      icon: CheckCircle,
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Next Intake",
      description: "October 6th, 2026",
      highlight: true,
    },
    {
      icon: Users,
      title: "Seats Available",
      description: "15 spots remaining",
      highlight: true,
    },
    {
      icon: Clock,
      title: "Enrollment Time",
      description: "Under 3 minutes",
      highlight: false,
    },
  ];

  return (
    <section
      id="enroll"
      className="relative overflow-hidden py-14 md:py-24"
      style={{ backgroundColor: "#ffffff" }}
    >
      {/* Section-level pattern */}
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
              HOW TO ENROLL
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 leading-tight ${italiana.className}`}
          >
            Begin in 5 Simple Steps
          </h2>

          <p
            className={`text-base md:text-lg text-[#691C33] max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            From application to your first class — a clear, simple process built
            for aspiring fragrance entrepreneurs. No registration fees.
          </p>
        </motion.div>

        {/* Feature Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5 mb-10 md:mb-16"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`rounded-2xl p-4 md:p-5 border-2 flex items-center gap-3 md:gap-4 ${
                  feature.highlight
                    ? "bg-[#691C33] border-[#691C33]"
                    : "bg-white border-[#691C33]/15"
                }`}
              >
                <div
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    feature.highlight ? "bg-white/15" : "bg-[#691C33]/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 md:w-6 md:h-6 ${
                      feature.highlight ? "text-white" : "text-[#691C33]"
                    }`}
                  />
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-wider mb-0.5 ${
                      feature.highlight ? "text-white/70" : "text-[#691C33]/60"
                    }`}
                  >
                    {feature.title}
                  </div>
                  <div
                    className={`text-sm md:text-base font-bold ${
                      feature.highlight ? "text-white" : "text-[#691C33]"
                    }`}
                  >
                    {feature.description}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative mb-12 md:mb-20">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#691C33]/15 -translate-x-1/2" />

          <div className="space-y-5 md:space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`w-full lg:w-1/2 ${
                      isEven ? "lg:pr-8 xl:pr-14" : "lg:pl-8 xl:pl-14"
                    }`}
                  >
                    <div className="bg-white rounded-2xl border-2 border-[#691C33]/10 hover:border-[#691C33]/30 shadow-md hover:shadow-lg transition-all p-4 md:p-6 lg:p-7">
                      <div className="flex items-start gap-3 md:gap-4">
                        {/* Number tile */}
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#691C33] flex items-center justify-center flex-shrink-0">
                          <span
                            className={`text-white text-sm md:text-base font-bold ${gothamOffice.className}`}
                          >
                            {step.number}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                            <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#691C33] flex-shrink-0" />
                            <h3
                              className={`text-base md:text-lg lg:text-xl font-bold text-[#691C33] leading-snug ${gothamOffice.className}`}
                            >
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm md:text-base text-[#691C33] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Mobile arrow between steps */}
                      {index < steps.length - 1 && (
                        <div className="flex justify-center lg:hidden mt-4">
                          <ArrowRight className="w-4 h-4 text-[#691C33]/25 rotate-90" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 border-[#691C33] z-10" />

                  {/* Spacer for the other half on desktop */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-[#691C33] p-6 md:p-10 lg:p-12">
            {/* White pattern overlay */}
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
                Ready to Create Your Fragrance Empire?
              </h3>

              <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed">
                Join the next cohort of fragrance entrepreneurs and turn your
                passion into profit. Registration is free — pay only your course
                fee.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8">
                <button
                  onClick={() => (window.location.href = "/enrollment")}
                  className="w-full sm:w-auto bg-white text-[#691C33] px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold text-sm md:text-base flex items-center justify-center gap-2 hover:bg-white/95 transition-colors"
                >
                  <span>START ENROLLMENT</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <button className="w-full sm:w-auto border-2 border-white/40 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold text-sm md:text-base hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  <span>CALL ADMISSIONS</span>
                </button>
              </div>

              {/* Trust strip */}
              <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-xs md:text-sm font-medium">
                    15 seats remaining for October 2026
                  </span>
                </div>

                <div className="hidden sm:block h-4 w-px bg-white/30" />

                <div className="text-white/90 text-xs md:text-sm">
                  Class starts{" "}
                  <span className="font-bold text-white">October 6, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnrollmentProcess;
