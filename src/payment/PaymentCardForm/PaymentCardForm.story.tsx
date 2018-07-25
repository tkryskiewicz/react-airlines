import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { withForm } from "ra-core";

import { PaymentCard } from "../PaymentCard";
import { PaymentCardFormWrapped as PaymentCardForm } from "./PaymentCardForm";

const PaymentCardFormWrapped = withForm(PaymentCardForm);

storiesOf("payment/PaymentCardForm", module)
  .add("default", () => (
    <PaymentCardFormWrapped
      cardTypes={[]}
      required={boolean("Required", true)}
      disabled={boolean("Disabled", false)}
      value={new PaymentCard()}
      onChange={action("onChange")}
    />
  ));
