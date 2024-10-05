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

  if (appIcon) {
    return (
      <img
        className="cursor-pointer"
        onClick={doubleClick}
        src={`${APP_ICON_PATH}/${appIcon}`}
      />
    );
  }

  return (
    <button onClick={doubleClick} className="w-full h-full bg-green-500">
      {name}
    </button>
  );
};
