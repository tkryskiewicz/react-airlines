import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import { Button, Form } from "antd";
import * as React from "react";

import { Airport } from "../Airport";
import { Route } from "../Route";
import { RouteSelector, RouteSelectorProps } from "./RouteSelector";

const RouteSelectorWrapped = Form.create()((props: RouteSelectorProps) => {
  const onSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();

    props.form.validateFields();
  };

  return (
    <Form onSubmit={onSubmit}>
      <RouteSelector {...props} />
      <Button
        type="primary"
        htmlType="submit"
      >
        Submit
      </Button>
    </Form>
  );
});

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
  ));
