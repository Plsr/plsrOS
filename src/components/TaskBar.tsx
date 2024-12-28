import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Menu, Item, useContextMenu } from "react-contexify";
import {
  OpenProgramsContext,
  OpenProgramsDispatchContext,
} from "./OpenProgramsContext";
import "react-contexify/ReactContexify.css";
import { ApplicationIds } from "../util/applicationsManifest";

export const TaksBar = () => {
  const openPrograms = useContext(OpenProgramsContext);
  return (
    <div className="z-[9999] absolute bottom-0 left-0 right-0 h-[50px] bg-white text-black flex">
      <StartButton />
      <div className="flex px-1 gap-2">
        {openPrograms.map((openProgram) => (
          <TaksBarItem programId={openProgram.id} key={openProgram.id}>
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
  programId: ApplicationIds;
};

const MENU_ID = "context_menu";

const TaksBarItem = ({ children, programId }: TaskBarItemProps) => {
  const dispatch = useContext(OpenProgramsDispatchContext);
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  const handleItemClick = () => {
    dispatch!({ type: "focus", id: programId });
  };

  const handleRightClick = (event: any) => {
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
        className="my-1 flex items-center border px-4 min-w-48"
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
