import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { OpenProgramsContext } from "./OpenProgramsContext";

export const TaksBar = () => {
  const openPrograms = useContext(OpenProgramsContext);
  return (
    <div className="z-[9999] absolute bottom-0 left-0 right-0 h-[50px] bg-white text-black flex">
      <StartButton />
      <div className="flex px-1 gap-2">
        {openPrograms.map((openProgram) => (
          <TaksBarItem key={openProgram.id}>
            {openProgram.displayName}
          </TaksBarItem>
        ))}
      </div>
      <TimeWidget />
    </div>
  );
};

type TaskBarItemProps = {
  children: React.ReactNode;
};

const TaksBarItem = ({ children }: TaskBarItemProps) => {
  return (
    <div className="my-1 flex items-center border px-4 min-w-48">
      {children}
    </div>
  );
};

const StartButton = () => {
  return (
    <div className="font-bold h-full px-4 bg-slate-700 text-slate-50 flex items-center">
      Start
    </div>
  );
};

const TimeWidget = () => {
  const [time, setTime] = useState(format(new Date(), "pp"));

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(format(new Date(), "pp"));
    }, 1000);

    return () => clearInterval(tick);
  });

  return (
    <div className="tabular-nums border-l border-l-gray-200 h-full px-4 flex justify-center items-center ml-auto">
      {time}
    </div>
  );
};
