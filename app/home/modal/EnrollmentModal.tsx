// components/Forms/EnrollmentFormModal.tsx
"use client";
import { useState, useRef, useEffect } from "react";
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
  Upload,
  PenTool,
  Loader2,
  Mail,
  Phone,
  CreditCard,
  Receipt,
  Banknote,
  Smartphone,
  Globe,
  ShieldCheck,
  Clock,
  MessageCircle,
} from "lucide-react";

interface EnrollmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  const [, setApplicationPaid] = useState(false);
  const [totalPaid, setTotalPaid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const REGISTRATION_FEE = 20000;
  const COURSE_FEES = {
    "in-class": 650000,
    online: 500000,
  };

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    city: "",
    country: "Nigeria",

    // Course Selection
    program: "Commercial Perfumery Masterclass (2 Weeks)",
    deliveryFormat: "online",

    // Business Background
    hasBusiness: "no",
    businessName: "",
    expectations: "",

    // Payment Information
    paymentMethod: "bank-transfer",
    proofOfPayment: null as File | null,
    paymentReceiptNumber: "",
  });

  const totalSteps = 5;

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
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;
      setFormData((prev) => ({
        ...prev,
        proofOfPayment: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Information
        if (!formData.fullName.trim())
          errors.fullName = "Full name is required";
        if (!formData.phoneNumber.trim())
          errors.phoneNumber = "Phone number is required";
        if (!formData.email.trim()) errors.email = "Email is required";
        if (!formData.dateOfBirth.trim())
          errors.dateOfBirth = "Date of birth is required";
        if (!formData.city.trim()) errors.city = "City is required";
        break;

      case 2: // Course Selection
        if (!formData.deliveryFormat)
          errors.deliveryFormat = "Please select a delivery format";
        break;

      case 3: // Business Background
        if (!formData.expectations.trim())
          errors.expectations = "Please share your expectations";
        break;

      case 4: // Payment Information
        if (!formData.paymentMethod)
          errors.paymentMethod = "Please select a payment method";
        if (!formData.proofOfPayment)
          errors.proofOfPayment = "Proof of payment is required";
        if (!totalPaid)
          errors.totalPayment = "You must confirm payment of the total amount";
        break;

      case 5: // Terms & Agreement
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
        // Scroll to top of form content
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

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    try {
      const receiptNumber = generateReceiptNumber();

      // Prepare submission data
      const submissionData = {
        // Personal Information
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        city: formData.city,
        country: formData.country,

        // Course Selection
        program: formData.program,
        deliveryFormat: formData.deliveryFormat,

        // Business Background
        hasBusiness: formData.hasBusiness,
        businessName: formData.businessName || "",
        expectations: formData.expectations,

        // Payment Information
        paymentMethod: formData.paymentMethod,
        paymentReceiptNumber: formData.paymentReceiptNumber || "",

        // Fees
        registrationFee: REGISTRATION_FEE,
        courseFee:
          COURSE_FEES[formData.deliveryFormat as keyof typeof COURSE_FEES],
        totalAmount: calculateTotal(),

        // Agreement
        agreedToTerms,
        agreedToRefund,
        signature,
        signatureDate,

        // Metadata
        receiptNumber,
      };

      // Use the single API endpoint
      const response = await fetch("/api/enrollment/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      setEmailSent(result.emailSent);
      setSubmitSuccess(true);

      setTimeout(() => {
        resetForm();
        onClose();
      }, 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setFormErrors({
        submit:
          error.message ||
          "There was an error submitting your enrollment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      program: "Commercial Perfumery Masterclass (2 Weeks)",
      deliveryFormat: "online",
      hasBusiness: "no",
      businessName: "",
      expectations: "",
      paymentMethod: "bank-transfer",
      proofOfPayment: null,
      paymentReceiptNumber: "",
    });
    setAgreedToTerms(false);
    setAgreedToRefund(false);
    setSignature("");
    setSignatureDate(new Date().toISOString().split("T")[0]);
    setFormErrors({});
    setSubmitSuccess(false);
    setEmailSent(false);
    setApplicationPaid(false);
    setTotalPaid(false);
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

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, isSubmitting]);

  const steps = [
    {
      title: "Personal Information",
      icon: User,
      component: (
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-[#691C33] rounded-xl border ${
                formErrors.fullName ? "border-red-500" : "border-[#691C33]/30"
              } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base`}
              placeholder="Enter your full name (as it will appear on certificate)"
            />
            {formErrors.fullName && (
              <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
            )}
          </div>

          {/* Phone & Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-[#691C33] rounded-xl border ${
                  formErrors.phoneNumber
                    ? "border-red-500"
                    : "border-[#691C33]/30"
                } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base`}
                placeholder="+234 911 264 4027"
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.phoneNumber}
                </p>
              )}
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
                className={`w-full px-4 py-3 text-[#691C33] rounded-xl border ${
                  formErrors.email ? "border-red-500" : "border-[#691C33]/30"
                } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base`}
                placeholder="you@example.com"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
          </div>

          {/* Date of Birth & Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-4 py-3 text-[#691C33] rounded-xl border ${
                  formErrors.dateOfBirth
                    ? "border-red-500"
                    : "border-[#691C33]/30"
                } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base`}
              />
              {formErrors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.dateOfBirth}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                City / Country *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`px-4 py-3 text-[#691C33] rounded-xl border ${
                    formErrors.city ? "border-red-500" : "border-[#691C33]/30"
                  } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base`}
                  placeholder="City"
                />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`px-4 py-3 text-[#691C33] rounded-xl border ${
                    formErrors.country
                      ? "border-red-500"
                      : "border-[#691C33]/30"
                  } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base`}
                >
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {(formErrors.city || formErrors.country) && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.city || formErrors.country}
                </p>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Course Selection",
      icon: GraduationCap,
      component: (
        <div className="space-y-6">
          {/* Program */}
          <div>
            <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
              Program *
            </label>
            <div className="bg-[#691C33]/5 rounded-xl p-4 border border-[#691C33]/20">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-[#691C33]" />
                <span className="text-[#691C33] font-semibold">
                  Commercial Perfumery Masterclass (2 Weeks)
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Format */}
          <div>
            <label className="block text-[#691C33] font-medium mb-4 text-sm md:text-base">
              Delivery Format *
            </label>
            {formErrors.deliveryFormat && (
              <p className="text-red-500 text-sm mb-2">
                {formErrors.deliveryFormat}
              </p>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRadioChange("deliveryFormat", "in-class")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.deliveryFormat === "in-class"
                    ? "border-[#691C33] bg-[#691C33]/10"
                    : "border-[#691C33]/30 hover:border-[#691C33]"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-lg font-bold mb-2 ${
                      formData.deliveryFormat === "in-class"
                        ? "text-[#691C33]"
                        : "text-[#691C33]/70"
                    }`}
                  >
                    In-Class (Physical)
                  </div>
                  <div className="text-[#691C33] font-bold text-xl">
                    ₦650,000
                  </div>
                  <div className="text-sm text-[#691C33]/60 mt-2">
                    Hands-on training in Abuja
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRadioChange("deliveryFormat", "online")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.deliveryFormat === "online"
                    ? "border-[#691C33] bg-[#691C33]/10"
                    : "border-[#691C33]/30 hover:border-[#691C33]"
                }`}
              >
                <div className="text-center">
                  <div
                    className={`text-lg font-bold mb-2 ${
                      formData.deliveryFormat === "online"
                        ? "text-[#691C33]"
                        : "text-[#691C33]/70"
                    }`}
                  >
                    Live Online
                  </div>
                  <div className="text-[#691C33] font-bold text-xl">
                    ₦500,000
                  </div>
                  <div className="text-sm text-[#691C33]/60 mt-2">
                    Live interactive sessions from anywhere
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Registration Fee Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-800 font-bold mb-1">
                  Registration Fee Required
                </h4>
                <p className="text-blue-700 text-sm">
                  A <span className="font-bold">₦20,000 registration fee</span>{" "}
                  is required to secure your spot. This fee is included in the
                  total tuition payment.
                </p>
              </div>
            </div>
          </div>

          {/* Course Features */}
          <div className="bg-[#691C33]/5 rounded-xl p-4 border border-[#691C33]/20">
            <h4 className="text-[#691C33] font-bold mb-3">What's Included:</h4>
            <ul className="space-y-2">
              {[
                "Student Handbook & Workbook",
                "All Course Materials",
                "Certificate of Completion",
                "WhatsApp Group Access",
                "Direct Instructor Support",
                "Lifetime Access to Updates",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm md:text-base"
                >
                  <CheckCircle className="w-4 h-4 text-[#691C33]" />
                  <span className="text-[#691C33]/90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Business Background",
      icon: Briefcase,
      component: (
        <div className="space-y-6">
          {/* Business Experience */}
          <div>
            <label className="block text-[#691C33] font-medium mb-4 text-sm md:text-base">
              Do you currently have a fragrance or beauty business? *
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleRadioChange("hasBusiness", "yes")}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  formData.hasBusiness === "yes"
                    ? "border-[#691C33] bg-[#691C33]/10 text-[#691C33]"
                    : "border-[#691C33]/30 text-[#691C33]/70 hover:border-[#691C33]"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleRadioChange("hasBusiness", "no")}
                className={`flex-1 py-3 rounded-xl border-2 transition-all ${
                  formData.hasBusiness === "no"
                    ? "border-[#691C33] bg-[#691C33]/10 text-[#691C33]"
                    : "border-[#691C33]/30 text-[#691C33]/70 hover:border-[#691C33]"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Business Name (Conditional) */}
          {formData.hasBusiness === "yes" && (
            <div>
              <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-3 text-[#691C33] rounded-xl border border-[#691C33]/30 focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base"
                placeholder="Enter your business name"
              />
            </div>
          )}

          {/* Expectations */}
          <div>
            <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
              What do you hope to gain from this program? *
            </label>
            <textarea
              name="expectations"
              value={formData.expectations}
              onChange={handleChange}
              rows={4}
              className={`w-full px-4 py-3 text-[#691C33] rounded-xl border ${
                formErrors.expectations
                  ? "border-red-500"
                  : "border-[#691C33]/30"
              } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base resize-none`}
              placeholder="Share your goals and expectations..."
            />
            {formErrors.expectations && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.expectations}
              </p>
            )}
          </div>

          {/* Program Benefits */}
          <div className="bg-[#691C33]/5 rounded-xl p-4 border border-[#691C33]/20">
            <h4 className="text-[#691C33] font-bold mb-3">You'll Learn:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Understanding fragrance oil grades (A, B, C, diffuser, burning)",
                "Top, middle, and base notes explained in simple terms",
                "How fragrance houses produce different grades",
                "Choosing the right oil for each product type",
                "Supplier Sourcing & Pricing",
                "Branding and packaging fundamentals",
                "Business Launch Planning",
                "Pricing, costing & profit calculation",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#691C33]"></div>
                  <span className="text-[#691C33]/90 text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Payment Information",
      icon: DollarSign,
      component: (
        <div className="space-y-6">
          {/* Payment Breakdown */}
          <div>
            <label className="block text-[#691C33] font-medium mb-4 text-sm md:text-base">
              Payment Breakdown
            </label>
            <div className="bg-[#691C33]/5 rounded-xl p-4 border border-[#691C33]/20 space-y-3">
              {/* Registration Fee */}
              <div className="flex justify-between items-center pb-3 border-b border-[#691C33]/10">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#691C33]" />
                  <span className="text-[#691C33]">Registration Fee</span>
                </div>
                <div className="text-right">
                  <div className="text-[#691C33] font-bold">
                    {formatCurrency(REGISTRATION_FEE)}
                  </div>
                  <div className="text-xs text-red-600 font-medium">
                    Non-refundable
                  </div>
                </div>
              </div>

              {/* Course Fee */}
              <div className="flex justify-between items-center pb-3 border-b border-[#691C33]/10">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#691C33]" />
                  <span className="text-[#691C33]">
                    {formData.deliveryFormat === "in-class"
                      ? "In-Class Course Fee"
                      : "Online Course Fee"}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[#691C33] font-bold">
                    {formatCurrency(
                      COURSE_FEES[
                        formData.deliveryFormat as keyof typeof COURSE_FEES
                      ] || 0
                    )}
                  </div>
                  <div className="text-xs text-[#691C33]/60">
                    {formData.deliveryFormat === "in-class"
                      ? "Physical training"
                      : "Online live sessions"}
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2 bg-[#691C33]/10 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#691C33]" />
                  <span className="text-[#691C33] font-bold text-lg">
                    Total Amount Due
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[#691C33] font-bold text-xl">
                    {formatCurrency(calculateTotal())}
                  </div>
                  <div className="text-xs text-[#691C33]/60">
                    Payable in full
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Confirmation */}
          <div>
            <label className="block text-[#691C33] font-medium mb-4 text-sm md:text-base">
              Payment Method *
            </label>
            {formErrors.paymentMethod && (
              <p className="text-red-500 text-sm mb-2">
                {formErrors.paymentMethod}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                  className={`py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.paymentMethod === method.value
                      ? "border-[#691C33] bg-[#691C33]/10 text-[#691C33]"
                      : "border-[#691C33]/30 text-[#691C33]/70 hover:border-[#691C33]"
                  }`}
                >
                  <method.icon className="w-6 h-6" />
                  <span>{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bank Details (if bank transfer) */}
          {formData.paymentMethod === "bank-transfer" && (
            <div className="bg-[#691C33]/5 rounded-xl p-4 border border-[#691C33]/20">
              <h4 className="text-[#691C33] font-bold mb-3 flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Bank Transfer Details:
              </h4>
              <div className="space-y-3 text-sm md:text-base">
                <div className="bg-white p-3 rounded-lg border border-[#691C33]/20">
                  <div className="flex justify-between">
                    <span className="text-[#691C33]/70">Bank Name:</span>
                    <span className="text-[#691C33] font-medium">
                      Guaranty Trust Bank
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#691C33]/70">Account Name:</span>
                    <span className="text-[#691C33] font-medium">
                      The House of Tutu Perfumery Academy
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#691C33]/70">Account Number:</span>
                    <span className="text-[#691C33] font-medium">
                      0123456789
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-800 font-bold">
                      Amount to Pay:
                    </span>
                    <span className="text-yellow-800 font-bold text-lg">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                  <p className="text-yellow-700 text-sm mt-2">
                    <span className="font-bold">Important:</span> Pay the exact
                    total amount shown above. Include your full name as payment
                    reference.
                  </p>
                </div>

                {/* Total Payment Confirmation Checkbox */}
                <div className="flex items-start gap-3 mt-4">
                  <input
                    type="checkbox"
                    id="totalPaid"
                    checked={totalPaid}
                    onChange={(e) => setTotalPaid(e.target.checked)}
                    className={`mt-1 w-5 h-5 text-[#691C33] rounded ${
                      formErrors.totalPayment
                        ? "border-red-500"
                        : "border-[#691C33]"
                    } focus:ring-[#691C33]/20`}
                  />
                  <label
                    htmlFor="totalPaid"
                    className="text-[#691C33] text-sm md:text-base"
                  >
                    I confirm that I have paid the total amount of{" "}
                    <span className="font-bold">
                      {formatCurrency(calculateTotal())}
                    </span>{" "}
                    (including ₦20,000 non-refundable registration fee)
                  </label>
                </div>
                {formErrors.totalPayment && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.totalPayment}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Proof of Payment Upload */}
          <div>
            <label className="block text-[#691C33] font-medium mb-2 text-sm md:text-base">
              Proof of Payment *
            </label>
            {formErrors.proofOfPayment && (
              <p className="text-red-500 text-sm mb-2">
                {formErrors.proofOfPayment}
              </p>
            )}
            <div
              className={`border-2 border-dashed ${
                formErrors.proofOfPayment
                  ? "border-red-500"
                  : "border-[#691C33]/30"
              } rounded-xl p-6 text-center hover:border-[#691C33] transition-colors cursor-pointer`}
              onClick={handleFileUploadClick}
            >
              <Upload className="w-12 h-12 text-[#691C33]/50 mx-auto mb-3" />
              <input
                ref={fileInputRef}
                type="file"
                name="proofOfPayment"
                onChange={handleChange}
                className="hidden"
                id="proofOfPayment"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              />
              <div>
                <div className="text-[#691C33] font-medium mb-2">
                  Upload proof of payment
                </div>
                <div className="text-[#691C33]/60 text-sm mb-3">
                  Upload screenshot/photo of payment receipt (PDF, JPG, PNG -
                  Max 5MB)
                </div>
                <div className="bg-[#691C33] text-white px-6 py-2 rounded-lg inline-block hover:bg-[#691C33]/90 transition-colors">
                  Choose File
                </div>
              </div>
              {formData.proofOfPayment && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">File uploaded:</span>
                    <span className="text-sm">
                      {formData.proofOfPayment.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Terms & Agreement",
      icon: FileText,
      component: (
        <div className="space-y-6">
          {/* Success Message */}
          {submitSuccess && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-green-800 font-bold text-xl mb-3">
                    Enrollment Successful
                  </h4>

                  {/* Email Confirmation */}
                  {emailSent && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 text-blue-700 mb-2">
                        <Mail className="w-5 h-5" />
                        <span className="font-bold">
                          Email Confirmation Sent
                        </span>
                      </div>
                      <p className="text-blue-700 text-sm">
                        A detailed confirmation email has been sent to{" "}
                        <span className="font-bold">{formData.email}</span>{" "}
                        with:
                      </p>
                      <ul className="text-blue-700 text-sm mt-2 space-y-1">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Enrollment receipt and details</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Course schedule and access instructions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>WhatsApp group invitation link</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>Next steps and preparation guide</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center gap-2 text-purple-700 mb-2">
                      <Phone className="w-5 h-5" />
                      <span className="font-bold">Need Assistance</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-purple-700 text-sm">
                        Our enrollment team is ready to help you:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div className="bg-white p-3 rounded-lg border border-purple-100">
                          <div className="flex items-center gap-2 font-bold text-purple-800 mb-1">
                            <Phone className="w-4 h-4" />
                            <span>Call Us</span>
                          </div>
                          <div className="text-lg font-bold text-purple-700">
                            +234 901 234 5678
                          </div>
                          <div className="flex items-center gap-1 text-xs text-purple-600">
                            <Clock className="w-3 h-3" />
                            <span>Monday - Friday, 9AM - 5PM</span>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-purple-100">
                          <div className="flex items-center gap-2 font-bold text-purple-800 mb-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp</span>
                          </div>
                          <div className="text-lg font-bold text-purple-700">
                            +234 911 264 4027
                          </div>
                          <div className="flex items-center gap-1 text-xs text-purple-600">
                            <ShieldCheck className="w-3 h-3" />
                            <span>24/7 Enrollment Support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <h5 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      What happens next
                    </h5>
                    <ol className="text-amber-700 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <span>
                          Our team will verify your payment within 24 hours
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <span>
                          You will receive course access credentials via email
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <span>
                          Join the exclusive WhatsApp group for students
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          4
                        </div>
                        <span>
                          Attend the orientation session (date/time will be
                          shared)
                        </span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Student Agreement */}
          <div className="bg-[#691C33]/5 rounded-xl p-4 border border-[#691C33]/20 max-h-60 overflow-y-auto">
            <h4 className="text-[#691C33] font-bold mb-3">
              Student Agreement Summary
            </h4>
            <div className="space-y-3 text-sm md:text-base">
              {[
                "Attend classes regularly and participate actively",
                "Submit assignments and final project on time",
                "Maintain professionalism and respect",
                "Follow all academy policies and rules",
                "Complete all assignments with original work",
                "Attend at least 80% of classes for certification",
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

          {/* Refund Policy Summary */}
          <div className="bg-[#691C33]/5 rounded-xl p-4 border border-[#691C33]/20">
            <h4 className="text-[#691C33] font-bold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Refund Policy Summary
            </h4>
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[#691C33]/90">
                  <span className="font-bold">Registration Fee (₦20,000)</span>{" "}
                  - Non-refundable under any circumstances
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-[#691C33]/90">
                  <span className="font-bold">70% course fee refund</span> - 7+
                  days before start
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-[#691C33]/90">
                  <span className="font-bold">50% course fee refund</span> - 3-6
                  days before start
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[#691C33]/90">
                  <span className="font-bold">No course fee refund</span> -
                  Within 48 hours of start
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-[#691C33]/20">
                <p className="text-[#691C33]/80 italic text-sm">
                  Once program begins, no refunds except documented medical
                  emergencies (partial credit may be offered).
                </p>
              </div>
            </div>
          </div>

          {/* Agreement Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className={`mt-1 w-5 h-5 text-[#691C33] rounded ${
                  formErrors.agreedToTerms
                    ? "border-red-500"
                    : "border-[#691C33]"
                } focus:ring-[#691C33]/20`}
              />
              <label
                htmlFor="agreeTerms"
                className="text-[#691C33] text-sm md:text-base"
              >
                I have read and agree to the Student Agreement terms and
                conditions listed above.
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
                className={`mt-1 w-5 h-5 text-[#691C33] rounded ${
                  formErrors.agreedToRefund
                    ? "border-red-500"
                    : "border-[#691C33]"
                } focus:ring-[#691C33]/20`}
              />
              <label
                htmlFor="agreeRefund"
                className="text-[#691C33] text-sm md:text-base"
              >
                I understand and accept the Refund Policy, including the{" "}
                <span className="font-bold text-red-600">
                  non-refundable ₦20,000 registration fee
                </span>
                .
              </label>
            </div>
            {formErrors.agreedToRefund && (
              <p className="text-red-500 text-sm ml-8">
                {formErrors.agreedToRefund}
              </p>
            )}
          </div>

          {/* Digital Signature */}
          <div>
            <label className="block text-[#691C33] font-medium mb-4 text-sm md:text-base">
              Digital Signature *
            </label>
            <div className="border-2 border-[#691C33]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="w-5 h-5 text-[#691C33]" />
                <span className="text-[#691C33] font-medium">Sign below</span>
              </div>

              {/* Full Name Verification */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-700 text-sm mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">
                    Your registered full name:
                  </span>
                </div>
                <div className="text-blue-800 font-bold text-lg">
                  {formData.fullName || "Not provided yet"}
                </div>
                <p className="text-blue-600 text-xs mt-1">
                  Your signature must match this name exactly
                </p>
              </div>

              {/* Signature Input with Alex Brush Font */}
              <div className="mb-4">
                <label className="block text-[#691C33] font-medium mb-2 text-sm">
                  Type your full name as signature:
                </label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border bg-white ${
                    formErrors.signature
                      ? "border-red-500"
                      : "border-[#691C33]/30"
                  } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base ${
                    alexBrush.className
                  } text-2xl text-[#691C33]`}
                  placeholder="Your signature appears here"
                />

                {/* Signature Preview */}
                {signature && (
                  <div className="mt-2 p-3 bg-gradient-to-r from-[#691C33]/5 to-[#691C33]/10 rounded-lg border border-[#691C33]/20">
                    <div className="text-[#691C33]/70 text-xs mb-1">
                      Signature Preview:
                    </div>
                    <div
                      className={`text-3xl text-[#691C33] ${alexBrush.className} text-center py-2 border-b border-[#691C33]/20`}
                    >
                      {signature}
                    </div>
                    <div className="flex justify-between items-center mt-2 text-xs text-[#691C33]/60">
                      <span>Date: {signatureDate}</span>
                      <span>
                        Status:{" "}
                        {formData.fullName.toLowerCase() ===
                        signature.toLowerCase() ? (
                          <span className="text-green-600 font-medium">
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
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.signature}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-[#691C33] font-medium mb-2 text-sm">
                  Date:
                </label>
                <input
                  type="date"
                  value={signatureDate}
                  onChange={(e) => setSignatureDate(e.target.value)}
                  className={`w-full px-4 py-3 text-[#691C33] rounded-xl border ${
                    formErrors.signatureDate
                      ? "border-red-500"
                      : "border-[#691C33]/30"
                  } focus:border-[#691C33] focus:ring-2 focus:ring-[#691C33]/20 outline-none transition-all text-sm md:text-base`}
                  readOnly
                />
                <p className="text-[#691C33]/60 text-xs mt-1">
                  Today's date is automatically set
                </p>
                {formErrors.signatureDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.signatureDate}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Final Confirmation */}
          <div className="bg-gradient-to-r from-[#691C33]/5 to-[#691C33]/10 border border-[#691C33]/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-[#691C33] flex-shrink-0" />
              <div>
                <h4 className="text-[#691C33] font-bold mb-2">
                  Important Notice
                </h4>
                <p className="text-[#691C33] text-sm">
                  By submitting this enrollment form, you acknowledge that:
                </p>
                <ul className="text-[#691C33] text-sm mt-2 space-y-1 list-disc list-inside">
                  <li>
                    You have paid the full amount of{" "}
                    <strong>{formatCurrency(calculateTotal())}</strong>
                  </li>
                  <li>₦20,000 registration fee is non-refundable</li>
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white rounded-2xl md:rounded-3xl shadow-2xl flex flex-col">
              {/* Pattern Background */}
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `url('/pattern.png')`,
                  backgroundSize: "300px",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat",
                }}
              />

              {/* Header */}
              <div className="relative bg-[#691C33] p-4 md:p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 md:w-12 md:h-12">
                      <Image
                        src="/logo-white.png"
                        alt="The House of Tutu Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-white text-lg md:text-xl font-bold">
                        THE HOUSE OF TUTU
                      </h2>
                      <p className="text-white/80 text-sm">Perfumery Academy</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80 text-sm">
                      Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-white font-medium">
                      {steps[currentStep - 1].title}
                    </span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
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

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 form-content">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#691C33]/10 flex items-center justify-center">
                      {(() => {
                        const IconComponent = steps[currentStep - 1].icon;
                        return (
                          <IconComponent className="w-5 h-5 text-[#691C33]" />
                        );
                      })()}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#691C33]">
                      {steps[currentStep - 1].title}
                    </h3>
                  </div>
                  {CurrentStepComponent}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-[#691C33]/10">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="px-6 py-3 text-[#691C33] font-medium border-2 border-[#691C33] rounded-xl hover:bg-[#691C33]/5 transition-colors disabled:opacity-50"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={isSubmitting}
                    className={`px-8 py-3 font-medium rounded-xl flex items-center justify-center gap-3 min-w-[180px] ${
                      !isSubmitting
                        ? "bg-[#691C33] text-white hover:bg-[#691C33]/90"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    } transition-colors`}
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
                        <span>Submit Enrollment</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <svg
                          className="w-5 h-5"
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

              {/* Footer */}
              <div className="relative bg-[#691C33]/5 p-4 border-t border-[#691C33]/10">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-[#691C33]">₦20K</div>
                    <div className="text-[#691C33]/70 text-xs">Reg Fee</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#691C33]">100%</div>
                    <div className="text-[#691C33]/70 text-xs">Practical</div>
                  </div>
                  <div className="border-x border-[#691C33]/20">
                    <div className="text-lg font-bold text-[#691C33]">24/7</div>
                    <div className="text-[#691C33]/70 text-xs">Support</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#691C33]">
                      {formatCurrency(calculateTotal())}
                    </div>
                    <div className="text-[#691C33]/70 text-xs">Total</div>
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
