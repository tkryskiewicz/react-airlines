import { Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";

import { Address } from "../Address";
import { Country } from "../Country";

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

    return (
      <>
        <Form.Item label="Address 1">
          {getFieldDecorator("addressLine1", {
            rules: [
              { required: this.props.required, message: FieldEmptyMessage },
            ],
          })(
            <Input
              maxLength={50}
              placeholder="e.g. 21 Sun Lane"
            />,
          )}
        </Form.Item>
        <Form.Item label="Address 2">
          {getFieldDecorator("addressLine2")(
            <Input
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
            >
              {this.props.countries.map(this.renderCountry)}
            </Select>,
          )}
        </Form.Item>
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
}
