import { useContext } from "react";
import Draggable from "react-draggable";
import { OpenProgramsDispatchContext } from "./OpenProgramsContext";
import { ApplicationIds } from "../util/applicationsManifest";

export type ApplicationWindowProps = {
  children: React.ReactElement;
  applicationId: ApplicationIds;
  index: number;
};

const SIZE = { width: 300, height: 200 };

export const ApplicationWindow = ({
  children,
  index,
  applicationId,
}: ApplicationWindowProps) => {
  const dispatch = useContext(OpenProgramsDispatchContext);
  const handleClick = () => {
    console.log("Will focus application: ", applicationId);
    dispatch!({ type: "focus", id: applicationId });
  };

  return (
    <Draggable
      onStart={handleClick}
      bounds="parent"
      axis="both"
      defaultPosition={{ x: 0, y: 0 }}
      handle="#top-bar"
    >
      <div
        style={{
          height: SIZE.height,
          width: SIZE.width,
          zIndex: index ?? 1,
          position: "relative",
        }}
      >
        <div className="flex flex-col bg-white h-full shadow-lg">
          <div id="top-bar" className="bg-stone-200">
            Top Bar
          </div>
          {children}
        </div>
      </div>
    </Draggable>
  );
};
