import {
  ApplicationWindow,
  ApplicationWindowChildProps,
} from "./ApplicationWindow";

export const BarApp = ({
  index,
  applicationId,
  displayName,
}: ApplicationWindowChildProps) => {
  return (
    <ApplicationWindow
      index={index}
      applicationId={applicationId}
      displayName={displayName}
    >
      <div className="p-4 bg-white inline-block text-black">Bar</div>
    </ApplicationWindow>
  );
};
