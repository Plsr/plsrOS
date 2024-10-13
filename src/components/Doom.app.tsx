import { useEffect, useRef, useState } from "react";
import { DosPlayer as Instance, DosPlayerFactoryType } from "js-dos";

declare const Dos: DosPlayerFactoryType;

interface PlayerProps {
  bundleUrl: string;
}

export const DoomApp = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [dos, setDos] = useState<Instance | null>(null);
  const bundleUrl =
    "https://cdn.dos.zone/original/2X/8/80ba33210cab4177158dde6f2ec9704de56c7dfc.jsdos";

  useEffect(() => {
    if (rootRef.current === null) {
      return;
    }

    const root = rootRef.current as HTMLDivElement;
    const instance = Dos(root, { style: "none" });
    setDos(instance);

    return () => {
      instance.stop();
      root.innerHTML = ""; //fix
    };
  }, [rootRef]);

  useEffect(() => {
    if (dos !== null) {
      dos.run(bundleUrl); // ci is returned
    }
  }, [dos, bundleUrl]);

  return (
    <div ref={rootRef} className="h-full w-full">
      Doom
    </div>
  );
};
