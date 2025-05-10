import { createContext, Dispatch, useReducer } from "react";
import {
  ApplicationIds,
  applicationsManifest,
} from "../util/applicationsManifest";
import { Position } from "../types/shared";

type ReducerAction =
  | {
      type: "open" | "close" | "focus" | "minimize";
      id: ApplicationIds;
    }
  | {
      type: "updatePosition";
      id: ApplicationIds;
      lastPosition: Position;
    };

export const OpenProgramsContext = createContext<Program[]>([]);
export const OpenProgramsDispatchContext =
  createContext<Dispatch<ReducerAction> | null>(null);

type Props = {
  children: React.ReactNode;
};

type Program = {
  id: ApplicationIds;
  displayName: string;
  index: number;
  focused: boolean;
  hidden?: boolean;
  lastPosition: Position;
};

export const OpenProgramsProvider = ({ children }: Props) => {
  const reducer = (openPrograms: Program[], action: ReducerAction) => {
    switch (action.type) {
      case "open": {
        // Program to be opened is already open, just bring it to top
        if (openPrograms.map((p) => p.id).includes(action.id)) {
          return focusProgram(action.id, openPrograms);
        }

        return [
          ...openPrograms,
          {
            id: action.id,
            index: 10 + openPrograms.length,
            lastPosition: { x: 20, y: 20 },
            displayName: applicationsManifest[action.id].displayName,
            focused: true,
          } as Program,
        ];
      }
      case "close": {
        return openPrograms.filter((program) => program.id !== action.id);
      }
      case "focus": {
        return focusProgram(action.id, openPrograms);
      }
      case "minimize": {
        return openPrograms.map((program) => {
          if (program.id !== action.id) {
            return program;
          }

          return {
            ...program,
            hidden: true,
          } as Program;
        });
      }
      case "updatePosition": {
        return openPrograms.map((program) => {
          if (program.id !== action.id) {
            return program;
          }

          return {
            ...program,
            lastPosition: action.lastPosition,
          } as Program;
        });
      }
      default: {
        return [] as Program[];
      }
    }
  };

  const [openPrograms, openProgramsDispatch] = useReducer(
    reducer,
    [] as Program[]
  );

  return (
    <OpenProgramsContext.Provider value={openPrograms}>
      <OpenProgramsDispatchContext.Provider value={openProgramsDispatch}>
        {children}
      </OpenProgramsDispatchContext.Provider>
    </OpenProgramsContext.Provider>
  );
};

function focusProgram(programId: string, openPrograms: Program[]) {
  const openProgramsCopy = [...openPrograms];
  const focusCandidateIndex = openProgramsCopy.findIndex(
    (program) => program.id === programId
  );

  const focusCandidate = openProgramsCopy[focusCandidateIndex];

  const oldIndex = focusCandidate.index;

  // We add 10 so that open widows always have a higher z-index than
  // our underlying desktop
  focusCandidate.index = openProgramsCopy.length + 10;
  focusCandidate.focused = true;
  focusCandidate.hidden = false;

  openProgramsCopy.forEach((program) => {
    if (program.index > oldIndex) {
      program.index--;
      program.focused = false;
    }
  });

  return openProgramsCopy;
}
