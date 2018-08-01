import { Button, Form, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { PaymentCard, PaymentCardForm, PaymentCardService, PaymentCardType } from "ra-payment";
import { Address, AddressForm, Country, HonorificTitles, PassengerName, PassengerNameForm } from "ra-shared";
import { AppState } from "ra-store";
import { BookingAction, changePassengerName, changePayment } from "ra-store/booking";

import { CountryService } from "../CountryService";

export interface PaymentPageProps extends FormComponentProps {
  passengerName: PassengerName;
  onPassengerNameChange?: (value: PassengerName) => void;
  paymentCard: PaymentCard;
  billingAddress: Address;
  onPaymentChange?: (paymentCard: PaymentCard, billingAddress: Address) => void;
}

interface PaymentPageState {
  countries: Country[];
  paymentCardTypes: PaymentCardType[];
}

export class PaymentPage extends React.Component<PaymentPageProps, PaymentPageState> {
  private countryService = new CountryService();
  private paymentCardService = new PaymentCardService();

  constructor(props: PaymentPageProps) {
    super(props);

    this.state = {
      countries: [],
      paymentCardTypes: [],
    };
  }

  public async componentDidMount() {
    try {
      const [countries, paymentCardTypes] = await Promise.all([
        this.countryService.getAll(),
        this.paymentCardService.getAllCardTypes(),
      ]);

      countries.sort((a, b) => a.name.localeCompare(b.name));
      paymentCardTypes.sort((a, b) => a.name.localeCompare(b.name));

      this.setState({
        countries,
        paymentCardTypes,
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
            value={this.props.passengerName}
            onChange={this.onPassengerNameChange}
          />
          <h2>
            Payment method
          </h2>
          <PaymentCardForm
            form={this.props.form}
            cardTypes={this.state.paymentCardTypes}
            required={true}
            value={this.props.paymentCard}
            onChange={this.onPaymentCardChange}
          />
          <h2>
            Billing address
          </h2>
          <AddressForm
            form={this.props.form}
            countries={this.state.countries}
            required={true}
            value={this.props.billingAddress}
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
    if (this.props.onPassengerNameChange) {
      this.props.onPassengerNameChange(passengerName);
    }
  }

  private onPaymentCardChange = (paymentCard: PaymentCard, callback: () => void) => {
    if (this.props.onPaymentChange) {
      this.props.onPaymentChange(paymentCard, this.props.billingAddress);
    }

    callback();
  }

  private onBillingAddressChange = (billingAddress: Address, callback: () => void) => {
    if (this.props.onPaymentChange) {
      this.props.onPaymentChange(this.props.paymentCard, billingAddress);
    }

    callback();
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

const mapStateToProps = (state: AppState): Pick<PaymentPageProps, "passengerName" | "paymentCard" | "billingAddress"> => {
  const { passengerName, paymentCard, billingAddress } = state.booking;

  return {
    billingAddress,
    passengerName,
    paymentCard,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<BookingAction>): Pick<PaymentPageProps, "onPassengerNameChange" | "onPaymentChange"> => ({
  onPassengerNameChange: (value) => dispatch(changePassengerName(value)),
  onPaymentChange: (paymentCard, billingAddress) => dispatch(changePayment(paymentCard, billingAddress)),
});

export const PaymentPageConnected = connect(mapStateToProps, mapDispatchToProps)(PaymentPageWrapped);
