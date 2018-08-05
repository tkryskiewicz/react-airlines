import { DatePicker, Form, Input, Select } from "antd";
import { FormComponentProps, ValidationRule } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import * as Moment from "moment";
import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";

import { propOf } from "ra-core";

import { PaymentCard } from "../PaymentCard";
import { PaymentCardType, SecurityCodeType } from "../PaymentCardType";
import { paymentCardFormMessages } from "./messages";

const DefaultCardType = new PaymentCardType("", "", 16, /^[0-9]+$/, SecurityCodeType.CVV, 3);
const MaxExpiryDateYears = 20;

export interface PaymentCardFormProps extends FormComponentProps {
  cardTypes: PaymentCardType[];
  required?: boolean;
  disabled?: boolean;
  value: PaymentCard;
  onChange?: (value: PaymentCard, callback: () => void) => void;
}

export class PaymentCardForm extends React.Component<PaymentCardFormProps & InjectedIntlProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    const cardType = this.props.cardTypes.find((ct) => ct.code === this.props.value.cardType) || DefaultCardType;

    return (
      <>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.cardNumberLabel} />}>
          {getFieldDecorator(propOf<PaymentCard>("cardNumber"), {
            rules: [
              {
                message: formatMessage(paymentCardFormMessages.cardNumberEmptyError),
                required: this.props.required,
              },
              {
                len: cardType.cardNumberLength,
                message: formatMessage(paymentCardFormMessages.cardNumberLengthError, { length: cardType.cardNumberLength }),
              },
              {
                validator: this.validateCardNumber,
              },
            ],
          })(
            <Input
              name={propOf<PaymentCard>("cardNumber")}
              placeholder={formatMessage(paymentCardFormMessages.cardNumberPlaceholder)}
              maxLength={cardType.cardNumberLength}
              disabled={this.props.disabled}
              onChange={this.onInputChange}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.cardTypeLabel} />}>
          {getFieldDecorator(propOf<PaymentCard>("cardType"), {
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
          {getFieldDecorator(propOf<PaymentCard>("expiryDate"), {
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
          {getFieldDecorator(propOf<PaymentCard>("securityCode"), {
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
              name={propOf<PaymentCard>("securityCode")}
              placeholder={cardType.securityCodeType.toUpperCase()}
              maxLength={cardType.securityCodeLength}
              disabled={this.props.disabled}
              onChange={this.onInputChange}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...paymentCardFormMessages.cardholdersNameLabel} />}>
          {getFieldDecorator(propOf<PaymentCard>("cardholdersName"), {
            rules: [
              { required: this.props.required, message: formatMessage(paymentCardFormMessages.cardholdersNameEmptyError) },
            ],
          })(
            <Input
              name={propOf<PaymentCard>("cardholdersName")}
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

    this.props.onChange(value, () => undefined);
  }

  private validateCardNumber = (_rule: ValidationRule, value: string = "", callback: (errors?: string[]) => void) => {
    const errors = [];

    const cardType = this.props.cardTypes.find((ct) => ct.code === this.props.value.cardType);

    if (cardType && value.length === cardType.cardNumberLength && !cardType.cardNumberPattern.test(value)) {
      const message = this.props.intl.formatMessage(paymentCardFormMessages.cardNumberPatternError, { name: cardType.name });

      errors.push(message);
    }

    callback(errors);
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

    this.props.onChange(value, () => {
      this.props.form.validateFields([
        propOf<PaymentCard>("cardNumber"),
        propOf<PaymentCard>("securityCode"),
      ], { force: true }, () => undefined);
    });
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

    this.props.onChange(value, () => undefined);
  }
}

export const PaymentCardFormWrapped = injectIntl(PaymentCardForm);
