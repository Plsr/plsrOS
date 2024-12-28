import { useContext, useRef } from "react";
import Draggable from "react-draggable";
import { OpenProgramsDispatchContext } from "./OpenProgramsContext";
import { ApplicationIds } from "../util/applicationsManifest";
import { EyeOffIcon, XIcon } from "lucide-react";
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

const TOP_BAR_HEIGHT = 30;

export const ApplicationWindow = ({
  children,
  index,
  applicationId,
  displayName,
  aspectRatio = 1.6,
  defaultPosition = { x: 0, y: 0 },
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
    const lastPosition = getCurrentPosition();
    dispatch!({ type: "minimize", id: applicationId, lastPosition });
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
      >
        <div className="flex flex-col bg-white h-full shadow-lg">
          <div className="bg-stone-200 grid grid-cols-2 text-black">
            <div className="flex" style={{ height: TOP_BAR_HEIGHT }}>
              <button onClick={handleCloseButtonClick}>
                <XIcon className="w-5 h-5" />
              </button>
              <button onClick={handleHideButtonClick}>
                <EyeOffIcon className="w-4 h-4" />
              </button>
            </div>
            <div id="top-bar" className="align-center select-none">
              {displayName}
            </div>
          </div>
          {children}
        </div>
      </div>
    </Draggable>
  );
};
