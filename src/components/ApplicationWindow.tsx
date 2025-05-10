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
        className="border border-[#888888] rounded-md shadow-md"
      >
        <div className="flex flex-col bg-white h-full">
          <div
            id="top-bar"
            className="bg-[#e3e3e3] bg-[repeating-linear-gradient(to_bottom,#e3e3e3,#e3e3e3_1px,#d8d8d8_1px,#d8d8d8_2px)] grid grid-cols-[60px_auto] text-black"
          >
            <div className="flex" style={{ height: TOP_BAR_HEIGHT }}>
              <button
                onClick={handleCloseButtonClick}
                className="w-3 h-3 rounded-full bg-[#ff5f57] mx-1 my-auto border border-[#e33e32]"
              ></button>
              <button
                onClick={handleHideButtonClick}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] mx-1 my-auto border border-[#e09e1d]"
              ></button>
              <button className="w-3 h-3 rounded-full bg-[#28c941] mx-1 my-auto border border-[#14ae2c]"></button>
            </div>
            <div className="align-center select-none text-sm font-medium flex items-center justify-center">
              {displayName}
            </div>
          </div>
          <div className="flex-grow bg-white border-t border-[#d1d1d1]">
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
};
