import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { PaymentCard } from "../PaymentCard";
import { withForm } from "../withForm";
import { PaymentCardFormWrapped as PaymentCardForm } from "./PaymentCardForm";

const PaymentCardFormWrapped = withForm(PaymentCardForm);

storiesOf("PaymentCardForm", module)
  .add("default", () => (
    <PaymentCardFormWrapped
      required={boolean("Required", true)}
      disabled={boolean("Disabled", false)}
      value={new PaymentCard()}
      onChange={action("onChange")}
    />
  ));
