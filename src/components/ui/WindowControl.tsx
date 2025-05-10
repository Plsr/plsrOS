export const WindowControl = ({
  color = "red",
  onClick,
}: {
  color?: "red" | "yellow" | "green";
  onClick?: () => void;
}) => {
  const colorStyles = {
    red: {
      main: "from-[#c4554a] to-[#e9836f]",
      border: "border-[#5b1d1d]",
      topHighlight: "from-[#d6cccc] to-[#c4554a]",
      bottomHighlight: "from-[#fdb4a7] to-[#d4695a]",
    },
    yellow: {
      main: "from-[#c49e4a] to-[#e9c46f]",
      border: "border-[#5b4d1d]",
      topHighlight: "from-[#d6d5cc] to-[#c49e4a]",
      bottomHighlight: "from-[#fddb7a] to-[#d4b15a]",
    },
    green: {
      main: "from-[#4ac455] to-[#6fe983]",
      border: "border-[#1d5b1d]",
      topHighlight: "from-[#ccd6cc] to-[#4ac455]",
      bottomHighlight: "from-[#a7fdb4] to-[#5ad469]",
    },
  };

  const styles = colorStyles[color];

  return (
    <div
      className={`block shadow-md relative w-[15px] h-[15px] bg-gradient-to-b ${styles.main} border ${styles.border} rounded-full ${onClick ? "cursor-pointer hover:brightness-110 active:brightness-90" : ""}`}
      onClick={onClick}
    >
      <div
        className={`absolute w-[9px] h-[6px] top-[1px] left-[2px] z-10 rounded-full bg-gradient-to-b ${styles.topHighlight}`}
      ></div>
      <div
        className={`absolute w-[10px] h-[6px] bottom-[1px] left-[2px] z-10 rounded-full bg-gradient-to-t ${styles.bottomHighlight}`}
      ></div>
    </div>
  );
};
