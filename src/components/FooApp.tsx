import { ApplicationIds } from "../util/applicationsManifest";
import { ApplicationWindow } from "./ApplicationWindow";

type Props = {
  index: number;
  applicationId: ApplicationIds;
};

export const FooApp = ({ index, applicationId }: Props) => {
  return (
    <ApplicationWindow index={index} applicationId={applicationId}>
      <div className="p-4 bg-white inline-block text-black">Foo</div>
    </ApplicationWindow>
  );
};
