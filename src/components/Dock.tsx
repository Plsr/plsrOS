import { useContext } from "react";
import { OpenProgramsDispatchContext } from "./OpenProgramsContext";

export const Dock = () => {
  const dispatch = useContext(OpenProgramsDispatchContext);

  const handleCalculatorClick = () => {
    dispatch!({ type: "open", id: "calculator" });
  };

  return (
    <div className="z-[9999] border-b-0 rounded-t-md absolute bottom-0 left-[50%] translate-x-[-50%] h-24 bg-[repeating-linear-gradient(to_bottom,#e3e3e380,#e3e3e380_1px,#d8d8d880_1px,#d8d8d880_2px)] backdrop-blur-sm flex items-center justify-center px-2 shadow-lg border border-[#d0d0d0]">
      <div
        className="h-16 w-16  mx-1 hover:scale-110 transition-transform duration-200 cursor-pointer flex items-center justify-center"
        onClick={handleCalculatorClick}
      >
        <img
          src="/public/appIcons/calculator.png"
          alt="Calculator"
          className="max-h-full max-w-full"
        />
      </div>
    </div>
  );
};
