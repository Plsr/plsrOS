export const CalculatorButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="w-full relative border border-[#aaa] p-3 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center justify-center bg-[#EBEBEB] rounded-[3px]"
      onClick={onClick}
    >
      {/* Top glare */}
      <div className="absolute left-[1px] right-[1px] top-[1px] h-[5px] bg-gradient-to-b from-[#F6F6F6] from-25% to-[rgba(247,247,247,0.42)]"></div>

      {/* Content */}
      <div className="z-10 text-black text-shadow text-xs">{children}</div>

      {/* Bottom glare */}
      <div className="absolute left-[1px] right-[1px] bottom-[1px] h-[5px] bg-gradient-to-t from-[#F6F6F6] from-25% to-[rgba(247,247,247,0.42)]"></div>
    </div>
  );
};
