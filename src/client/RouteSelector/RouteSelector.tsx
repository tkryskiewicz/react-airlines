import { Form, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";

import { messages } from "ra-shared";

import { Airport } from "../Airport";
import { Route } from "../Route";
import { routeSelectorMessages } from "./messages";

export interface RouteSelectorProps extends FormComponentProps {
  airports: Airport[];
  isRequired?: boolean;
  isDisabled?: boolean;
  value: Route;
  onChange?: (value: Route) => void;
}

export class RouteSelector extends React.Component<RouteSelectorProps & InjectedIntlProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    const origin = this.props.airports.find((a) => a.code === this.props.value.origin);

    const destinations = origin ? this.props.airports.filter((a) => origin.hasRouteTo(a.code)) : [];

    return (
      <div>
        <Form.Item
          label={<FormattedMessage {...routeSelectorMessages.originLabel} />}
          required={this.props.isRequired}
        >
          {getFieldDecorator("origin", {
            rules: [
              { required: this.props.isRequired, message: formatMessage(messages.emptyError) },
            ],
          })(
            <Select
              style={{ width: "100%" }}
              placeholder={<FormattedMessage {...routeSelectorMessages.originPlaceholder} />}
              notFoundContent={<FormattedMessage {...routeSelectorMessages.originNoData} />}
              disabled={this.props.isDisabled}
              onChange={this.onOriginChange}
            >
              {this.props.airports.map(this.mapAirportToOption)}
            </Select>,
          )}
        </Form.Item>
        <Form.Item
          label={<FormattedMessage {...routeSelectorMessages.destinationLabel} />}
          required={this.props.isRequired}
        >
          {getFieldDecorator("destination", {
            rules: [
              { required: this.props.isRequired, message: formatMessage(messages.emptyError) },
            ],
          })(
            <Select
              style={{ width: "100%" }}
              placeholder={<FormattedMessage {...routeSelectorMessages.destinationPlaceholder} />}
              notFoundContent={<FormattedMessage {...routeSelectorMessages.destinationNoData} />}
              disabled={this.props.isDisabled}
              onChange={this.onDestinationChange}
            >
              {destinations.map(this.mapAirportToOption)}
            </Select>,
          )}
        </Form.Item>
      </div>
    );
  }

  private mapAirportToOption(airport: Airport) {
    return (
      <Select.Option key={airport.code} value={airport.code}>
        {airport.name}
      </Select.Option>
    );
  }

  private onOriginChange = (v: SelectValue) => {
    if (!this.props.onChange) {
      return;
    }

    const originCode = v.toString();

    let destinationCode = this.props.value.destination;

    const origin = this.props.airports.find((a) => a.code === originCode);

    if (origin && !origin.hasRouteTo(destinationCode)) {
      destinationCode = "";

      this.props.form.setFieldsValue({
        destination: undefined,
      });
    }

    const value = new Route(originCode, destinationCode);

    this.props.onChange(value);
  }

  private onDestinationChange = (v: SelectValue) => {
    if (!this.props.onChange) {
      return;
    }

    const originCode = this.props.value.origin;
    const destinationCode = v.toString();

    const value = new Route(originCode, destinationCode);

    this.props.onChange(value);
  }
}

export const RouteSelectorWrapped = injectIntl(RouteSelector);
