import { useContext } from "react";
import { ApplicationIds } from "../util/applicationsManifest";
import { OpenProgramsDispatchContext } from "./OpenProgramsContext";
import { useDoubleClick } from "@zattoo/use-double-click";

const APP_ICON_PATH = "/appIcons";

type Props = {
  name: string;
  id: ApplicationIds;
  appIcon?: string;
};

export const DesktopIcon = ({ name, id, appIcon }: Props) => {
  const dispatch = useContext(OpenProgramsDispatchContext);

  const doubleClick = useDoubleClick(() => {
    if (!dispatch) {
      return null;
    }

    dispatch({ type: "open", id });
  });

  return (
    <div className="flex flex-col items-center w-16 cursor-pointer">
      {appIcon ? (
        <img
          className="w-15 h-15 mb-1"
          onClick={doubleClick}
          src={`${APP_ICON_PATH}/${appIcon}`}
        />
      ) : (
        <div
          onClick={doubleClick}
          className="w-10 h-10 mb-1 bg-[#c0c0c0] border-t border-l border-t-[#ffffff] border-l-[#ffffff] border-r border-b border-r-[#404040] border-b-[#404040] flex items-center justify-center"
        >
          <span className="text-xs">{name.charAt(0)}</span>
        </div>
      )}
      <span className="text-white text-shadow-sm text-xs text-center font-bold">
        {name}
      </span>
    </div>
  );
};
