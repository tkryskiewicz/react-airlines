import { Button, Form, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

import { PaymentCard, PaymentCardForm, PaymentCardType } from "ra-payment";
import { Address, AddressForm, Country, HonorificTitles, PassengerName, PassengerNameForm } from "ra-shared";

import { CountryService } from "../CountryService";

interface PaymentPageState {
  passengerName: PassengerName;
  countries: Country[];
  paymentCardTypes: PaymentCardType[];
  paymentCard: PaymentCard;
  billingAddress: Address;
}

export class PaymentPage extends React.Component<FormComponentProps, PaymentPageState> {
  private countryService = new CountryService();

  constructor(props: FormComponentProps) {
    super(props);

    this.state = {
      billingAddress: new Address(),
      countries: [],
      passengerName: new PassengerName(),
      paymentCard: new PaymentCard(),
      paymentCardTypes: [],
    };
  }

  public async componentDidMount() {
    try {
      const countries = await this.countryService.getAll();

      countries.sort((a, b) => a.name.localeCompare(b.name));

      this.setState({
        countries,
      });
    } catch (error) {
      message.error(`Loading resources failed - ${error}`);
    }
  }

  public render() {
    return (
      <>
        <h1>
          Payment page
        </h1>
        <Form onSubmit={this.onPay}>
          <h2>
            Passenger details
          </h2>
          <PassengerNameForm
            form={this.props.form}
            titles={HonorificTitles}
            required={true}
            value={this.state.passengerName}
            onChange={this.onPassengerNameChange}
          />
          <h2>
            Payment method
          </h2>
          <PaymentCardForm
            form={this.props.form}
            cardTypes={this.state.paymentCardTypes}
            required={true}
            value={this.state.paymentCard}
            onChange={this.onPaymentCardChange}
          />
          <h2>
            Billing address
          </h2>
          <AddressForm
            form={this.props.form}
            countries={this.state.countries}
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

  private onPassengerNameChange = (passengerName: PassengerName) => {
    this.setState({
      passengerName,
    });
  }

  private onPaymentCardChange = (paymentCard: PaymentCard) => {
    this.setState({
      paymentCard,
    });
  }

  private onBillingAddressChange = (billingAddress: Address, callback: () => void) => {
    this.setState({
      billingAddress,
    }, callback);
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
