import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";
import {
  OpenProgramsContext,
  OpenProgramsDispatchContext,
} from "./OpenProgramsContext";
import "react-contexify/ReactContexify.css";
import { ApplicationIds } from "../util/applicationsManifest";
import { WindIcon } from "lucide-react";

export const TaskBar = () => {
  const openPrograms = useContext(OpenProgramsContext);
  return (
    <div className="z-[9999] absolute bottom-0 left-0 right-0 h-[38px] bg-[#c0c0c0] text-black flex border-t-2 border-[#ffffff] border-r-2 border-r-[#404040] border-b-2 border-b-[#404040] border-l-2 border-l-[#ffffff]">
      <StartButton />
      <div className="flex px-1 gap-1">
        {openPrograms.map((openProgram) => (
          <TaskBarItem programId={openProgram.id} key={openProgram.id}>
            {openProgram.displayName}
          </TaskBarItem>
        ))}
      </div>
      <TimeWidget />
    </div>
  );
};

type TaskBarItemProps = {
  children: React.ReactNode;
  programId: ApplicationIds;
};

const MENU_ID = "context_menu";

const TaskBarItem = ({ children, programId }: TaskBarItemProps) => {
  const dispatch = useContext(OpenProgramsDispatchContext);
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleItemClick = () => {
    dispatch!({ type: "focus", id: programId });
  };

  const handleRightClick = (event: React.MouseEvent) => {
    show({
      event,
    });
  };

  const handleCloseClick = () => {
    dispatch!({ type: "close", id: programId });
  };

  const handleMinimizeClick = () => {
    dispatch!({ type: "minimize", id: programId });
  };

  return (
    <>
      <div
        onClick={handleItemClick}
        onContextMenu={handleRightClick}
        className="my-1 flex items-center border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#404040] border-b-[#404040] bg-[#c0c0c0] px-2 min-w-28 text-sm font-sans"
      >
        {children}
      </div>
      <Menu id={MENU_ID}>
        <Item onClick={handleMinimizeClick}>Minimize</Item>
        <Item onClick={handleCloseClick}>Close</Item>
      </Menu>
    </>
  );
};

const StartButton = () => {
  return (
    <div className="font-bold h-full px-4 bg-[#c0c0c0] text-black flex items-center border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#404040] border-b-[#404040] mr-1 text-sm">
      <span className="mr-1">
        <WindIcon className="w-4 h-4" />
      </span>{" "}
      Start
    </div>
  );
};

const TimeWidget = () => {
  const [time, setTime] = useState(format(new Date(), "p"));

  useEffect(() => {
    const tick = setInterval(() => {
      setTime(format(new Date(), "p"));
    }, 1000);

    return () => clearInterval(tick);
  });

  return (
    <div className="tabular-nums border-t border-l border-t-[#404040] border-l-[#404040] border-r border-b border-r-[#ffffff] border-b-[#ffffff] bg-[#c0c0c0] h-full px-2 flex justify-center items-center ml-auto text-sm">
      {time}
    </div>
  );
};
