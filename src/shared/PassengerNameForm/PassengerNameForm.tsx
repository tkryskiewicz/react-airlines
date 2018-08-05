import { Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";

import { propOf } from "ra-core";

import { HonorificTitle, PassengerName } from "../PassengerName";
import { getTitleMessage, passengerNameFormMessages } from "./messages";

const NameMinLength = 2;
const NameMaxLength = 32;

export interface PassengerNameFormProps extends FormComponentProps {
  titles: HonorificTitle[];
  required?: boolean;
  disabled?: boolean;
  value: PassengerName;
  onChange?: (value: PassengerName) => void;
}

export class PassengerNameForm extends React.Component<PassengerNameFormProps & InjectedIntlProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    return (
      <>
        <Form.Item label={<FormattedMessage {...passengerNameFormMessages.titleLabel} />}>
          {getFieldDecorator(propOf<PassengerName>("title"), {
            rules: [
              {
                message: formatMessage(passengerNameFormMessages.titleEmptyError),
                required: this.props.required,
              },
            ],
          })(
            <Select
              placeholder={<FormattedMessage {...passengerNameFormMessages.titlePlaceholder} />}
              disabled={this.props.disabled}
              onChange={this.onTitleChange}
            >
              {this.props.titles.map(this.renderTitle)}
            </Select>,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...passengerNameFormMessages.firstNameLabel} />}>
          {getFieldDecorator(propOf<PassengerName>("firstName"), {
            rules: [
              {
                message: formatMessage(passengerNameFormMessages.firstNameEmptyError),
                required: this.props.required,
              },
              {
                message: formatMessage(passengerNameFormMessages.firstNameMinLengthError, { length: NameMinLength }),
                min: NameMinLength,
              },
              {
                max: NameMaxLength,
                message: formatMessage(passengerNameFormMessages.firstNameMaxLengthError, { length: NameMaxLength }),
              },
            ],
          })(
            <Input
              name={propOf<PassengerName>("firstName")}
              maxLength={50}
              placeholder={formatMessage(passengerNameFormMessages.firstNamePlaceholder)}
              disabled={this.props.disabled}
              onChange={this.onInputChange}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...passengerNameFormMessages.lastNameLabel} />}>
          {getFieldDecorator(propOf<PassengerName>("lastName"), {
            rules: [
              {
                message: formatMessage(passengerNameFormMessages.lastNameEmptyError),
                required: this.props.required,
              },
              {
                message: formatMessage(passengerNameFormMessages.lastNameMinLengthError, { length: NameMinLength }),
                min: NameMinLength,
              },
              {
                max: NameMaxLength,
                message: formatMessage(passengerNameFormMessages.lastNameMaxLengthError, { length: NameMaxLength }),
              },
            ],
          })(
            <Input
              name={propOf<PassengerName>("lastName")}
              maxLength={50}
              placeholder={formatMessage(passengerNameFormMessages.lastNamePlaceholder)}
              disabled={this.props.disabled}
              onChange={this.onInputChange}
            />,
          )}
        </Form.Item>
      </>
    );
  }

  private renderTitle(title: HonorificTitle) {
    return (
      <Select.Option key={title} value={title}>
        <FormattedMessage {...getTitleMessage(title)} />
      </Select.Option>
    );
  }

  private onTitleChange = (v: SelectValue) => {
    if (!this.props.onChange) {
      return;
    }

    const value = this.props.value.clone();

    value.title = v as HonorificTitle;

    this.props.onChange(value);
  }

  private onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.props.onChange) {
      return;
    }

    const value: any = this.props.value.clone();

    value[event.target.name] = event.target.value;

    this.props.onChange(value);
  }
}

export const PassengerNameFormWrapped = injectIntl(PassengerNameForm);
