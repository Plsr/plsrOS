import { ApplicationWindowProps } from "../components/ApplicationWindow";
import { BarApp } from "../components/BarApp";
import { FooApp } from "../components/FooApp";

export type ApplicationIds = "foo" | "bar";
type ApplicationContract = {
  component: (props: Omit<ApplicationWindowProps, "children">) => JSX.Element;
};
type ApplicationsManifest = { [key in ApplicationIds]: ApplicationContract };
export const applicationsManifest: ApplicationsManifest = {
  foo: {
    component: FooApp,
  },
  bar: {
    component: BarApp,
  },
};
