import { useContext, useRef } from "react";
import Draggable from "react-draggable";
import { OpenProgramsDispatchContext } from "./OpenProgramsContext";
import { ApplicationIds } from "../util/applicationsManifest";
import { Position } from "../types/shared";

type ApplicationWindowProps = {
  children: React.ReactElement;
  applicationId: ApplicationIds;
  displayName: string;
  index: number;
  aspectRatio?: number;
  defaultPosition?: Position;
};

export type ApplicationWindowChildProps = Omit<
  ApplicationWindowProps,
  "children"
>;

const TOP_BAR_HEIGHT = 22;

export const ApplicationWindow = ({
  children,
  index,
  applicationId,
  displayName,
  aspectRatio = 1.6,
  defaultPosition = { x: 20, y: 20 },
}: ApplicationWindowProps) => {
  const dispatch = useContext(OpenProgramsDispatchContext);
  const appWindowRef = useRef<HTMLDivElement>(null);
  const DEFAULT_WIDTH = 600;
  const SIZE = {
    width: 600,
    height: DEFAULT_WIDTH / aspectRatio + TOP_BAR_HEIGHT,
  };

  const handleClick = () => {
    dispatch!({ type: "focus", id: applicationId });
  };

  const handleDragStop = () => {
    const lastPosition = getCurrentPosition();
    dispatch!({ type: "updatePosition", id: applicationId, lastPosition });
  };

  const handleCloseButtonClick = () => {
    dispatch!({ type: "close", id: applicationId });
  };

  const getCurrentPosition = () => {
    if (!appWindowRef.current) {
      throw new Error(
        `Expected appWindowRef to have a value but was ${appWindowRef.current}`
      );
    }

    const { x, y } = appWindowRef.current.getBoundingClientRect();
    return { x, y };
  };

  const handleHideButtonClick = () => {
    dispatch!({ type: "minimize", id: applicationId });
  };

  return (
    <Draggable
      onStart={handleClick}
      onStop={handleDragStop}
      bounds="parent"
      axis="both"
      defaultPosition={defaultPosition}
      handle="#top-bar"
    >
      <div
        ref={appWindowRef}
        style={{
          height: SIZE.height,
          width: SIZE.width,
          zIndex: index ?? 1,
          position: "relative",
        }}
        className="border-2 border-[#c0c0c0]"
      >
        <div className="flex flex-col bg-[#c0c0c0] h-full shadow-lg border-t-2 border-l-2 border-t-[#ffffff] border-l-[#ffffff] border-r-2 border-b-2 border-r-[#404040] border-b-[#404040]">
          <div className="bg-[#000080] grid grid-cols-[60px_auto] text-white">
            <div className="flex" style={{ height: TOP_BAR_HEIGHT }}>
              <button
                onClick={handleCloseButtonClick}
                className="px-1 py-0.5 bg-[#c0c0c0] text-black border border-t-[#ffffff] border-l-[#ffffff] border-r-[#404040] border-b-[#404040] text-xs font-bold mx-1 my-1"
              >
                X
              </button>
              <button
                onClick={handleHideButtonClick}
                className="px-1 py-0.5 bg-[#c0c0c0] text-black border border-t-[#ffffff] border-l-[#ffffff] border-r-[#404040] border-b-[#404040] text-xs font-bold my-1"
              >
                _
              </button>
            </div>
            <div
              id="top-bar"
              className="align-center select-none text-sm font-bold flex items-center"
            >
              {displayName}
            </div>
          </div>
          <div className="flex-grow border-t border-l border-t-[#808080] border-l-[#808080] border-r border-b border-r-[#ffffff] border-b-[#ffffff] bg-[#ffffff]">
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
