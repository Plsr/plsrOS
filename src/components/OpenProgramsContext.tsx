import { createContext, Dispatch, useReducer } from "react";
import { ApplicationIds } from "../util/applicationsManifest";
import { Position } from "../types/shared";

type ReducerAction = {
  type: "open" | "close" | "focus";
  id: ApplicationIds;
};

export const OpenProgramsContext = createContext<Program[]>([]);
export const OpenProgramsDispatchContext =
  createContext<Dispatch<ReducerAction> | null>(null);

type Props = {
  children: React.ReactNode;
};

type Program = {
  id: ApplicationIds;
  position: Position;
  index: number;
};

export const OpenProgramsProvider = ({ children }: Props) => {
  const reducer = (openPrograms: Program[], action: ReducerAction) => {
    switch (action.type) {
      case "open": {
        return [...openPrograms, { id: action.id, position: { x: 0, y: 0 } }];
      }
      case "close": {
        return openPrograms.filter((program) => program.id !== action.id);
      }
      case "focus": {
        const openProgramsCopy = [...openPrograms];
        const focusCandidateIndex = openProgramsCopy.findIndex(
          (program) => program.id === action.id
        );

        const focusCandidate = openProgramsCopy[focusCandidateIndex];

        const oldIndex = focusCandidate.index;

        console.log(focusCandidate);
        focusCandidate.index = openProgramsCopy.length;

        openProgramsCopy.forEach((program) => {
          if (program.index > oldIndex) {
            program.index--;
          }
        });

        return openProgramsCopy;
      }
      default: {
        return [] as Program[];
      }
    }
  };

  const initialPrograms = [
    {
      id: "foo",
      position: {
        y: 20,
        x: 20,
      },
      index: 0,
    } as Program,
    {
      id: "bar",
      position: {
        y: 60,
        x: 60,
      },
      index: 1,
    } as Program,
  ];

  const [openPrograms, openProgramsDispatch] = useReducer(
    reducer,
    initialPrograms
  );

  return (
    <OpenProgramsContext.Provider value={openPrograms}>
      <OpenProgramsDispatchContext.Provider value={openProgramsDispatch}>
        {children}
      </OpenProgramsDispatchContext.Provider>
    </OpenProgramsContext.Provider>
  );
};
