import { createContext, Dispatch, useReducer } from "react";

type ReducerAction = {
  type: "open" | "close";
  id: string;
};

export const OpenProgramsContext = createContext<Program[]>([]);
export const OpenProgramsDispatchContext =
  createContext<Dispatch<ReducerAction> | null>(null);

type Props = {
  children: React.ReactNode;
};

type Program = {
  id: string;
};

export const OpenProgramsProvider = ({ children }: Props) => {
  const reducer = (openPrograms: Program[], action: ReducerAction) => {
    switch (action.type) {
      case "open": {
        return [...openPrograms, { id: action.id }];
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
    { id: crypto.randomUUID() as string } as Program,
    { id: crypto.randomUUID() as string } as Program,
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
