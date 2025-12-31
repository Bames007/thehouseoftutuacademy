"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
    preferredDate: "",
  });

  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const floatingCircles = [
    { id: 0, left: "5%", top: "10%", delay: 0, size: "w-4 h-4 md:w-8 md:h-8" },
    {
      id: 1,
      left: "90%",
      top: "15%",
      delay: 0.5,
      size: "w-6 h-6 md:w-10 md:h-10",
    },
    { id: 2, left: "15%", top: "85%", delay: 1, size: "w-5 h-5 md:w-9 md:h-9" },
    {
      id: 3,
      left: "85%",
      top: "75%",
      delay: 1.5,
      size: "w-7 h-7 md:w-11 md:h-11",
    },
  ];

  const programs = [
    "Commercial Perfumery Masterclass",
    "Level 1: Foundation",
    "Level 2: Intermediate",
    "Level 3: Advanced",
    "Level 4: Diploma",
    "Full Academy Package",
  ];

  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/houseoftutu",
      color: "hover:bg-pink-500/20",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/houseoftutu",
      color: "hover:bg-blue-500/20",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com/houseoftutu",
      color: "hover:bg-blue-700/20",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/company/houseoftutu",
      color: "hover:bg-blue-600/20",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "https://youtube.com/@houseoftutu",
      color: "hover:bg-red-600/20",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Thank you! We'll contact you within 24 hours.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        program: "",
        message: "",
        preferredDate: "",
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="relative py-8 sm:py-12 md:py-20 bg-white overflow-hidden"
    >
      {/* Background Pattern - Mobile Optimized */}
      <div className="absolute inset-0 opacity-[0.03] sm:opacity-5">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat scale-150 sm:scale-100" />
      </div>

      {/* Logo Watermark - Responsive */}
      <div className="absolute inset-0 opacity-[0.02] sm:opacity-5 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo-white.png"
            alt="The House of Tutu Logo"
            width={400}
            height={400}
            className="w-3/4 max-w-[300px] md:max-w-4xl h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Floating Elements - Mobile Optimized */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isClient &&
          floatingCircles.map((circle) => (
            <motion.div
              key={circle.id}
              animate={{
                x: [0, Math.cos(circle.id) * 15, 0],
                y: [0, Math.sin(circle.id) * 15, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: Math.random() * 15 + 15,
                repeat: Infinity,
                ease: "linear",
                delay: circle.delay,
              }}
              className={`absolute ${circle.size} border border-[#691C33]/10 rounded-full hidden sm:block`}
              style={{
                left: circle.left,
                top: circle.top,
              }}
            />
          ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-2"
        >
          <div className="inline-flex items-center gap-2 bg-[#691C33]/10 px-3 py-1 rounded-full mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#691C33] animate-pulse" />
            <span
              className={`text-xs font-semibold text-[#691C33] tracking-wide ${gothamOffice.className}`}
            >
              GET IN TOUCH
            </span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[#691C33] mb-3 sm:mb-4 md:mb-6 leading-tight ${italiana.className}`}
          >
            Start Your
            <br className="sm:hidden" /> Fragrance Journey
          </h2>
          <p
            className={`text-sm sm:text-base md:text-xl text-[#691C33]/80 max-w-2xl mx-auto ${gothamOffice.className} font-light leading-relaxed`}
          >
            Contact us for personalized guidance on choosing the right program
            for your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Form - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl border border-[#691C33]/10 p-4 sm:p-6 md:p-8"
          >
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-bold text-[#691C33] mb-4 sm:mb-6 md:mb-8 ${gothamOffice.className}`}
            >
              Request Enrollment Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name & Email - Stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-1">
                  <label className="block text-[#691C33] font-medium text-xs sm:text-sm">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-[#691C33] rounded-lg sm:rounded-xl border border-[#691C33]/20 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/10 outline-none transition-all text-sm"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[#691C33] font-medium text-xs sm:text-sm">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-[#691C33] rounded-lg sm:rounded-xl border border-[#691C33]/20 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/10 outline-none transition-all text-sm"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone & Program */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div className="space-y-1">
                  <label className="block text-[#691C33] font-medium text-xs sm:text-sm">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-[#691C33] rounded-lg sm:rounded-xl border border-[#691C33]/20 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/10 outline-none transition-all text-sm"
                    placeholder="+234 911 264 4027"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[#691C33] font-medium text-xs sm:text-sm">
                    Program of Interest *
                  </label>
                  <div className="relative">
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-[#691C33] rounded-lg sm:rounded-xl border border-[#691C33]/20 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/10 outline-none transition-all appearance-none text-sm bg-white"
                      required
                    >
                      <option value="">Select a program</option>
                      {programs.map((program) => (
                        <option
                          key={program}
                          value={program}
                          className="text-sm"
                        >
                          {program}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-4 w-4 text-[#691C33]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferred Date */}
              <div className="space-y-1">
                <label className="block text-[#691C33] font-medium text-xs sm:text-sm">
                  Preferred Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-[#691C33] rounded-lg sm:rounded-xl border border-[#691C33]/20 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/10 outline-none transition-all text-sm"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#691C33]/50 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-[#691C33] font-medium text-xs sm:text-sm">
                  Message or Questions
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-[#691C33] rounded-lg sm:rounded-xl border border-[#691C33]/20 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/10 outline-none transition-all resize-none text-sm"
                  placeholder="Tell us about your fragrance business goals..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-[#691C33] to-[#8B2846] text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>SEND ENROLLMENT REQUEST</span>
                  </>
                )}
              </motion.button>

              <p className="text-[#691C33]/60 text-xs text-center">
                We'll contact you within 24 hours with full program details
              </p>
            </form>
          </motion.div>

          {/* Contact Information - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Contact Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-gradient-to-br from-[#691C33] to-[#8B2846] rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-white"
            >
              <h3
                className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8 ${italiana.className}`}
              >
                Get in Touch
              </h3>

              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Phone & WhatsApp",
                    details: "+234 911 264 4027",
                    description: "Available 9AM - 6PM WAT, Mon-Sat",
                  },
                  {
                    icon: Mail,
                    title: "Email Address",
                    details: "academy@thehouseoftutuacademy.com",
                    description: "Response within 2-4 hours",
                  },
                  {
                    icon: MapPin,
                    title: "Academy Location",
                    details: "Abuja, Nigeria",
                    description: "Physical classes in our fragrance lab",
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    details: "Monday - Saturday",
                    description: "9:00 AM - 6:00 PM WAT",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 sm:p-4 bg-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm border border-white/20"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs sm:text-sm mb-0.5 truncate">
                        {item.title}
                      </div>
                      <div className="text-sm sm:text-base md:text-lg font-semibold mb-0.5 truncate">
                        {item.details}
                      </div>
                      <div className="text-white/70 text-[10px] sm:text-xs truncate">
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Contact Us Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#691C33]/10 shadow-sm"
            >
              <h3
                className={`text-lg sm:text-xl font-bold text-[#691C33] mb-3 sm:mb-4 ${gothamOffice.className}`}
              >
                Why Contact Us?
              </h3>

              <div className="space-y-2 sm:space-y-3">
                {[
                  "Personalized program recommendations",
                  "Payment plan customization",
                  "Schedule campus tour (in-class)",
                  "Meet with alumni for insights",
                  "Detailed curriculum breakdown",
                  "Career opportunity discussions",
                ].map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#691C33]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#691C33]" />
                    </div>
                    <span className="text-[#691C33] text-xs sm:text-sm flex-1">
                      {reason}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Response Time & Social Media Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Response Time */}
              <div className="bg-gradient-to-br from-[#691C33]/10 to-white rounded-xl sm:rounded-2xl p-4 border border-[#691C33]/20">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#691C33]" />
                  <span className="font-bold text-[#691C33] text-xs sm:text-sm">
                    Average Response
                  </span>
                </div>
                <div
                  className={`text-xl sm:text-2xl md:text-3xl font-bold text-[#691C33] mb-1 text-center sm:text-left ${gothamOffice.className}`}
                >
                  2-4 hours
                </div>
                <div className="text-[#691C33]/70 text-[10px] sm:text-xs text-center sm:text-left">
                  During business hours
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 border border-[#691C33]/20">
                <div className="mb-3">
                  <h4 className="font-bold text-[#691C33] text-xs sm:text-sm mb-2">
                    Follow Our Journey
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center sm:justify-start">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#691C33]/5 flex items-center justify-center transition-all hover:scale-105 ${social.color}`}
                        aria-label={social.label}
                      >
                        <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#691C33]" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-8 sm:mt-12 md:mt-16"
        >
          <div className="bg-gradient-to-r from-[#691C33] to-[#8B2846] rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 text-white overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <div className="flex-1">
                <h3
                  className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 ${italiana.className}`}
                >
                  Academy Location
                </h3>
                <div className="space-y-2 mb-4 sm:mb-6">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm sm:text-base">
                        Abuja, Nigeria
                      </p>
                      <p className="text-white/80 text-xs sm:text-sm">
                        Fragrance Business School & Lab
                      </p>
                    </div>
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm">
                    Visit our state-of-the-art facility for hands-on training
                    and professional equipment access.
                  </p>
                </div>

                {/* Quick Links */}
                <div className="space-y-2">
                  <h4
                    className={`text-xs sm:text-sm font-bold ${gothamOffice.className}`}
                  >
                    Quick Links
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Masterclass", href: "/#home" },
                      { label: "Curriculum", href: "/#curriculum" },
                      { label: "Enrollment", href: "/#enrollment" },
                      { label: "FAQ", href: "/faq" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-xs transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Map Visual */}
              <div className="flex-1">
                <div className="relative h-48 sm:h-56 md:h-64 rounded-lg sm:rounded-xl overflow-hidden border-2 border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B2846] to-[#691C33] flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="relative mb-3 sm:mb-4">
                        <MapPin className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-white animate-bounce" />
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
                      </div>
                      <div className="text-white font-bold text-base sm:text-lg mb-1">
                        Abuja Perfumery Lab
                      </div>
                      <div className="text-white/80 text-xs sm:text-sm">
                        Visit us for a personalized tour
                      </div>
                      <button className="mt-3 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-xs font-medium transition-colors">
                        Schedule Tour
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Calendar Icon Component for the date input
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default Contact;
