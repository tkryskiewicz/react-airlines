import { DatePicker, Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import * as Moment from "moment";
import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";

import { PaymentCard } from "../PaymentCard";
import { paymentCardFormMessages } from "./messages";

export interface PaymentCardFormProps extends FormComponentProps {
  required?: boolean;
  disabled?: boolean;
  value: PaymentCard;
  onChange?: (value: PaymentCard) => void;
}

export class PaymentCardForm extends React.Component<PaymentCardFormProps & InjectedIntlProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    return (
      <>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.cardNumberLabel} />}>
          {getFieldDecorator("cardNumber", {
            rules: [
              { required: this.props.required, message: formatMessage(paymentCardFormMessages.cardNumberEmptyError) },
            ],
          })(
            <Input
              name="cardNumber"
              placeholder={formatMessage(paymentCardFormMessages.cardNumberPlaceholder)}
              maxLength={20}
              disabled={this.props.disabled}
              onChange={this.onInputChange}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.cardTypeLabel} />}>
          {getFieldDecorator("cardType", {
            rules: [
              { required: this.props.required, message: formatMessage(paymentCardFormMessages.cardTypeEmptyError) },
            ],
          })(
            <Select
              placeholder={<FormattedMessage {...paymentCardFormMessages.cardTypePlaceholder} />}
              notFoundContent={<FormattedMessage {...paymentCardFormMessages.cardTypeNoData} />}
              disabled={this.props.disabled}
              onChange={this.onCardTypeChange}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.expiryDateLabel} />}>
          {getFieldDecorator("expiryDate", {
            rules: [
              { required: this.props.required, message: formatMessage(paymentCardFormMessages.expiryDateEmptyError) },
            ],
          })(
            <DatePicker.MonthPicker
              placeholder={formatMessage(paymentCardFormMessages.expiryDatePlaceholder)}
              disabled={this.props.disabled}
              onChange={this.onExpiryDateChange}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.securityCodeLabel} />}>
          {getFieldDecorator("securityCode", {
            rules: [
              { required: this.props.required, message: formatMessage(paymentCardFormMessages.securityCodeEmptyError) },
            ],
          })(
            <Input
              name="securityCode"
              placeholder={formatMessage(paymentCardFormMessages.securityCodePlaceholder)}
              disabled={this.props.disabled}
              onChange={this.onInputChange}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.cardholdersNameLabel} />}>
          {getFieldDecorator("cardholdersName", {
            rules: [
              { required: this.props.required, message: formatMessage(paymentCardFormMessages.cardholdersNameEmptyError) },
            ],
          })(
            <Input
              name="cardholdersName"
              placeholder={formatMessage(paymentCardFormMessages.cardholdersNamePlaceholder)}
              disabled={this.props.disabled}
              onChange={this.onInputChange}
            />,
          )}
        </Form.Item>
      </>
    );
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.props.onChange) {
      return;
    }

    const value: any = this.props.value.clone();

    value[event.target.name] = event.target.value;

    this.props.onChange(value);
  }

  private onCardTypeChange = (v: SelectValue) => {
    if (!this.props.onChange) {
      return;
    }

    const value = this.props.value.clone();

    value.cardType = v.toString();

    this.props.onChange(value);
  }

  private onExpiryDateChange = (date: Moment.Moment) => {
    if (!this.props.onChange) {
      return;
    }

    const value = this.props.value.clone();

    value.expiryDate = date;

    this.props.onChange(value);
  }
}

export const PaymentCardFormWrapped = injectIntl(PaymentCardForm);
