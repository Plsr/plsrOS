export const CalculatorInput = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="relative bg-[#F1FACA] border border-[#C3CAA3] shadow-[inset_0px_2px_2.5px_rgba(0,0,0,0.31)] rounded">
      {/* Glare element */}
      <div className="absolute h-5 left-[4px] right-[4px] top-[2px] bg-[#FBFEDD] rounded-sm" />
      <div className="text-right text-black text-lg z-10 relative mr-2  mb-4 mt-1">
        {children}
      </div>
    </div>
  );
};
