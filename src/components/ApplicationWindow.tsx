import { useContext } from "react";
import Draggable from "react-draggable";
import { OpenProgramsDispatchContext } from "./OpenProgramsContext";
import { ApplicationIds } from "../util/applicationsManifest";
import { XIcon } from "lucide-react";

type ApplicationWindowProps = {
  children: React.ReactElement;
  applicationId: ApplicationIds;
  displayName: string;
  index: number;
};

export type ApplicationWindowChildProps = Omit<
  ApplicationWindowProps,
  "children"
>;

const SIZE = { width: 300, height: 200 };

export const ApplicationWindow = ({
  children,
  index,
  applicationId,
  displayName,
}: ApplicationWindowProps) => {
  const dispatch = useContext(OpenProgramsDispatchContext);

  const handleClick = () => {
    dispatch!({ type: "focus", id: applicationId });
  };

  const handleCloseButtonClick = () => {
    dispatch!({ type: "close", id: applicationId });
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
          <div className="bg-stone-200 grid grid-cols-2 text-black">
            <div className="flex">
              <button onClick={handleCloseButtonClick}>
                <XIcon className="width-3 height-3" />
              </button>
            </div>
            <div id="top-bar" className="align-center">
              {displayName}
            </div>
          </div>
          {children}
        </div>
      </div>
    </Draggable>
  );
};
