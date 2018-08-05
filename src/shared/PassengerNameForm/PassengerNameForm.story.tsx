import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { withForm } from "ra-core";

import { HonorificTitles, PassengerName } from "../PassengerName";
import { PassengerNameFormWrapped as PassengerNameForm } from "./PassengerNameForm";

const PassengerNameFormWrapped = withForm(PassengerNameForm);

storiesOf("shared/PassengerNameForm", module)
  .add("default", () => (
    <PassengerNameFormWrapped
      titles={HonorificTitles}
      required={boolean("Required", true)}
      disabled={boolean("Disabled", false)}
      value={new PassengerName()}
      onChange={action("onChange")}
    />
  ));
