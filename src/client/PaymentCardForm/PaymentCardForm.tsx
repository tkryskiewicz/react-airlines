import { DatePicker, Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import * as Moment from "moment";
import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";

import { PaymentCard } from "../PaymentCard";
import { PaymentCardType, SecurityCodeType } from "../PaymentCardType";
import { paymentCardFormMessages } from "./messages";

const DefaultCardType = new PaymentCardType("", "", 16, SecurityCodeType.CVV, 3);
const MaxExpiryDateYears = 20;

export interface PaymentCardFormProps extends FormComponentProps {
  cardTypes: PaymentCardType[];
  required?: boolean;
  disabled?: boolean;
  value: PaymentCard;
  onChange?: (value: PaymentCard) => void;
}

export class PaymentCardForm extends React.Component<PaymentCardFormProps & InjectedIntlProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    const cardType = this.props.cardTypes.find((ct) => ct.code === this.props.value.cardType) || DefaultCardType;

    return (
      <>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.cardNumberLabel} />}>
          {getFieldDecorator("cardNumber", {
            rules: [
              {
                message: formatMessage(paymentCardFormMessages.cardNumberEmptyError),
                required: this.props.required,
              },
              {
                len: cardType.cardNumberLength,
                message: formatMessage(paymentCardFormMessages.cardNumberLengthError, { length: cardType.cardNumberLength }),
              },
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
            >
              {this.props.cardTypes.map(this.renderCardType)}
            </Select>,
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
              disabledDate={this.disableExpiryDate}
              onChange={this.onExpiryDateChange}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.securityCodeLabel} />}>
          {getFieldDecorator("securityCode", {
            rules: [
              {
                message: formatMessage(paymentCardFormMessages.securityCodeEmptyError),
                required: this.props.required,
              },
              {
                len: cardType.securityCodeLength,
                message: formatMessage(paymentCardFormMessages.securityCodeLengthError, { length: cardType.securityCodeLength }),
              },
            ],
          })(
            <Input
              name="securityCode"
              placeholder={cardType.securityCodeType.toUpperCase()}
              maxLength={cardType.securityCodeLength}
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
              maxLength={50}
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

  private renderCardType(cardType: PaymentCardType) {
    return (
      <Select.Option key={cardType.code} value={cardType.code}>
        {cardType.name}
      </Select.Option>
    );
  }

  private onCardTypeChange = (v: SelectValue) => {
    if (!this.props.onChange) {
      return;
    }

    const value = this.props.value.clone();

    value.cardType = v.toString();

    this.props.onChange(value);
  }

  private disableExpiryDate = (current: Moment.Moment) => {
    return current && (current.isBefore(Moment(), "M") || current.isSameOrAfter(this.getMaxExpiryDate(), "M"));
  }

  private getMaxExpiryDate() {
    return Moment().add(MaxExpiryDateYears, "y");
  }

  private onExpiryDateChange = (date: Moment.Moment) => {
    if (!this.props.onChange) {
      return;
    }

    const value = this.props.value.clone();

    value.expiryDate = date.startOf("M");

    this.props.onChange(value);
  }
}

export const PaymentCardFormWrapped = injectIntl(PaymentCardForm);
