import { Position } from "../types/shared";
import { ApplicationWindow } from "./ApplicationWindow";

type Props = {
  position?: Position;
};

export const FooApp = ({ position }: Props) => {
  return (
    <ApplicationWindow position={position}>
      <div className="p-4 bg-white inline-block text-black">Foo</div>
    </ApplicationWindow>
  );
};
