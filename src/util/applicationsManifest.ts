import { BarApp } from "../components/BarApp";
import { DoomApp } from "../components/Doom.app";
import { FooApp } from "../components/FooApp";

export type ApplicationIds = "foo" | "bar" | "doom";

type ApplicationContract = {
  component: () => JSX.Element;
  displayName: string;
  appIcon?: string;
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
  doom: {
    component: DoomApp,
    displayName: "Doom",
    appIcon: "doom",
  },
};
