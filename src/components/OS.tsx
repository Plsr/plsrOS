import { useContext } from "react";
import { Desktop } from "./Desktop";
import { OpenProgramsContext } from "./OpenProgramsContext";
import { applicationsManifest } from "../util/applicationsManifest";
import { ApplicationWindow } from "./ApplicationWindow";

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
          <ApplicationWindow
            index={p.index}
            applicationId={p.id}
            displayName={p.displayName}
            defaultPosition={p.lastPosition}
          >
            <AppComponent key={p.id} />
          </ApplicationWindow>
        );
      })}
    </Desktop>
  );
};
