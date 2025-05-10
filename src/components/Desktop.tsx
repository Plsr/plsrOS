import { DesktopIcon } from "./DesktopIcon";
import { TaksBar } from "./TaskBar";

type Props = {
  children?: React.ReactNode;
};

export const Desktop = ({ children }: Props) => {
  return (
    <>
      <div className="relative bg-[#008080] w-screen h-screen">
        {children}
        <div className="z-1 absolute top-0 left-0 right-0 bottom-0 gap-6 p-4 grid grid-cols-[repeat(auto-fill,_60px)] grid-rows-[repeat(auto-fill,_60px)] w-full h-full">
          <DesktopIcon name="Calculator" id="calculator" />
        </div>
      </div>
      <TaksBar />
    </>
  );
};
