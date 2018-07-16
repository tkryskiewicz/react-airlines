import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { Address } from "../Address";
import { withForm } from "../withForm";
import { AddressFormWrapped as AddressForm } from "./AddressForm";

const AddressFormWrapped = withForm(AddressForm);

storiesOf("AddressForm", module)
  .add("default", () => (
    <AddressFormWrapped
      countries={[]}
      required={boolean("Required", true)}
      value={new Address()}
      onChange={action("onChange")}
    />
  ));
