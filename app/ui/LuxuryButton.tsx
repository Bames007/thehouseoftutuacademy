// components/UI/LuxuryButton.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface LuxuryButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

export default function LuxuryButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  className = "",
  loading = false,
}: LuxuryButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "bg-transparent border-transparent hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={loading}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        relative overflow-hidden
      `}
    >
      {loading && <div className="absolute inset-0 loading-shimmer" />}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </motion.button>
  );
}
