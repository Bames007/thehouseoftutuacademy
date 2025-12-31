// components/Sections/EnrollmentProcess.tsx
"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  FileText,
  CreditCard,
  Mail,
  Users,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Calendar,
  Target,
} from "lucide-react";

const EnrollmentProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Request Enrollment Form",
      description: "Complete our detailed application form",
      icon: FileText,
      color: "#691C33",
    },
    {
      number: "02",
      title: "Make Payment",
      description: "Secure your seat with tuition payment",
      icon: CreditCard,
      color: "#691C33",
    },
    {
      number: "03",
      title: "Receive Welcome Pack",
      description: "Get your student materials and access",
      icon: Mail,
      color: "#691C33",
    },
    {
      number: "04",
      title: "Join Class Group",
      description: "Connect with peers and instructors",
      icon: Users,
      color: "#691C33",
    },
    {
      number: "05",
      title: "Begin Transformation",
      description: "Start your fragrance business journey",
      icon: CheckCircle,
      color: "#691C33",
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Next Intake",
      description: "27th April 2026",
      highlight: true,
    },
    {
      icon: Target,
      title: "Seats Available",
      description: "Only 15 remaining",
      highlight: true,
    },
    {
      icon: Clock,
      title: "Course Duration",
      description: "2 Weeks Intensive",
    },
  ];

  return (
    <section
      id="enroll"
      className="py-12 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white"></div>
      <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.09]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#691C33]/5 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#691C33]" />
            <span
              className={`text-xs md:text-sm font-semibold text-[#691C33] tracking-wider ${gothamOffice.className}`}
            >
              SIMPLE ENROLLMENT PROCESS
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-4 md:mb-6 ${italiana.className}`}
          >
            Begin Your Journey in 5 Steps
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-base md:text-xl text-[#691C33]/80 max-w-3xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            From application to transformation – a seamless process designed for
            aspiring fragrance entrepreneurs.
          </motion.p>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`p-4 md:p-6 rounded-xl md:rounded-2xl border ${
                feature.highlight
                  ? "border-[#691C33] bg-gradient-to-r from-[#691C33]/5 to-[#8B2846]/5"
                  : "border-[#691C33]/10 bg-white"
              } shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${
                    feature.highlight
                      ? "bg-[#691C33] text-white"
                      : "bg-[#691C33]/10 text-[#691C33]"
                  }`}
                >
                  <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h4
                    className={`font-bold text-[#691C33] text-base md:text-lg ${gothamOffice.className}`}
                  >
                    {feature.title}
                  </h4>
                  <p
                    className={`text-sm md:text-base ${
                      feature.highlight
                        ? "text-[#691C33] font-semibold"
                        : "text-[#691C33]/70"
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#691C33] via-[#691C33]/20 to-[#691C33] transform -translate-x-1/2 hidden lg:block" />

          {/* Steps */}
          <div className="space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Step Content */}
                <div
                  className={`lg:w-1/2 ${
                    index % 2 === 0 ? "lg:pr-8 xl:pr-12" : "lg:pl-8 xl:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(105, 28, 51, 0.15)",
                    }}
                    className="bg-white p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg border border-[#691C33]/10 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4 mb-4 md:mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, type: "spring" }}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white text-lg md:text-xl font-bold shadow-lg flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      >
                        {step.number}
                      </motion.div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <step.icon
                            className="w-5 h-5 md:w-6 md:h-6"
                            style={{ color: step.color }}
                          />
                          <h3
                            className={`text-lg md:text-xl lg:text-2xl font-bold text-[#691C33] ${gothamOffice.className}`}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-[#691C33]/70 text-sm md:text-base">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Mobile only arrow */}
                    {index < steps.length - 1 && (
                      <div className="flex justify-center lg:hidden mt-4">
                        <ArrowRight className="w-5 h-5 text-[#691C33]/30" />
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Step Indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-4 border-[#691C33] z-10 hidden lg:block shadow-lg"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-[#691C33] to-[#8B2846] rounded-xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-white max-w-4xl mx-auto relative overflow-hidden">
            {/* Pattern Background */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat opacity-[0.1]"></div>

            <div className="relative z-10">
              <h3
                className={`text-xl md:text-4xl font-bold mb-4 md:mb-6 ${italiana.className}`}
              >
                Ready to Create Your Fragrance Empire?
              </h3>
              <p className="text-white/80 text-sm md:text-xl mb-6 md:mb-10 max-w-2xl mx-auto">
                Join the next cohort of fragrance entrepreneurs and transform
                your passion into profit
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-6 md:mb-10">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#691C33] px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-full font-bold text-sm md:text-lg flex items-center justify-center gap-2 md:gap-3 w-full sm:w-auto"
                >
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  <span>ENROLL FOR APRIL INTAKE</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white text-white px-6 md:px-10 py-3 md:py-4 rounded-lg md:rounded-full font-bold text-sm md:text-lg hover:bg-white/10 transition-colors w-full sm:w-auto"
                >
                  DOWNLOAD BROCHURE
                </motion.button>
              </div>

              {/* Limited Seats Notice */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-300 animate-pulse" />
                  <p className="text-white/90 text-xs md:text-sm">
                    Only 15 seats remaining for APRIL 2026 intake
                  </p>
                </div>
                <div className="hidden sm:block h-4 w-px bg-white/30" />
                <p className="text-white/80 text-xs md:text-sm">
                  Class starts on{" "}
                  <span className="font-bold">27TH APRIL, 2026</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnrollmentProcess;
