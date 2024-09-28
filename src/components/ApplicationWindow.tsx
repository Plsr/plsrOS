import { Position } from "../types/shared";

export type ApplicationWindowProps = {
  children: React.ReactElement;
  position?: Position;
};

const SIZE = { width: 300, height: 200 };

export const ApplicationWindow = ({
  children,
  position,
}: ApplicationWindowProps) => {
  const positionOrDefault = position ?? { x: 0, y: 0 };

  return (
    <div
      className="absolute"
      style={{
        top: positionOrDefault.y,
        left: positionOrDefault.x,
        height: SIZE.height,
        width: SIZE.width,
      }}
    >
      <div className="flex flex-col bg-white">
        <div className="bg-stone-200">Top Bar</div>
        {children}
      </div>
    </div>
  );
};
