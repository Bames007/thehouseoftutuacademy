// components/Layout/Footer.tsx
"use client";
import { motion } from "framer-motion";
import { gothamOffice } from "@/app/utils/constants";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Academy", href: "#about" },
    { name: "Curriculum", href: "#curriculum" },
    { name: "Courses", href: "#courses" },
    { name: "Tuition", href: "#tuition" },
    { name: "Enroll", href: "#enroll" },
  ];

  const programs = [
    { name: "Foundation (Level 1)", href: "#courses" },
    { name: "Intermediate (Level 2)", href: "#courses" },
    { name: "Advanced (Level 3)", href: "#courses" },
    { name: "Diploma (Level 4)", href: "#courses" },
    { name: "Masterclass", href: "#courses" },
  ];

  const resources = [
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
    { name: "Student Portal", href: "#" },
    { name: "Blog & Insights", href: "#" },
    { name: "Career Support", href: "#" },
    { name: "Alumni Network", href: "#" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#691C33] text-white relative overflow-hidden">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('/pattern.png')`,
          backgroundSize: "300px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Logo Watermark */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/logo-white.png"
            alt="The House of Tutu Logo"
            width={800}
            height={800}
            className="w-full max-w-4xl h-auto object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Column - Wider on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 space-y-6"
          >
            {/* Logo and Brand */}
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                <Image
                  src="/logo-white.png"
                  alt="The House of Tutu Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                  The House of Tutu
                </h1>
                <p className="text-white/90 text-lg md:text-xl">
                  Perfumery Academy
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg">
              Nigeria's premier fragrance business school, transforming passion
              into profitable fragrance brands through comprehensive commercial
              perfumery education.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Call Us</div>
                  <div className="text-white/80">+234 911 264 4027</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Email Us</div>
                  <div className="text-white/80">
                    info@thehouseoftutuacademy.com
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">Visit Us</div>
                  <div className="text-white/80">Abuja, Nigeria</div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Follow Us</h4>
              <div className="flex gap-3">
                {[
                  {
                    name: "Instagram",
                    href: "https://instagram.com/thehouseoftutu",
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
                    href: "https://twitter.com/thehouseoftutu",
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
                    href: "https://facebook.com/thehouseoftutu",
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
                    href: "https://tiktok.com/@thehouseoftutu",
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
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all bg-white/5 backdrop-blur-sm"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4
              className={`text-lg md:text-xl font-bold mb-4 ${gothamOffice.className} tracking-wide`}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group text-sm md:text-base"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/0 group-hover:bg-white transition-all"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4
              className={`text-lg md:text-xl font-bold mb-4 ${gothamOffice.className} tracking-wide`}
            >
              Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link
                    href={program.href}
                    onClick={(e) => handleNavClick(program.href, e)}
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group text-sm md:text-base"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/0 group-hover:bg-white transition-all"></div>
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4
              className={`text-lg md:text-xl font-bold mb-4 ${gothamOffice.className} tracking-wide`}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <Link
                    href={resource.href}
                    onClick={(e) => handleNavClick(resource.href, e)}
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-2 group text-sm md:text-base"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/0 group-hover:bg-white transition-all"></div>
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                Ready to Start Your Fragrance Journey?
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Join our next cohort and transform your passion into a
                profitable business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleNavClick("#enroll", e)}
                className="bg-white text-[#691C33] px-6 py-3 md:py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-xl transition-all text-sm md:text-base"
              >
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
                <span>ENROLL NOW</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleNavClick("#contact", e)}
                className="bg-transparent border-2 border-white text-white px-6 py-3 md:py-4 rounded-xl font-semibold hover:bg-white/10 transition-all text-sm md:text-base"
              >
                REQUEST INFO
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8 md:my-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-white/60 text-xs md:text-sm">
              © {new Date().getFullYear()} The House of Tutu Perfumery Academy.
              All rights reserved.
            </p>
            <p className="text-white/50 text-xs mt-1">
              Abuja, Nigeria • info@thehouseoftutuacademy.com • +234 911 264
              4027
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-white/60 hover:text-white transition-colors text-xs md:text-sm"
            >
              Privacy Policy
            </Link>
            <span className="text-white/40">•</span>
            <Link
              href="/terms"
              className="text-white/60 hover:text-white transition-colors text-xs md:text-sm"
            >
              Terms of Service
            </Link>
          </div>

          {/* EBCom Technologies Credit */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-white/60 text-xs md:text-sm">
              Engineered by{" "}
              <span className="text-white font-semibold">
                EBCom Technologies
              </span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Luxury Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </footer>
  );
};

export default Footer;
