import { ApplicationWindowChildProps } from "../components/ApplicationWindow";
import { BarApp } from "../components/BarApp";
import { FooApp } from "../components/FooApp";

export type ApplicationIds = "foo" | "bar";
type ApplicationContract = {
  component: (props: ApplicationWindowChildProps) => JSX.Element;
  displayName: string;
};
type ApplicationsManifest = { [key in ApplicationIds]: ApplicationContract };
export const applicationsManifest: ApplicationsManifest = {
  foo: {
    component: FooApp,
    displayName: "Foo",
  },
  bar: {
    component: BarApp,
    displayName: "Bar",
  },
};
