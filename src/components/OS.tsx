import { useContext } from "react";
import { BarApp } from "./BarApp";
import { Desktop } from "./Desktop";
import { FooApp } from "./FooApp";
import {
  OpenProgramsContext,
  OpenProgramsDispatchContext,
} from "./OpenProgramsContext";

export const OS = () => {
  const openPrograms = useContext(OpenProgramsContext);
  const dispatch = useContext(OpenProgramsDispatchContext);

  return (
    <Desktop>
      <FooApp />
      <BarApp />
      <div className="absolute text-black top-64 left-20">
        <>
          <h2>Open Programs</h2>
          {openPrograms.map((p) => (
            <div key={p.id}>
              {p.id}
              <p onClick={() => dispatch!({ type: "close", id: p.id })}>
                close
              </p>
            </div>
          ))}
          <button
            onClick={() => dispatch!({ type: "open", id: crypto.randomUUID() })}
            className="text-white"
          >
            Open new
          </button>
        </>
      </div>
    </Desktop>
  );
};
