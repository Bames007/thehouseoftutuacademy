// components/Sections/FAQ.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  ChevronDown,
  HelpCircle,
  Clock,
  DollarSign,
  Users,
  BookOpen,
  Mail,
  Phone,
  FileText,
  Calendar,
  Shield,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need prior experience in perfumery?",
      answer:
        "No prior experience needed! Our curriculum is designed for complete beginners. We start from the absolute basics and guide you step-by-step to professional level.",
      category: "requirements",
      icon: HelpCircle,
    },
    {
      question: "What's included in the tuition fee?",
      answer:
        "Tuition includes: Student Handbook & Workbook, Academy Calendar, All Course Materials, Assignments & Projects, Certificate of Completion, WhatsApp Group Access, Direct Instructor Support, and Lifetime Access to Course Updates.",
      category: "tuition",
      icon: DollarSign,
    },
    {
      question: "How long is the program?",
      answer:
        "The Commercial Perfumery Masterclass is 1 month intensive. Classes are held 3 times a week (2 hours each). The Full Academy Package (all 4 levels) is 6 months comprehensive training.",
      category: "duration",
      icon: Clock,
    },
    {
      question: "What's the difference between in-class and online?",
      answer:
        "In-Class (₦650,000): Physical learning in Lagos with hands-on demonstrations and direct interaction. Online (₦500,000): Live Zoom classes from anywhere, same curriculum, interactive sessions, assignments, and certificate.",
      category: "format",
      icon: Users,
    },
    {
      question: "Will I learn business aspects or just perfumery?",
      answer:
        "We focus 60% on business, 40% on perfumery. You'll learn branding, packaging, supplier sourcing, pricing strategies, marketing, and launch planning - everything needed to run a successful fragrance business.",
      category: "curriculum",
      icon: BookOpen,
    },
    {
      question: "What is your refund policy?",
      answer:
        "All payments are considered final. However, we offer tiered refunds before the program starts: 70% refund if requested 7+ days before class, 50% refund if requested 3-6 days before, and no refund within 48 hours of start date. Once the program begins, no refunds are issued except in documented medical emergencies where partial credit may be offered toward a future batch.",
      category: "refunds",
      icon: Shield,
    },
    {
      question: "Do you provide supplier contacts?",
      answer:
        "Yes! We provide verified supplier lists (local and international), wholesale pricing contacts, packaging manufacturers, and ongoing supplier recommendations throughout your business journey.",
      category: "support",
      icon: HelpCircle,
    },
    {
      question: "What payment options are available?",
      answer:
        "We accept bank transfers, card payments, and payment plans. For the ₦500,000 online course, you can pay ₦250,000 upfront and ₦250,000 after 2 weeks. Contact us for custom payment plans. Note: Failure to complete payment plan installments results in suspension with no refund for previous payments.",
      category: "payments",
      icon: DollarSign,
    },
    {
      question: "What happens if I miss classes?",
      answer:
        "Non-attendance does not qualify for a refund. However, we provide recorded sessions for online students and support materials to catch up. It's the student's responsibility to manage their schedule.",
      category: "refunds",
      icon: Calendar,
    },
    {
      question: "How do I request a refund?",
      answer:
        "Send a written request to academy@thehouseoftutu.com with your full name, proof of payment, and reason. Refunds are processed in 7-14 business days and issued back through the original payment method. Please review our complete Refund Policy before enrolling.",
      category: "refunds",
      icon: FileText,
    },
    {
      question: "What if I have a medical emergency?",
      answer:
        "In documented medical emergencies, accidents, or severe personal circumstances, we may offer a partial credit (not refund) toward a future batch. Credit amount is determined by Academy management and requires proper documentation.",
      category: "refunds",
      icon: AlertCircle,
    },
    {
      question: "What happens if I'm dismissed from the program?",
      answer:
        "Students removed due to misconduct, rule violations, or non-compliance will not receive any refund or credit. We maintain a professional learning environment for all participants.",
      category: "policies",
      icon: Shield,
    },
  ];

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "requirements", label: "Requirements" },
    { id: "tuition", label: "Tuition & Fees" },
    { id: "refunds", label: "Refunds & Policies" },
    { id: "curriculum", label: "Curriculum" },
    { id: "support", label: "Support" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section id="faq" className="py-16 md:py-24 relative overflow-hidden">
      {/* Solid Primary Color Background */}
      <div className="absolute inset-0 bg-[#691C33]"></div>

      {/* Pattern Background */}
      <div
        className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat"
        style={{ opacity: 0.1 }}
      ></div>

      {/* Logo Watermark */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo-white.png"
            alt="The House of Tutu Logo"
            width={600}
            height={600}
            className="w-full max-w-4xl h-auto object-contain"
            priority
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span
            className={`text-white/90 font-semibold tracking-wider text-xs md:text-sm ${gothamOffice.className}`}
          >
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2
            className={`text-3xl md:text-5xl lg:text-6xl font-black text-white mt-3 md:mt-4 mb-4 md:mb-6 ${italiana.className}`}
          >
            Get Clear Answers
          </h2>
          <p
            className={`text-base md:text-xl text-white/80 max-w-3xl mx-auto px-4 ${gothamOffice.className} font-light`}
          >
            Everything you need to know about our programs, payments, and
            policies. Can't find your answer? Contact us directly.
          </p>
        </motion.div>

        {/* Important Notice - Refund Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12 max-w-4xl mx-auto px-4"
        >
          <div className="bg-white/10 backdrop-blur-sm border-l-4 border-white/30 rounded-r-xl p-4 md:p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white text-lg md:text-xl font-bold mb-2">
                  Important: Refund Policy Notice
                </h3>
                <p className="text-white/90 text-sm md:text-base">
                  By enrolling and submitting payment, you acknowledge that you
                  have read, understood, and agree to our Refund Policy. All
                  payments are non-transferable and considered final except
                  under specific pre-program conditions.
                </p>
                <button className="mt-3 text-white text-sm md:text-base font-semibold hover:underline flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Full Refund Policy
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium transition-all text-sm md:text-base ${
                activeCategory === category.id
                  ? "bg-white text-[#691C33] shadow-lg"
                  : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto px-2 sm:px-4">
          <div className="space-y-3 md:space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg border border-[#691C33]/20"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full p-4 md:p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start md:items-center space-x-3 md:space-x-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#691C33]/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <faq.icon className="w-4 h-4 md:w-5 md:h-5 text-[#691C33]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-semibold text-[#691C33] text-left">
                        {faq.question}
                      </h3>
                      <div className="text-xs md:text-sm text-[#691C33]/70 mt-1 capitalize">
                        {faq.category === "refunds"
                          ? "Refunds & Policies"
                          : faq.category}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2 md:ml-4 flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-[#691C33]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t border-[#691C33]/10">
                        <p className="text-[#691C33]/90 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Refund Policy Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 max-w-4xl mx-auto px-4"
        >
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-[#691C33]/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-[#691C33]" />
              <h3 className="text-xl md:text-2xl font-bold text-[#691C33]">
                Refund Policy Summary
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-[#691C33] text-lg">
                  Before Program Starts
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-700 font-bold">70%</span>
                    </div>
                    <span className="text-[#691C33]/90">
                      7+ days before start date
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className="text-yellow-700 font-bold">50%</span>
                    </div>
                    <span className="text-[#691C33]/90">
                      3-6 days before start date
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-700 font-bold">0%</span>
                    </div>
                    <span className="text-[#691C33]/90">
                      Within 48 hours of start date
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-[#691C33] text-lg">
                  After Program Starts
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-red-700" />
                    </div>
                    <span className="text-[#691C33]/90">No refunds issued</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-blue-700" />
                    </div>
                    <span className="text-[#691C33]/90">
                      Medical emergencies may qualify for credit
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-gray-700" />
                    </div>
                    <span className="text-[#691C33]/90">
                      Non-attendance doesn't qualify for refund
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#691C33]/20">
              <p className="text-[#691C33]/70 text-sm md:text-base text-center">
                <strong>Note:</strong> All payments are non-transferable. By
                enrolling, you acknowledge and agree to this policy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20 px-2 sm:px-4"
        >
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-[#691C33] shadow-2xl border border-[#691C33]/20">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3
                  className={`text-2xl md:text-3xl font-bold mb-4 md:mb-6 ${italiana.className}`}
                >
                  Need Clarification?
                </h3>
                <p className="text-[#691C33]/80 mb-6 md:mb-8 text-sm md:text-base">
                  Our admissions team is ready to clarify any questions about
                  our policies, programs, or payment options before you enroll.
                </p>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-[#691C33]" />
                    <div>
                      <div className="font-medium">
                        Email for Refund Inquiries
                      </div>
                      <div className="text-[#691C33]/80">
                        academy@thehouseoftutu.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-[#691C33]" />
                    <div>
                      <div className="font-medium">
                        Call for Policy Clarification
                      </div>
                      <div className="text-[#691C33]/80">+234 911 264 4027</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#691C33] text-white rounded-xl md:rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-bold mb-4">Schedule a Call</h4>
                <p className="text-white/80 mb-6 text-sm md:text-base">
                  Book a 15-minute consultation call with our admissions team to
                  discuss any questions about our refund policy or program
                  details
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-[#691C33] py-3 rounded-xl font-semibold text-base hover:shadow-lg transition-shadow"
                >
                  Book Policy Consultation
                </motion.button>
                <p className="text-white/60 text-xs mt-3 text-center">
                  Available Monday - Saturday, 9AM - 6PM WAT
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
