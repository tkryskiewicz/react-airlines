import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FlightSearchWrapped } from "./FlightSearch";

storiesOf("FlightSearch", module)
  .add("default", () => (
    <FlightSearchWrapped
      onSearch={action("onSearch")}
    />
  ));
