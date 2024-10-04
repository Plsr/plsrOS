import { useContext } from "react";
import { ApplicationIds } from "../util/applicationsManifest";
import { OpenProgramsDispatchContext } from "./OpenProgramsContext";
import { useDoubleClick } from "@zattoo/use-double-click";

type Props = {
  name: string;
  id: ApplicationIds;
};

export const DesktopIcon = ({ name, id }: Props) => {
  const dispatch = useContext(OpenProgramsDispatchContext);

  const doubleClick = useDoubleClick(() => {
    if (!dispatch) {
      return null;
    }

    dispatch({ type: "open", id });
  });

  return (
    <button onClick={doubleClick} className="w-full h-full bg-green-500">
      {name}
    </button>
  );
};
