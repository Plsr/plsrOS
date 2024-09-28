import { useContext } from "react";
import { Desktop } from "./Desktop";
import { OpenProgramsContext } from "./OpenProgramsContext";
import { applicationsManifest } from "../util/applicationsManifest";

export const OS = () => {
  const openPrograms = useContext(OpenProgramsContext);

  // const dispatch = useContext(OpenProgramsDispatchContext);

  // TODO: Make sure the currently dragged window gets moved to the front of the stack
  return (
    <Desktop>
      {openPrograms.map((p) => {
        const AppComponent = applicationsManifest[p.id].component;
        return <AppComponent />;
      })}
    </Desktop>
  );
};
