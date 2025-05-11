import { ReactNode } from "react";

interface StripedBackgroundProps {
  children: ReactNode;
  className?: string;
}

export const StripedBackground = ({
  children,
  className = "",
}: StripedBackgroundProps) => {
  return (
    <div
      className={`bg-[#e3e3e3] bg-[repeating-linear-gradient(to_bottom,#e3e3e3,#e3e3e3_1px,#d8d8d8_1px,#d8d8d8_3px)] ${className}`}
    >
      {children}
    </div>
  );
};
