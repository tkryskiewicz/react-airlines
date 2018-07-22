import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { PaymentCard } from "../PaymentCard";
import { PaymentCardTypes } from "../PaymentCardType";
import { withForm } from "../withForm";
import { PaymentCardFormWrapped as PaymentCardForm } from "./PaymentCardForm";

const PaymentCardFormWrapped = withForm(PaymentCardForm);

storiesOf("PaymentCardForm", module)
  .add("default", () => (
    <PaymentCardFormWrapped
      cardTypes={PaymentCardTypes}
      required={boolean("Required", true)}
      disabled={boolean("Disabled", false)}
      value={new PaymentCard("", "AX")}
      onChange={action("onChange")}
    />
  ));
