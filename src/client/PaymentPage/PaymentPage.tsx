import { Button, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

import { Address } from "../Address";
import { AddressForm } from "../AddressForm";

interface PaymentPageState {
  billingAddress: Address;
}

export class PaymentPage extends React.Component<FormComponentProps, PaymentPageState> {
  constructor(props: FormComponentProps) {
    super(props);

    this.state = {
      billingAddress: new Address(),
    };
  }

  public render() {
    return (
      <>
        <h1>
          Payment page
        </h1>
        <Form onSubmit={this.onPay}>
          <AddressForm
            form={this.props.form}
            required={true}
            value={this.state.billingAddress}
            onChange={this.onBillingAddressChange}
          />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              Pay
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }

  private onBillingAddressChange = (billingAddress: Address) => {
    this.setState({
      billingAddress,
    });
  }

  private onPay = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.form.validateFields((errors) => {
      if (!errors) {
        // tslint:disable-next-line
        console.log("Payment successful");
      }
    });
  }
}

export const PaymentPageWrapped = Form.create()(PaymentPage);
