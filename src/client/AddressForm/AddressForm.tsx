import { Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import * as React from "react";

import { Address } from "../Address";
import { Country, CountryRegion } from "../Country";

const FieldEmptyMessage = "This field is required";

export interface AddressFormProps extends FormComponentProps {
  countries: Country[];
  required?: boolean;
  value: Address;
  onChange?: (value: Address) => void;
}

export class AddressForm extends React.Component<AddressFormProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;

    const country = this.props.countries.find((c) => c.code === this.props.value.country);

    return (
      <>
        <Form.Item label="Address 1">
          {getFieldDecorator("addressLine1", {
            rules: [
              { required: this.props.required, message: FieldEmptyMessage },
            ],
          })(
            <Input
              name="addressLine1"
              maxLength={50}
              placeholder="e.g. 21 Sun Lane"
            />,
          )}
        </Form.Item>
        <Form.Item label="Address 2">
          {getFieldDecorator("addressLine2")(
            <Input
              name="addressLine2"
              maxLength={50}
              placeholder="e.g. Sun Land"
            />,
          )}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator("city", {
            rules: [
              { required: this.props.required, message: FieldEmptyMessage },
            ],
          })(
            <Input
              name="city"
              maxLength={50}
              placeholder="e.g. Dublin"
            />,
          )}
        </Form.Item>
        <Form.Item label="Postal code">
          {getFieldDecorator("postalCode", {
            rules: [
              { required: this.props.required, message: FieldEmptyMessage },
            ],
          })(
            <Input
              name="postalCode"
              maxLength={10}
              placeholder="e.g. 12345"
            />,
          )}
        </Form.Item>
        <Form.Item label="Country">
          {getFieldDecorator("country", {
            rules: [
              { required: this.props.required, message: FieldEmptyMessage },
            ],
          })(
            <Select
              style={{ width: "100%" }}
              placeholder="Select country"
              onChange={this.onCountryChange}
            >
              {this.props.countries.map(this.renderCountry)}
            </Select>,
          )}
        </Form.Item>
        {country && country.hasRegions && this.renderRegionSelection(country)}
      </>
    );
  }

  private renderCountry(country: Country) {
    return (
      <Select.Option key={country.code} value={country.code}>
        {country.name}
      </Select.Option>
    );
  }

  private onCountryChange = (val: SelectValue) => {
    if (!this.props.onChange) {
      return;
    }

    const value = this.props.value.clone();

    value.country = val.toString();

    if (value.region) {
      this.props.form.setFields({ region: "" });
    }

    value.region = "";

    this.props.onChange(value);
  }

  private renderRegionSelection(country: Country) {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form.Item label="Region">
        {getFieldDecorator("region", {
          rules: [
            { required: true, message: FieldEmptyMessage },
          ],
        })(
          <Select
            style={{ width: "100%" }}
            placeholder="Select region"
            onChange={this.onRegionChange}
          >
            {country.regions.map(this.renderRegion)}
          </Select>,
        )}
      </Form.Item>
    );
  }

  private renderRegion(region: CountryRegion) {
    return (
      <Select.Option key={region.code} value={region.code}>
        {region.name}
      </Select.Option>
    );
  }

  private onRegionChange = (val: SelectValue) => {
    if (!this.props.onChange) {
      return;
    }

    const value = this.props.value.clone();

    value.region = val.toString();

    this.props.onChange(value);
  }
}
