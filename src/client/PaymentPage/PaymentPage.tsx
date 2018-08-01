import { Button, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { PaymentCard, PaymentCardForm, PaymentCardType } from "ra-payment";
import { Address, AddressForm, Country, HonorificTitles, PassengerName, PassengerNameForm } from "ra-shared";
import { AppState } from "ra-store";
import { BookingAction, changePassengerName, changePayment } from "ra-store/booking";
import { loadCardTypes } from "ra-store/payments";
import { loadCountries } from "ra-store/shared";

export interface PaymentPageProps extends FormComponentProps {
  countries: Country[];
  paymentCardTypes: PaymentCardType[];
  onLoad?: () => void;
  passengerName: PassengerName;
  onPassengerNameChange?: (value: PassengerName) => void;
  paymentCard: PaymentCard;
  billingAddress: Address;
  onPaymentChange?: (paymentCard: PaymentCard, billingAddress: Address) => void;
}

export class PaymentPage extends React.Component<PaymentPageProps> {
  public async componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad();
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
            cardTypes={this.props.paymentCardTypes}
            required={true}
            value={this.props.paymentCard}
            onChange={this.onPaymentCardChange}
          />
          <h2>
            Billing address
          </h2>
          <AddressForm
            form={this.props.form}
            countries={this.props.countries}
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

type StateProp = "countries" | "paymentCardTypes" | "passengerName" | "paymentCard" | "billingAddress";

const mapStateToProps = (state: AppState): Pick<PaymentPageProps, StateProp> => {
  const { countries } = state.shared;
  const { cardTypes } = state.payments;
  const { passengerName, paymentCard, billingAddress } = state.booking;

  return {
    billingAddress,
    countries,
    passengerName,
    paymentCard,
    paymentCardTypes: cardTypes,
  };
};

type DispatchProp = "onLoad" | "onPassengerNameChange" | "onPaymentChange";

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, {}, BookingAction>): Pick<PaymentPageProps, DispatchProp> => ({
  onLoad: () => {
    // FIXME: this is not strictly typed, BookingAction is not enforced
    dispatch(loadCountries);
    dispatch(loadCardTypes);
  },
  onPassengerNameChange: (value) => dispatch(changePassengerName(value)),
  onPaymentChange: (paymentCard, billingAddress) => dispatch(changePayment(paymentCard, billingAddress)),
});

export const PaymentPageConnected = connect(mapStateToProps, mapDispatchToProps)(PaymentPageWrapped);
