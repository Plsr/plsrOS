import { useContext } from "react";
import { Desktop } from "./Desktop";
import {
  OpenProgramsContext,
  OpenProgramsDispatchContext,
} from "./OpenProgramsContext";
import { applicationsManifest } from "../util/applicationsManifest";

export const OS = () => {
  const openPrograms = useContext(OpenProgramsContext);
  const dispatch = useContext(OpenProgramsDispatchContext);

  return (
    <Desktop>
      {openPrograms.map((p) => {
        const AppComponent = applicationsManifest[p.id].component;
        return <AppComponent key={p.id} position={p.position} />;
      })}
    </Desktop>
  );
};
