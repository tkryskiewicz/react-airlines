import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FlightSearchWrapped } from "./FlightSearch";

// FIXME
const noop = () => undefined;

storiesOf("FlightSearch", module)
  .add("default", () => (
    <FlightSearchWrapped
      airports={[]}
      onInit={noop}
      onSearch={action("onSearch")}
    />
  ));
