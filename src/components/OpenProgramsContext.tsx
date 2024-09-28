import { createContext, Dispatch, useReducer } from "react";
import { ApplicationIds } from "../util/applicationsManifest";
import { Position } from "../types/shared";

type ReducerAction = {
  type: "open" | "close";
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
    } as Program,
    {
      id: "bar",
      position: {
        y: 60,
        x: 60,
      },
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
