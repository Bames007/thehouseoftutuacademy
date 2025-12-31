// components/Sections/Contact.tsx
"use client";
import { motion } from "framer-motion";
import { gothamOffice, italiana } from "@/app/utils/constants";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from "lucide-react";
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fixed positions to avoid hydration mismatch
  const floatingCircles = [
    { id: 0, left: "10%", top: "15%", delay: 0 },
    { id: 1, left: "85%", top: "25%", delay: 0.5 },
    { id: 2, left: "20%", top: "75%", delay: 1 },
    { id: 3, left: "90%", top: "65%", delay: 1.5 },
    { id: 4, left: "5%", top: "45%", delay: 2 },
    { id: 5, left: "75%", top: "85%", delay: 2.5 },
  ];

  const programs = [
    "Commercial Perfumery Masterclass",
    "Level 1: Foundation",
    "Level 2: Intermediate",
    "Level 3: Advanced",
    "Level 4: Diploma",
    "Full Academy Package",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
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
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[url('/pattern.png')] bg-cover bg-center bg-no-repeat"
        style={{ opacity: 0.05 }}
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

      {/* Floating Elements - Fixed positions for SSR */}
      <div className="absolute inset-0 pointer-events-none">
        {isClient &&
          floatingCircles.map((circle) => (
            <motion.div
              key={circle.id}
              animate={{
                x: [0, Math.cos(circle.id) * 30, 0],
                y: [0, Math.sin(circle.id) * 30, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Infinity,
                ease: "linear",
                delay: circle.delay,
              }}
              className="absolute w-8 h-8 md:w-12 md:h-12 border border-[#691C33]/10 rounded-full"
              style={{
                left: circle.left,
                top: circle.top,
              }}
            />
          ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className={`text-3xl md:text-5xl lg:text-6xl font-black text-[#691C33] mt-4 mb-4 md:mb-6 ${italiana.className}`}
          >
            Start Your Fragrance Journey
          </h2>
          <p
            className={`text-base md:text-xl text-[#691C33]/80 max-w-3xl mx-auto ${gothamOffice.className} font-light px-4`}
          >
            Contact us for personalized guidance on choosing the right program
            for your goals. Our team is ready to help you succeed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-[#691C33]/20 p-6 md:p-8"
          >
            <h3
              className={`text-2xl md:text-3xl font-bold text-[#691C33] mb-6 md:mb-8 ${gothamOffice.className}`}
            >
              Request Enrollment Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-[#691C33] rounded-xl border border-[#691C33]/30 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-[#691C33] rounded-xl border border-[#691C33]/30 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Phone & Program */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-[#691C33] rounded-xl border border-[#691C33]/30 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base"
                    placeholder="+234 911 264 4027"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                    Program of Interest *
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-[#691C33] rounded-xl border border-[#691C33]/30 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all appearance-none text-sm md:text-base"
                    required
                  >
                    <option value="">Select a program</option>
                    {programs.map((program) => (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-[#691C33] rounded-xl border border-[#691C33]/30 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                  Message or Questions
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 text-[#691C33] rounded-xl border border-[#691C33]/30 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all resize-none text-sm md:text-base"
                  placeholder="Tell us about your fragrance business goals..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#691C33] text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center justify-center space-x-3 hover:shadow-xl transition-all"
              >
                <Send className="w-5 h-5" />
                <span>SEND ENROLLMENT REQUEST</span>
              </motion.button>

              <p className="text-[#691C33]/60 text-xs md:text-sm text-center">
                We'll contact you within 24 hours with full program details
              </p>
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#691C33] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white"
            >
              <h3
                className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 ${italiana.className}`}
              >
                Get in Touch
              </h3>

              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Phone & WhatsApp",
                    details: "+234 911 264 4027",
                    description: "Available 9AM - 6PM WAT, Monday - Saturday",
                  },
                  {
                    icon: Mail,
                    title: "Email Address",
                    details: "academy@thehouseoftutuacademy.com",
                    description:
                      "Response within 2-4 hours during business days",
                  },
                  {
                    icon: MapPin,
                    title: "Academy Location",
                    details: "Abuja, Nigeria",
                    description:
                      "Physical classes held in our professional fragrance lab",
                  },
                  {
                    icon: Clock,
                    title: "Office Hours",
                    details: "Monday - Saturday",
                    description: "9:00 AM - 6:00 PM West Africa Time",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 md:gap-4 p-4 bg-white/10 rounded-xl md:rounded-2xl backdrop-blur-sm border border-white/20"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-base md:text-lg mb-1">
                        {item.title}
                      </div>
                      <div className="text-lg md:text-xl mb-1 md:mb-2 font-semibold">
                        {item.details}
                      </div>
                      <div className="text-white/70 text-xs md:text-sm">
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl md:rounded-3xl p-6 border border-[#691C33]/20 shadow-lg"
            >
              <h3
                className={`text-xl md:text-2xl font-bold text-[#691C33] mb-4 md:mb-6 ${gothamOffice.className}`}
              >
                Why Contact Us Directly?
              </h3>

              <div className="space-y-3 md:space-y-4">
                {[
                  "Personalized program recommendations",
                  "Payment plan customization",
                  "Clarify any questions before enrolling",
                  "Schedule a campus tour (for in-class)",
                  "Meet with alumni for insights",
                  "Get detailed curriculum breakdown",
                  "Discuss career opportunities",
                ].map((reason, index) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#691C33]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-[#691C33]" />
                    </div>
                    <span className="text-[#691C33] text-sm md:text-base">
                      {reason}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#691C33]/10 rounded-2xl p-4 md:p-6 text-center border border-[#691C33]/20"
            >
              <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#691C33]" />
                <span className="font-bold text-[#691C33] text-sm md:text-base">
                  Average Response Time
                </span>
              </div>
              <div
                className={`text-2xl md:text-4xl font-bold text-[#691C33] mb-1 md:mb-2 ${gothamOffice.className}`}
              >
                2-4 hours
              </div>
              <div className="text-[#691C33]/70 text-xs md:text-sm">
                During business hours (Monday - Saturday)
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map & Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-20"
        >
          <div className="bg-[#691C33] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h3
                  className={`text-xl md:text-2xl font-bold mb-4 md:mb-6 ${italiana.className}`}
                >
                  Follow Our Journey
                </h3>
                <p className="text-white/80 mb-4 md:mb-6 text-sm md:text-base">
                  Stay updated with student success stories, class previews, and
                  fragrance industry insights.
                </p>

                {/* Social Media Icons */}
                <div className="flex gap-3 md:gap-4">
                  {[
                    {
                      name: "Instagram",
                      href: "https://instagram.com/houseoftutu",
                      icon: (
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                        </svg>
                      ),
                    },
                    {
                      name: "X (Twitter)",
                      href: "https://twitter.com/houseoftutu",
                      icon: (
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                    },
                    {
                      name: "Facebook",
                      href: "https://facebook.com/houseoftutu",
                      icon: (
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      ),
                    },
                    {
                      name: "TikTok",
                      href: "https://tiktok.com/@houseoftutu",
                      icon: (
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                      ),
                    },
                    {
                      name: "YouTube",
                      href: "https://youtube.com/@houseoftutu",
                      icon: (
                        <svg
                          className="w-5 h-5 md:w-6 md:h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ),
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors hover:scale-105"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <h4
                  className={`text-lg md:text-xl font-bold mb-3 md:mb-4 ${gothamOffice.className}`}
                >
                  Academy Location
                </h4>
                <div className="relative h-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden border-2 border-white/20">
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#8B2846] to-[#691C33] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 md:w-12 md:h-12 text-white mx-auto mb-2 md:mb-4" />
                      <div className="text-white font-bold text-base md:text-lg">
                        Abuja, Nigeria
                      </div>
                      <div className="text-white/80 text-sm md:text-base">
                        Fragrance Business School
                      </div>
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

export default Contact;
