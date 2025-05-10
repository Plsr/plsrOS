import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CherryIcon } from "lucide-react";

export const TopBar = () => {
  const [time, setTime] = useState(format(new Date(), "EEE h:mm a"));

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(format(new Date(), "EEE h:mm a"));
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  return (
    <div className="shadow-lg text-shadow z-[9999] absolute top-0 left-0 right-0 h-[22px] bg-[#e3e3e3] bg-[repeating-linear-gradient(to_bottom,#e3e3e3,#e3e3e3_1px,#d8d8d8_1px,#d8d8d8_2px)] text-black flex items-center px-2 shadow-sm backdrop-blur-sm">
      <div className="flex items-center">
        <CherryIcon className="w-4 h-4" />
        <div className="ml-2 text-xs font-semibold">Finder</div>
      </div>
      <div className="flex gap-4 ml-4 text-xs">
        <div>File</div>
        <div>Edit</div>
        <div>View</div>
        <div>Go</div>
        <div>Window</div>
        <div>Help</div>
      </div>
      <div className="ml-auto text-xs font-medium">{time}</div>
    </div>
  );
};
