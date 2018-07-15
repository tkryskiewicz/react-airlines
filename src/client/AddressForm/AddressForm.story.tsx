import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Button, Form } from "antd";
import * as React from "react";

import { Address } from "../Address";
import { AddressFormProps, AddressFormWrapped as AddressForm } from "./AddressForm";

const AddressFormWrapped = Form.create()((props: AddressFormProps) => {
  const onSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();

    props.form.validateFields();
  };

  return (
    <Form onSubmit={onSubmit}>
      <AddressForm {...props} />
      <Button
        type="primary"
        htmlType="submit"
      >
        Submit
      </Button>
    </Form>
  );
});

storiesOf("AddressForm", module)
  .add("default", () => (
    <AddressFormWrapped
      countries={[]}
      required={true}
      onChange={action("onChange")}
      value={new Address()}
    />
  ));
