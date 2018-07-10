import { Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { SelectValue } from "antd/lib/select";
import * as React from "react";
import { FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";

import { Address } from "../Address";
import { Country, CountryRegion, RegionType } from "../Country";
import { addressFormMessages } from "./messages";

export interface AddressFormProps extends FormComponentProps {
  countries: Country[];
  required?: boolean;
  value: Address;
  onChange?: (value: Address, callback: () => void) => void;
}

export class AddressForm extends React.Component<AddressFormProps & InjectedIntlProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    const country = this.props.countries.find((c) => c.code === this.props.value.country);

    return (
      <>
        <Form.Item label={<FormattedMessage {...addressFormMessages.addressLine1Label} />}>
          {getFieldDecorator("addressLine1", {
            rules: [
              { required: this.props.required, message: formatMessage(addressFormMessages.addressLine1EmptyError) },
            ],
          })(
            <Input
              name="addressLine1"
              maxLength={50}
              placeholder={formatMessage(addressFormMessages.addressLine1Placeholder)}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...addressFormMessages.addressLine2Label} />}>
          {getFieldDecorator("addressLine2")(
            <Input
              name="addressLine2"
              maxLength={50}
              placeholder={formatMessage(addressFormMessages.addressLine2Placeholder)}
            />,
          )}
        </Form.Item>
        <Form.Item label={<FormattedMessage {...addressFormMessages.cityLabel} />}>
          {getFieldDecorator("city", {
            rules: [
              { required: this.props.required, message: formatMessage(addressFormMessages.cityEmptyError) },
            ],
          })(
            <Input
              name="city"
              maxLength={50}
              placeholder={formatMessage(addressFormMessages.cityPlaceholder)}
            />,
          )}
        </Form.Item>
        {country && country.hasPostalCodes && this.renderPostalCode(country)}
        <Form.Item label={<FormattedMessage {...addressFormMessages.countryLabel} />}>
          {getFieldDecorator("country", {
            rules: [
              { required: this.props.required, message: formatMessage(addressFormMessages.countryEmptyError) },
            ],
          })(
            <Select
              style={{ width: "100%" }}
              placeholder={<FormattedMessage {...addressFormMessages.countryPlaceholder} />}
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

    this.props.onChange(value, this.revalidatePostalCode);
  }

  private renderRegionSelection(country: Country) {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    let messages = {
      emptyError: addressFormMessages.regionEmptyError,
      label: addressFormMessages.regionLabel,
      placeholder: addressFormMessages.regionPlaceholder,
    };

    switch (country.regionType) {
      case RegionType.State:
        messages = {
          emptyError: addressFormMessages.stateEmptyError,
          label: addressFormMessages.stateLabel,
          placeholder: addressFormMessages.statePlaceholder,
        };
        break;
      case RegionType.Province:
        messages = {
          emptyError: addressFormMessages.provinceEmptyError,
          label: addressFormMessages.provinceLabel,
          placeholder: addressFormMessages.provincePlaceholder,
        };
        break;
    }

    return (
      <Form.Item label={<FormattedMessage {...messages.label} />}>
        {getFieldDecorator("region", {
          rules: [
            { required: true, message: formatMessage(messages.emptyError) },
          ],
        })(
          <Select
            style={{ width: "100%" }}
            placeholder={<FormattedMessage {...messages.placeholder} />}
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

    this.props.onChange(value, () => undefined);
  }

  private renderPostalCode(country: Country) {
    const { getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;

    return (
      <Form.Item label={<FormattedMessage {...addressFormMessages.postalCodeLabel} />}>
        {getFieldDecorator("postalCode", {
          rules: [
            { required: country.isPostalCodeRequired, message: formatMessage(addressFormMessages.postalCodeEmptyError) },
          ],
        })(
          <Input
            name="postalCode"
            maxLength={10}
            placeholder={formatMessage(addressFormMessages.postalCodePlaceholder)}
          />,
        )}
      </Form.Item>
    );
  }

  private revalidatePostalCode() {
    // FIXME: we need to re-validate postal code after country change and render
    this.props.form.validateFields(["postalCode"], { force: true }, () => undefined);
  }
}

export const AddressFormWrapped = injectIntl(AddressForm);
