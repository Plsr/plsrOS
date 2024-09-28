import Draggable from "react-draggable";

export type ApplicationWindowProps = {
  children: React.ReactElement;
};

const SIZE = { width: 300, height: 200 };

export const ApplicationWindow = ({ children }: ApplicationWindowProps) => {
  return (
    <Draggable bounds="parent" axis="both" defaultPosition={{ x: 0, y: 0 }}>
      <div
        style={{
          height: SIZE.height,
          width: SIZE.width,
        }}
      >
        <div className="flex flex-col bg-white h-full">
          <div className="bg-stone-200">Top Bar</div>
          {children}
        </div>
      </div>
    </Draggable>
  );
};
