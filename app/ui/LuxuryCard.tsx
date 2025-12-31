// components/UI/LuxuryCard.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LuxuryCardProps {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export default function LuxuryCard({
  children,
  hover = true,
  glow = false,
  className = "",
}: LuxuryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -8 } : {}}
      className={`
        luxury-card
        ${glow ? "hover-glow" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
