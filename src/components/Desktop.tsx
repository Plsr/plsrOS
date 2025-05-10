import { DesktopIcon } from "./DesktopIcon";
import { TaskBar } from "./TaskBar";
import { TopBar } from "./TopBar";

type Props = {
  children?: React.ReactNode;
};

export const Desktop = ({ children }: Props) => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden bg-[url('/wallpaper.png')] bg-cover bg-center">
        {children}
        <div className="absolute top-[22px] left-0 right-0 bottom-[38px] gap-6 p-4 grid grid-cols-[repeat(auto-fill,_80px)] grid-rows-[repeat(auto-fill,_80px)]">
          <DesktopIcon
            name="Calculator"
            id="calculator"
            appIcon="calculator.png"
          />
        </div>
      </div>
      <TopBar />
      <TaskBar />
    </>
  );
};
