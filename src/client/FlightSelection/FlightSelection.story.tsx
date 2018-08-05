import { storiesOf } from "@storybook/react";
import * as Moment from "moment";
import * as React from "react";

import { Route } from "ra-shared";

import { FlightSelection } from "./FlightSelection";

storiesOf("FlightSelection", module)
  .add("default", () => (
    <FlightSelection
      departureDate={Moment()}
      route={new Route("WRO", "DUB")}
    />
  ));
