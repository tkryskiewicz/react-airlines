import { Button, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

export const withForm = <P extends FormComponentProps>(Component: React.ComponentType<P>) => {
  return Form.create()(
    (props: P) => {
      const onSubmit = (event: React.FormEvent<any>) => {
        event.preventDefault();

        props.form.validateFields();
      };

      return (
        <Form onSubmit={onSubmit}>
          <Component form={props.form} {...props} />
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      );
    },
  );
};
