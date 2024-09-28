import { BarApp } from "../components/BarApp";
import { FooApp } from "../components/FooApp";

export type ApplicationIds = "foo" | "bar";
type ApplicationContract = {
  component: () => JSX.Element;
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
