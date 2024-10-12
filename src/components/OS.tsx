import { useContext } from "react";
import { Desktop } from "./Desktop";
import { OpenProgramsContext } from "./OpenProgramsContext";
import { applicationsManifest } from "../util/applicationsManifest";

export const OS = () => {
  const openPrograms = useContext(OpenProgramsContext);

  return (
    <Desktop>
      {openPrograms.map((p) => {
        if (p.hidden) {
          return null;
        }

        const AppComponent = applicationsManifest[p.id].component;
        return (
          <AppComponent
            key={p.id}
            index={p.index}
            applicationId={p.id}
            displayName={p.displayName}
          />
        );
      })}
    </Desktop>
  );
};
