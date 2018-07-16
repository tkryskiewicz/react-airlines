import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { Airport } from "../Airport";
import { Route } from "../Route";
import { withForm } from "../withForm";
import { RouteSelectorWrapped as RouteSelector } from "./RouteSelector";

const RouteSelectorWrapped = withForm(RouteSelector);

storiesOf("RouteSelector", module)
  .add("default", () => (
    <RouteSelectorWrapped
      airports={[
        new Airport("WRO", "Wrocław", ["DUB"]),
        new Airport("DUB", "Dublin", ["WRO"]),
      ]}
      isRequired={boolean("Required", true)}
      isDisabled={boolean("Disabled", false)}
      value={new Route()}
      onChange={action("onChange")}
    />
  ))
  .add("empty", () => (
    <RouteSelectorWrapped
      airports={[]}
      isRequired={boolean("Required", true)}
      isDisabled={boolean("Disabled", false)}
      value={new Route()}
      onChange={action("onChange")}
    />
  ));
