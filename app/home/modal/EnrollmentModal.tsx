// components/Forms/EnrollmentFormModal.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alexBrush } from "@/app/utils/constants";
import Image from "next/image";
import {
  X,
  User,
  GraduationCap,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Shield,
  Briefcase,
  PenTool,
  Loader2,
  Mail,
  Phone,
  CreditCard,
  Receipt,
  Banknote,
  Smartphone,
  Globe,
  Clock,
  MessageCircle,
  Calendar,
} from "lucide-react";

interface EnrollmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ACADEMY_WHATSAPP = "2349112644027";
const ACADEMY_PHONE_DISPLAY = "+234 911 264 4027";
const ACADEMY_PHONE_RAW = "+2349112644027";

const ONE_DAY_DAYS = ["Friday", "Saturday", "Sunday"] as const;
const ONE_DAY_SLOTS = [
  { id: "12-2pm", label: "12:00 PM – 2:00 PM", short: "12–2pm" },
  { id: "4-6pm", label: "4:00 PM – 6:00 PM", short: "4–6pm" },
] as const;

// Set this to false to skip the API call entirely (WhatsApp only)
const USE_BACKEND_API = true;

const EnrollmentFormModal = ({ isOpen, onClose }: EnrollmentFormModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToRefund, setAgreedToRefund] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [signature, setSignature] = useState("");
  const [signatureDate, setSignatureDate] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [emailSent, setEmailSent] = useState(false);
  const [totalPaid, setTotalPaid] = useState(false);
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  const REGISTRATION_FEE = 0;

  const COURSE_FEES = {
    "offline-6weeks": 600000,
    "offline-3months": 800000,
    "intensive-1day": 120000,
  };

  const COURSE_FEE_LABELS: Record<keyof typeof COURSE_FEES, string> = {
    "offline-6weeks": "6 Weeks Offline Masterclass",
    "offline-3months": "3 Months Offline Masterclass",
    "intensive-1day": "1 Day Intensive Class",
  };

  const COURSE_DURATIONS: Record<keyof typeof COURSE_FEES, string> = {
    "offline-6weeks": "6 Weeks (12 sessions)",
    "offline-3months": "3 Months",
    "intensive-1day": "1 Day (2 hours)",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    city: "",
    country: "Nigeria",

    program: "Commercial Perfumery Masterclass",
    deliveryFormat: "offline-6weeks" as keyof typeof COURSE_FEES,

    oneDayDay: "" as "" | "Friday" | "Saturday" | "Sunday",
    oneDaySlot: "" as "" | "12-2pm" | "4-6pm",

    hasBusiness: "no",
    businessName: "",
    expectations: "",

    paymentMethod: "bank-transfer",
    paymentReceiptNumber: "",
  });

  const totalSteps = 5;
  const isOneDay = formData.deliveryFormat === "intensive-1day";

  const calculateTotal = () => {
    const courseFee =
      COURSE_FEES[formData.deliveryFormat as keyof typeof COURSE_FEES] || 0;
    return REGISTRATION_FEE + courseFee;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getOneDaySlotLabel = () => {
    const slot = ONE_DAY_SLOTS.find((s) => s.id === formData.oneDaySlot);
    return slot?.label || "";
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSignatureDate(today);
  }, []);

  const validateSignature = () => {
    if (
      formData.fullName.trim().toLowerCase() !== signature.trim().toLowerCase()
    ) {
      return "Signature must match your full name exactly";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "deliveryFormat" && value !== "intensive-1day") {
        next.oneDayDay = "";
        next.oneDaySlot = "";
      }
      return next;
    });

    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleOneDaySelect = (
    field: "oneDayDay" | "oneDaySlot",
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim())
          errors.fullName = "Full name is required";
        if (!formData.phoneNumber.trim())
          errors.phoneNumber = "Phone number is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        if (!formData.dateOfBirth.trim())
          errors.dateOfBirth = "Date of birth is required";
        if (!formData.city.trim()) errors.city = "City is required";
        break;

      case 2:
        if (!formData.deliveryFormat)
          errors.deliveryFormat = "Please select a program";
        if (isOneDay) {
          if (!formData.oneDayDay)
            errors.oneDayDay = "Please select a day for your 1-Day class";
          if (!formData.oneDaySlot)
            errors.oneDaySlot = "Please select a time slot";
        }
        break;

      case 3:
        if (!formData.expectations.trim())
          errors.expectations = "Please share your expectations";
        break;

      case 4:
        if (!formData.paymentMethod)
          errors.paymentMethod = "Please select a payment method";
        if (!totalPaid)
          errors.totalPayment = "You must confirm payment of the total amount";
        break;

      case 5:
        if (!agreedToTerms)
          errors.agreedToTerms = "You must agree to the terms";
        if (!agreedToRefund)
          errors.agreedToRefund = "You must agree to the refund policy";

        const signatureError = validateSignature();
        if (signatureError) errors.signature = signatureError;

        if (!signature.trim()) errors.signature = "Signature is required";
        if (!signatureDate.trim()) errors.signatureDate = "Date is required";
        break;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        const formContent = document.querySelector(".form-content");
        if (formContent) {
          formContent.scrollTop = 0;
        }
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFormErrors({});
    }
  };

  const generateReceiptNumber = () => {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    return `TUTU-${year}${month}${day}-${random}`;
  };

  // ─── Build WhatsApp URL ──────────────────────────────────
  const buildWhatsAppUrl = (receiptNumber: string) => {
    const courseFee =
      COURSE_FEES[formData.deliveryFormat as keyof typeof COURSE_FEES] || 0;
    const total = calculateTotal();
    const duration =
      COURSE_DURATIONS[formData.deliveryFormat as keyof typeof COURSE_FEES];

    const scheduleLines = isOneDay
      ? [
          `*Schedule (1-Day Intensive)*`,
          `Day: ${formData.oneDayDay}`,
          `Time Slot: ${getOneDaySlotLabel()}`,
          `Duration: 2 hours`,
          ``,
        ]
      : [];

    const message = [
      `*New Enrollment — The House of Tutu Perfumery Academy*`,
      ``,
      `*Receipt:* ${receiptNumber}`,
      `*Program:* ${formData.program}`,
      `*Format:* ${COURSE_FEE_LABELS[formData.deliveryFormat]}`,
      `*Duration:* ${duration}`,
      ...scheduleLines,
      `*Personal Details*`,
      `Name: ${formData.fullName}`,
      `Phone: ${formData.phoneNumber}`,
      `Email: ${formData.email}`,
      `DOB: ${formData.dateOfBirth}`,
      `Location: ${formData.city}, ${formData.country}`,
      ``,
      `*Business Background*`,
      `Has Business: ${formData.hasBusiness}`,
      formData.businessName ? `Business Name: ${formData.businessName}` : null,
      `Expectations: ${formData.expectations}`,
      ``,
      `*Payment*`,
      `Method: ${formData.paymentMethod}`,
      `Registration Fee: FREE`,
      `Course Fee: ${formatCurrency(courseFee)}`,
      `*Total: ${formatCurrency(total)}*`,
      formData.paymentReceiptNumber
        ? `Payment Ref: ${formData.paymentReceiptNumber}`
        : null,
      ``,
      `*Agreement*`,
      `Signed by: ${signature}`,
      `Date: ${signatureDate}`,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${ACADEMY_WHATSAPP}?text=${encodeURIComponent(
      message,
    )}`;
  };

  // ─── Open WhatsApp with popup-blocker fallback ───────────
  const openWhatsApp = (url: string) => {
    if (typeof window === "undefined") return;

    // Try to open in a new tab
    const win = window.open(url, "_blank", "noopener,noreferrer");

    // If popup was blocked, fall back to same-tab navigation
    if (!win || win.closed || typeof win.closed === "undefined") {
      window.location.href = url;
    }
  };

  // ─── Build API payload ───────────────────────────────────
  const buildSubmissionData = (receiptNumber: string) => ({
    fullName: formData.fullName,
    phoneNumber: formData.phoneNumber,
    email: formData.email,
    dateOfBirth: formData.dateOfBirth,
    city: formData.city,
    country: formData.country,

    program: formData.program,
    deliveryFormat: formData.deliveryFormat,
    deliveryFormatLabel: COURSE_FEE_LABELS[formData.deliveryFormat],
    duration:
      COURSE_DURATIONS[formData.deliveryFormat as keyof typeof COURSE_FEES],

    oneDayDay: isOneDay ? formData.oneDayDay : null,
    oneDaySlot: isOneDay ? formData.oneDaySlot : null,
    oneDaySlotLabel: isOneDay ? getOneDaySlotLabel() : null,

    hasBusiness: formData.hasBusiness,
    businessName: formData.businessName || "",
    expectations: formData.expectations,

    paymentMethod: formData.paymentMethod,
    paymentReceiptNumber: formData.paymentReceiptNumber || "",

    registrationFee: REGISTRATION_FEE,
    courseFee: COURSE_FEES[formData.deliveryFormat as keyof typeof COURSE_FEES],
    totalAmount: calculateTotal(),

    agreedToTerms,
    agreedToRefund,
    signature,
    signatureDate,

    receiptNumber,
  });

  // ─── FIXED handleSubmit ──────────────────────────────────
  const handleSubmit = () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    const receiptNumber = generateReceiptNumber();

    // ✅ STEP 1: Open WhatsApp FIRST (synchronous — preserves user gesture)
    try {
      const waUrl = buildWhatsAppUrl(receiptNumber);
      openWhatsApp(waUrl);
      setWhatsappOpened(true);
    } catch (err) {
      console.error("WhatsApp open failed:", err);
    }

    // ✅ STEP 2: Show success immediately (don't wait for API)
    setSubmitSuccess(true);

    // ✅ STEP 3: Fire-and-forget API call (does not block or throw)
    if (USE_BACKEND_API) {
      const payload = buildSubmissionData(receiptNumber);
      fetch("/api/enrollment/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("API Response:", result);
          if (result?.emailSent) setEmailSent(true);
        })
        .catch((apiError) => {
          // Silent — WhatsApp already handled the notification
          console.warn("Background API error (non-blocking):", apiError);
        });
    }

    // ✅ STEP 4: Reset + close after 8s
    setTimeout(() => {
      resetForm();
      onClose();
    }, 8000);

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      city: "",
      country: "Nigeria",
      program: "Commercial Perfumery Masterclass",
      deliveryFormat: "offline-6weeks",
      oneDayDay: "",
      oneDaySlot: "",
      hasBusiness: "no",
      businessName: "",
      expectations: "",
      paymentMethod: "bank-transfer",
      paymentReceiptNumber: "",
    });
    setAgreedToTerms(false);
    setAgreedToRefund(false);
    setSignature("");
    setSignatureDate(new Date().toISOString().split("T")[0]);
    setFormErrors({});
    setSubmitSuccess(false);
    setEmailSent(false);
    setTotalPaid(false);
    setWhatsappOpened(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      resetForm();
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, isSubmitting]);

  const inputBase =
    "w-full px-4 py-3.5 text-[#691C33] rounded-xl border bg-white outline-none transition-all text-base placeholder:text-[#691C33]/40 focus:ring-2 focus:ring-[#691C33]/20";

  const steps = [
    // ─── STEP 1 ────────────────────────────────────────────
    {
      title: "Personal Information",
      icon: User,
      component: (
        <div className="space-y-5 md:space-y-6">
          <div>
            <label className="block text-[#691C33] font-semibold mb-2 text-sm md:text-base">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`${inputBase} ${
                formErrors.fullName ? "border-red-500" : "border-[#691C33]/25"
              }`}
              placeholder="Enter your full name"
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.fullName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block text-[#691C33] font-semibold mb-2 text-sm md:text-base">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`${inputBase} ${
                  formErrors.phoneNumber
                    ? "border-red-500"
                    : "border-[#691C33]/25"
                }`}
                placeholder={ACADEMY_PHONE_DISPLAY}
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[#691C33] font-semibold mb-2 text-sm md:text-base">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${inputBase} ${
                  formErrors.email ? "border-red-500" : "border-[#691C33]/25"
                }`}
                placeholder="you@example.com"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formErrors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div>
              <label className="block text-[#691C33] font-semibold mb-2 text-sm md:text-base">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`${inputBase} ${
                  formErrors.dateOfBirth
                    ? "border-red-500"
                    : "border-[#691C33]/25"
                }`}
              />
              {formErrors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formErrors.dateOfBirth}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[#691C33] font-semibold mb-2 text-sm md:text-base">
                City / Country *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`${inputBase} ${
                    formErrors.city ? "border-red-500" : "border-[#691C33]/25"
                  }`}
                  placeholder="City"
                />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`${inputBase} ${
                    formErrors.country
                      ? "border-red-500"
                      : "border-[#691C33]/25"
                  }`}
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {(formErrors.city || formErrors.country) && (
                <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {formErrors.city || formErrors.country}
                </p>
              )}
            </div>
          </div>
        </div>
      ),
    },

    // ─── STEP 2 ────────────────────────────────────────────
    {
      title: "Choose Your Program",
      icon: GraduationCap,
      component: (
        <div className="space-y-5 md:space-y-6">
          <div className="bg-[#691C33]/5 border border-[#691C33]/20 rounded-xl p-4">
            <div className="text-[#691C33] font-bold text-sm md:text-base mb-1">
              Free Registration
            </div>
            <div className="text-[#691C33]/70 text-xs md:text-sm">
              No registration fee — pay only your course fee
            </div>
          </div>

          {formErrors.deliveryFormat && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {formErrors.deliveryFormat}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() =>
                handleRadioChange("deliveryFormat", "offline-6weeks")
              }
              className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all text-left min-h-[130px] ${
                formData.deliveryFormat === "offline-6weeks"
                  ? "border-[#691C33] bg-[#691C33]/5"
                  : "border-[#691C33]/20 hover:border-[#691C33]/60 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-xs font-bold text-[#691C33] bg-[#691C33]/10 px-2.5 py-1 rounded-full">
                  20% OFF
                </span>
                <span className="text-[10px] md:text-xs text-[#691C33]/60">
                  Popular
                </span>
              </div>
              <div className="text-base md:text-lg font-bold text-[#691C33] mb-2">
                6 Weeks Masterclass
              </div>
              <div className="flex items-baseline gap-2 flex-wrap mb-1">
                <span className="text-[#691C33] font-bold text-xl md:text-2xl">
                  ₦600,000
                </span>
                <span className="text-[#691C33]/40 text-sm line-through">
                  ₦750,000
                </span>
              </div>
              <div className="text-xs md:text-sm text-[#691C33]/70">
                Hands-on training in Abuja
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                handleRadioChange("deliveryFormat", "offline-3months")
              }
              className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all text-left min-h-[130px] ${
                formData.deliveryFormat === "offline-3months"
                  ? "border-[#691C33] bg-[#691C33]/5"
                  : "border-[#691C33]/20 hover:border-[#691C33]/60 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-xs font-bold text-[#691C33] bg-[#691C33]/10 px-2.5 py-1 rounded-full">
                  PRO
                </span>
                <span className="text-[10px] md:text-xs text-[#691C33]/60">
                  Deep Dive
                </span>
              </div>
              <div className="text-base md:text-lg font-bold text-[#691C33] mb-2">
                3 Months Masterclass
              </div>
              <div className="text-[#691C33] font-bold text-xl md:text-2xl mb-1">
                ₦800,000
              </div>
              <div className="text-xs md:text-sm text-[#691C33]/70">
                Full comprehensive program
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                handleRadioChange("deliveryFormat", "intensive-1day")
              }
              className={`relative p-4 md:p-5 rounded-2xl border-2 transition-all text-left min-h-[130px] ${
                formData.deliveryFormat === "intensive-1day"
                  ? "border-[#691C33] bg-[#691C33]/5"
                  : "border-[#691C33]/20 hover:border-[#691C33]/60 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] md:text-xs font-bold text-[#691C33] bg-[#691C33]/10 px-2.5 py-1 rounded-full">
                  QUICK START
                </span>
                <span className="text-[10px] md:text-xs text-[#691C33]/60">
                  1 Day
                </span>
              </div>
              <div className="text-base md:text-lg font-bold text-[#691C33] mb-2">
                1 Day Intensive
              </div>
              <div className="text-[#691C33] font-bold text-xl md:text-2xl mb-1">
                ₦120,000
              </div>
              <div className="text-xs md:text-sm text-[#691C33]/70">
                Fast-track class in Abuja
              </div>
            </button>
          </div>

          {/* 1-Day picker */}
          <AnimatePresence>
            {isOneDay && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-[#691C33] rounded-2xl p-4 md:p-5 text-white space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg mb-1">
                        Pick Your Day & Time
                      </h4>
                      <p className="text-white/80 text-xs md:text-sm">
                        1-Day Intensive runs on Fridays, Saturdays, and Sundays
                        only. Duration: 2 hours per session.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2.5 text-sm">
                      Choose Your Day *
                    </label>
                    {formErrors.oneDayDay && (
                      <p className="text-red-300 text-xs mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.oneDayDay}
                      </p>
                    )}
                    <div className="grid grid-cols-3 gap-2">
                      {ONE_DAY_DAYS.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleOneDaySelect("oneDayDay", day)}
                          className={`py-3 rounded-xl border-2 font-medium transition-all text-sm ${
                            formData.oneDayDay === day
                              ? "bg-white text-[#691C33] border-white"
                              : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2.5 text-sm">
                      Choose Your Time Slot *
                    </label>
                    {formErrors.oneDaySlot && (
                      <p className="text-red-300 text-xs mb-2 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.oneDaySlot}
                      </p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ONE_DAY_SLOTS.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() =>
                            handleOneDaySelect("oneDaySlot", slot.id)
                          }
                          className={`py-3.5 px-4 rounded-xl border-2 font-medium transition-all text-sm flex items-center justify-center gap-2 ${
                            formData.oneDaySlot === slot.id
                              ? "bg-white text-[#691C33] border-white"
                              : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.oneDayDay && formData.oneDaySlot && (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-3 flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-white flex-shrink-0" />
                      <span className="text-white/95">
                        Your class:{" "}
                        <span className="font-bold">{formData.oneDayDay}</span>{" "}
                        ·{" "}
                        <span className="font-bold">
                          {getOneDaySlotLabel()}
                        </span>{" "}
                        · Duration: 2 hours
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-[#691C33]/5 rounded-2xl p-4 md:p-5 border border-[#691C33]/15">
            <h4 className="text-[#691C33] font-bold mb-3 text-sm md:text-base">
              What's Included
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Student Handbook & Workbook",
                "All Course Materials",
                "Certificate of Completion",
                "WhatsApp Group Access",
                "Direct Instructor Support",
                "Lifetime Access to Updates",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#691C33] flex-shrink-0" />
                  <span className="text-[#691C33]/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },

    // ─── STEP 3 ────────────────────────────────────────────
    {
      title: "Business Background",
      icon: Briefcase,
      component: (
        <div className="space-y-5 md:space-y-6">
          <div>
            <label className="block text-[#691C33] font-semibold mb-3 text-sm md:text-base">
              Do you currently have a fragrance or beauty business? *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRadioChange("hasBusiness", "yes")}
                className={`py-3.5 rounded-xl border-2 font-medium transition-all ${
                  formData.hasBusiness === "yes"
                    ? "border-[#691C33] bg-[#691C33]/10 text-[#691C33]"
                    : "border-[#691C33]/25 text-[#691C33]/70 hover:border-[#691C33]/60"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleRadioChange("hasBusiness", "no")}
                className={`py-3.5 rounded-xl border-2 font-medium transition-all ${
                  formData.hasBusiness === "no"
                    ? "border-[#691C33] bg-[#691C33]/10 text-[#691C33]"
                    : "border-[#691C33]/25 text-[#691C33]/70 hover:border-[#691C33]/60"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {formData.hasBusiness === "yes" && (
            <div>
              <label className="block text-[#691C33] font-semibold mb-2 text-sm md:text-base">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className={`${inputBase} border-[#691C33]/25`}
                placeholder="Enter your business name"
              />
            </div>
          )}

          <div>
            <label className="block text-[#691C33] font-semibold mb-2 text-sm md:text-base">
              What do you hope to gain from this program? *
            </label>
            <textarea
              name="expectations"
              value={formData.expectations}
              onChange={handleChange}
              rows={4}
              className={`${inputBase} resize-none ${
                formErrors.expectations
                  ? "border-red-500"
                  : "border-[#691C33]/25"
              }`}
              placeholder="Share your goals and expectations..."
            />
            {formErrors.expectations && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.expectations}
              </p>
            )}
          </div>

          <div className="bg-[#691C33]/5 rounded-2xl p-4 md:p-5 border border-[#691C33]/15">
            <h4 className="text-[#691C33] font-bold mb-3 text-sm md:text-base">
              You'll Learn
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {[
                "Understanding fragrance oil grades",
                "Top, middle, and base notes explained",
                "How fragrance houses produce different grades",
                "Choosing the right oil for each product",
                "Supplier sourcing & pricing",
                "Branding and packaging fundamentals",
                "Business launch planning",
                "Pricing, costing & profit calculation",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#691C33] mt-2 flex-shrink-0"></div>
                  <span className="text-[#691C33]/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },

    // ─── STEP 4 ────────────────────────────────────────────
    {
      title: "Payment Information",
      icon: DollarSign,
      component: (
        <div className="space-y-5 md:space-y-6">
          <div>
            <label className="block text-[#691C33] font-semibold mb-3 text-sm md:text-base">
              Payment Breakdown
            </label>
            <div className="bg-[#691C33]/5 rounded-2xl p-4 md:p-5 border border-[#691C33]/15 space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-[#691C33]/10">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#691C33]" />
                  <span className="text-[#691C33] font-medium text-sm md:text-base">
                    Registration Fee
                  </span>
                </div>
                <div className="text-[#691C33] font-bold text-sm md:text-base">
                  FREE
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-[#691C33]/10">
                <div className="flex items-center gap-2 min-w-0">
                  <GraduationCap className="w-4 h-4 text-[#691C33] flex-shrink-0" />
                  <span className="text-[#691C33] text-sm md:text-base truncate">
                    {COURSE_FEE_LABELS[formData.deliveryFormat]}
                  </span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="text-[#691C33] font-bold text-sm md:text-base">
                    {formatCurrency(
                      COURSE_FEES[
                        formData.deliveryFormat as keyof typeof COURSE_FEES
                      ] || 0,
                    )}
                  </div>
                  <div className="text-xs text-[#691C33]/60">
                    {
                      COURSE_DURATIONS[
                        formData.deliveryFormat as keyof typeof COURSE_FEES
                      ]
                    }
                  </div>
                </div>
              </div>

              {isOneDay && formData.oneDayDay && formData.oneDaySlot && (
                <div className="flex items-start gap-2 pb-3 border-b border-[#691C33]/10 text-sm">
                  <Calendar className="w-4 h-4 text-[#691C33] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#691C33] font-medium">
                      Your selected class
                    </div>
                    <div className="text-[#691C33]/70 text-xs md:text-sm">
                      {formData.oneDayDay} · {getOneDaySlotLabel()} · 2 hours
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center bg-[#691C33]/10 rounded-xl p-3.5">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#691C33]" />
                  <span className="text-[#691C33] font-bold text-base md:text-lg">
                    Total
                  </span>
                </div>
                <div className="text-[#691C33] font-bold text-lg md:text-xl">
                  {formatCurrency(calculateTotal())}
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#691C33] font-semibold mb-3 text-sm md:text-base">
              Payment Method *
            </label>
            {formErrors.paymentMethod && (
              <p className="text-red-500 text-sm mb-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.paymentMethod}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  value: "bank-transfer",
                  label: "Bank Transfer",
                  icon: Banknote,
                },
                {
                  value: "pos-payment",
                  label: "POS Payment",
                  icon: Smartphone,
                },
                {
                  value: "online-payment",
                  label: "Online Payment",
                  icon: Globe,
                },
              ].map((method) => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() =>
                    handleRadioChange("paymentMethod", method.value)
                  }
                  className={`py-3.5 px-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                    formData.paymentMethod === method.value
                      ? "border-[#691C33] bg-[#691C33]/10 text-[#691C33]"
                      : "border-[#691C33]/25 text-[#691C33]/70 hover:border-[#691C33]/60"
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#691C33]/5 rounded-2xl p-5 md:p-6 border border-[#691C33]/15">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#691C33] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[#691C33] font-bold text-sm md:text-base mb-2">
                  Complete Payment by Phone
                </h4>
                <p className="text-[#691C33]/80 text-sm leading-relaxed mb-3">
                  To complete your payment, please call or WhatsApp our
                  admissions team directly. They will guide you through the
                  transfer and confirm your enrollment.
                </p>
                <a
                  href={`tel:${ACADEMY_PHONE_RAW}`}
                  className="inline-flex items-center gap-2 bg-[#691C33] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#691C33]/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call {ACADEMY_PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#691C33] font-semibold mb-3 text-sm md:text-base">
              Confirm Payment
            </label>
            <div className="flex items-start gap-3 bg-white border border-[#691C33]/20 rounded-xl p-4">
              <input
                type="checkbox"
                id="totalPaid"
                checked={totalPaid}
                onChange={(e) => setTotalPaid(e.target.checked)}
                className={`mt-1 w-5 h-5 text-[#691C33] rounded flex-shrink-0 ${
                  formErrors.totalPayment
                    ? "border-red-500"
                    : "border-[#691C33]"
                } focus:ring-[#691C33]/20`}
              />
              <label
                htmlFor="totalPaid"
                className="text-[#691C33] text-sm md:text-base leading-relaxed"
              >
                I confirm I have paid or am paying{" "}
                <span className="font-bold">
                  {formatCurrency(calculateTotal())}
                </span>{" "}
                to the academy via phone confirmation.
              </label>
            </div>
            {formErrors.totalPayment && (
              <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {formErrors.totalPayment}
              </p>
            )}
          </div>
        </div>
      ),
    },

    // ─── STEP 5 ────────────────────────────────────────────
    {
      title: "Terms & Agreement",
      icon: FileText,
      component: (
        <div className="space-y-5 md:space-y-6">
          {submitSuccess && (
            <div className="bg-[#691C33]/5 border border-[#691C33]/20 rounded-2xl p-5 md:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-[#691C33] p-2.5 md:p-3 rounded-full flex-shrink-0">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[#691C33] font-bold text-lg md:text-xl mb-3">
                    Enrollment Successful
                  </h4>

                  {whatsappOpened && (
                    <div className="mb-3 p-3 bg-white rounded-lg border border-[#691C33]/20">
                      <div className="flex items-center gap-2 text-[#691C33] mb-1 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-bold">Academy Notified</span>
                      </div>
                      <p className="text-[#691C33]/80 text-xs md:text-sm">
                        Your enrollment details have been sent to our admissions
                        team on WhatsApp.
                        {isOneDay &&
                          formData.oneDayDay &&
                          formData.oneDaySlot && (
                            <>
                              {" "}
                              Your 1-Day class is booked for{" "}
                              <span className="font-bold">
                                {formData.oneDayDay}
                              </span>{" "}
                              at{" "}
                              <span className="font-bold">
                                {getOneDaySlotLabel()}
                              </span>
                              .
                            </>
                          )}
                      </p>
                    </div>
                  )}

                  {emailSent && (
                    <div className="mb-3 p-3 bg-white rounded-lg border border-[#691C33]/20">
                      <div className="flex items-center gap-2 text-[#691C33] mb-1 text-sm">
                        <Mail className="w-4 h-4" />
                        <span className="font-bold">Email Sent</span>
                      </div>
                      <p className="text-[#691C33]/80 text-xs md:text-sm break-all">
                        Confirmation sent to{" "}
                        <span className="font-bold">{formData.email}</span>
                      </p>
                    </div>
                  )}

                  <div className="p-3 bg-white rounded-lg border border-[#691C33]/20">
                    <h5 className="text-[#691C33] font-bold mb-2 flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      What happens next
                    </h5>
                    <ol className="text-[#691C33]/80 text-xs md:text-sm space-y-2">
                      {[
                        "Payment verified within 24 hours",
                        "Course access sent via email",
                        "Join the student WhatsApp group",
                        isOneDay
                          ? "Attend your 1-Day class on the selected day"
                          : "Attend orientation session",
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#691C33]/10 text-[#691C33] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#691C33]/5 rounded-2xl p-4 md:p-5 border border-[#691C33]/15 max-h-56 overflow-y-auto">
            <h4 className="text-[#691C33] font-bold mb-3 text-sm md:text-base">
              Student Agreement Summary
            </h4>
            <div className="space-y-2.5 text-sm">
              {[
                "Attend classes regularly and participate actively",
                "Submit assignments and final project on time",
                "Maintain professionalism and respect",
                "Follow all academy policies and rules",
                "Complete all assignments with original work",
                isOneDay
                  ? "Attend your full 2-hour session on the selected day"
                  : "Attend at least 80% of classes for certification",
                "Maintain confidentiality of course materials",
                "No recording of classes without permission",
              ].map((term, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#691C33] mt-2 flex-shrink-0"></div>
                  <span className="text-[#691C33]/90">{term}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#691C33]/5 rounded-2xl p-4 md:p-5 border border-[#691C33]/15">
            <h4 className="text-[#691C33] font-bold mb-3 flex items-center gap-2 text-sm md:text-base">
              <AlertCircle className="w-5 h-5" />
              Refund Policy
            </h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#691C33] mt-1.5 flex-shrink-0"></div>
                <span className="text-[#691C33]/90">
                  <span className="font-bold">50% refund</span> — 7+ days before
                  start
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-[#691C33] mt-1.5 flex-shrink-0"></div>
                <span className="text-[#691C33]/90">
                  <span className="font-bold">No refund</span> — After 7 days of
                  start
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-[#691C33]/15">
                <p className="text-[#691C33]/70 italic text-xs md:text-sm">
                  Once the program begins, no refunds except documented medical
                  emergencies (partial credit may be offered).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className={`mt-1 w-5 h-5 text-[#691C33] rounded flex-shrink-0 ${
                  formErrors.agreedToTerms
                    ? "border-red-500"
                    : "border-[#691C33]"
                } focus:ring-[#691C33]/20`}
              />
              <label
                htmlFor="agreeTerms"
                className="text-[#691C33] text-sm md:text-base leading-relaxed"
              >
                I have read and agree to the Student Agreement terms listed
                above.
              </label>
            </div>
            {formErrors.agreedToTerms && (
              <p className="text-red-500 text-sm ml-8">
                {formErrors.agreedToTerms}
              </p>
            )}

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeRefund"
                checked={agreedToRefund}
                onChange={(e) => setAgreedToRefund(e.target.checked)}
                className={`mt-1 w-5 h-5 text-[#691C33] rounded flex-shrink-0 ${
                  formErrors.agreedToRefund
                    ? "border-red-500"
                    : "border-[#691C33]"
                } focus:ring-[#691C33]/20`}
              />
              <label
                htmlFor="agreeRefund"
                className="text-[#691C33] text-sm md:text-base leading-relaxed"
              >
                I understand and accept the Refund Policy.
              </label>
            </div>
            {formErrors.agreedToRefund && (
              <p className="text-red-500 text-sm ml-8">
                {formErrors.agreedToRefund}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[#691C33] font-semibold mb-3 text-sm md:text-base">
              Digital Signature *
            </label>
            <div className="border-2 border-[#691C33]/25 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="w-5 h-5 text-[#691C33]" />
                <span className="text-[#691C33] font-medium text-sm md:text-base">
                  Sign below
                </span>
              </div>

              <div className="mb-4 p-3 bg-[#691C33]/5 rounded-lg border border-[#691C33]/15">
                <div className="flex items-center gap-2 text-[#691C33]/70 text-xs md:text-sm mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Your registered name:</span>
                </div>
                <div className="text-[#691C33] font-bold text-base md:text-lg break-words">
                  {formData.fullName || "Not provided yet"}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[#691C33] font-medium mb-2 text-xs md:text-sm">
                  Type your full name as signature:
                </label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-xl border bg-white outline-none transition-all ${
                    formErrors.signature
                      ? "border-red-500"
                      : "border-[#691C33]/25"
                  } focus:ring-2 focus:ring-[#691C33]/20 ${
                    alexBrush.className
                  } text-2xl text-[#691C33]`}
                  placeholder="Your signature"
                />

                {signature && (
                  <div className="mt-3 p-3 bg-[#691C33]/5 rounded-lg border border-[#691C33]/15">
                    <div className="text-[#691C33]/70 text-xs mb-1">
                      Preview:
                    </div>
                    <div
                      className={`text-2xl md:text-3xl text-[#691C33] ${alexBrush.className} text-center py-2 border-b border-[#691C33]/20 break-words`}
                    >
                      {signature}
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs text-[#691C33]/60">
                      <span>{signatureDate}</span>
                      <span>
                        {formData.fullName.toLowerCase() ===
                        signature.toLowerCase() ? (
                          <span className="text-[#691C33] font-medium">
                            Matches
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            Doesn't match
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {formErrors.signature && (
                  <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {formErrors.signature}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[#691C33] font-medium mb-2 text-xs md:text-sm">
                  Date
                </label>
                <input
                  type="date"
                  value={signatureDate}
                  readOnly
                  className={`w-full px-4 py-3.5 text-[#691C33] rounded-xl border bg-gray-50 ${
                    formErrors.signatureDate
                      ? "border-red-500"
                      : "border-[#691C33]/25"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#691C33]/5 border border-[#691C33]/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-[#691C33] flex-shrink-0" />
              <div>
                <h4 className="text-[#691C33] font-bold mb-2 text-sm md:text-base">
                  Important Notice
                </h4>
                <ul className="text-[#691C33] text-xs md:text-sm space-y-1 list-disc list-inside">
                  <li>
                    You are paying{" "}
                    <strong>{formatCurrency(calculateTotal())}</strong> for your
                    selected program
                  </li>
                  {isOneDay && formData.oneDayDay && formData.oneDaySlot && (
                    <li>
                      Your 1-Day class is on{" "}
                      <strong>{formData.oneDayDay}</strong> at{" "}
                      <strong>{getOneDaySlotLabel()}</strong> (2 hours)
                    </li>
                  )}
                  <li>Registration is free</li>
                  <li>
                    Your enrollment will be confirmed after payment verification
                  </li>
                  <li>
                    You agree to all terms and conditions of The House of Tutu
                    Perfumery Academy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div className="relative w-full max-w-4xl h-[100dvh] sm:h-auto sm:max-h-[92vh] overflow-hidden bg-white rounded-t-3xl sm:rounded-2xl md:rounded-3xl shadow-2xl flex flex-col">
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `url('/pattern.png')`,
                  backgroundSize: "300px",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat",
                }}
              />

              <div className="relative bg-[#691C33] px-4 py-4 md:px-6 md:py-5 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                      <Image
                        src="/logo-white.png"
                        alt="The House of Tutu Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-white text-base md:text-xl font-bold truncate">
                        THE HOUSE OF TUTU
                      </h2>
                      <p className="text-white/80 text-xs md:text-sm truncate">
                        Perfumery Academy
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="p-2.5 rounded-full hover:bg-white/10 transition-colors disabled:opacity-50 flex-shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </button>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <span className="text-white/80 text-xs md:text-sm whitespace-nowrap">
                      Step {currentStep} / {totalSteps}
                    </span>
                    <span className="text-white font-medium text-xs md:text-sm truncate text-right">
                      {steps[currentStep - 1].title}
                    </span>
                  </div>
                  <div className="h-1.5 md:h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(currentStep / totalSteps) * 100}%`,
                      }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 form-content">
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center gap-3 mb-5 md:mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#691C33]/10 flex items-center justify-center flex-shrink-0">
                      {(() => {
                        const IconComponent = steps[currentStep - 1].icon;
                        return (
                          <IconComponent className="w-5 h-5 text-[#691C33]" />
                        );
                      })()}
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-[#691C33]">
                      {steps[currentStep - 1].title}
                    </h3>
                  </div>
                  {CurrentStepComponent}
                </div>

                <div className="flex justify-between gap-3 pt-5 md:pt-6 border-t border-[#691C33]/10">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-initial px-5 py-3.5 text-[#691C33] font-medium border-2 border-[#691C33] rounded-xl hover:bg-[#691C33]/5 transition-colors disabled:opacity-50 text-sm md:text-base"
                    >
                      Back
                    </button>
                  ) : (
                    <div className="hidden sm:block"></div>
                  )}

                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={isSubmitting}
                    className={`flex-1 sm:flex-initial sm:min-w-[180px] px-6 py-3.5 font-medium rounded-xl flex items-center justify-center gap-2 transition-colors text-sm md:text-base ${
                      !isSubmitting
                        ? "bg-[#691C33] text-white hover:bg-[#691C33]/90 active:scale-[0.98]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : submitSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Submitted</span>
                      </>
                    ) : currentStep === totalSteps ? (
                      <>
                        <GraduationCap className="w-5 h-5" />
                        <span>Submit</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="relative bg-[#691C33]/5 px-4 py-3 md:p-4 border-t border-[#691C33]/10 flex-shrink-0">
                <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                  <div>
                    <div className="text-xs md:text-sm font-bold text-[#691C33]">
                      FREE
                    </div>
                    <div className="text-[10px] md:text-xs text-[#691C33]/70">
                      Registration
                    </div>
                  </div>
                  <div className="border-x border-[#691C33]/15">
                    <div className="text-xs md:text-sm font-bold text-[#691C33] truncate">
                      {isOneDay && formData.oneDayDay
                        ? formData.oneDayDay.slice(0, 3)
                        : "100%"}
                    </div>
                    <div className="text-[10px] md:text-xs text-[#691C33]/70">
                      {isOneDay && formData.oneDaySlot
                        ? ONE_DAY_SLOTS.find(
                            (s) => s.id === formData.oneDaySlot,
                          )?.short
                        : "Practical"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs md:text-sm font-bold text-[#691C33] truncate">
                      {formatCurrency(calculateTotal())}
                    </div>
                    <div className="text-[10px] md:text-xs text-[#691C33]/70">
                      Total
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentFormModal;
