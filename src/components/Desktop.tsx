import { DesktopIcon } from "./DesktopIcon";

type Props = {
  children?: React.ReactNode;
};

export const Desktop = ({ children }: Props) => {
  return (
    <div className="relative bg-blue-200 w-screen h-screen">
      {children}
      <div className="z-1 absolute top-0 left-0 right-0 bottom-0 gap-3 p-3 grid grid-cols-[repeat(auto-fill,_60px)] grid-rows-[repeat(auto-fill,_60px)] w-full h-full">
        <DesktopIcon name="Foo" id="foo" />
        <DesktopIcon name="Bar" id="bar" />
      </div>
    </div>
  );
};
