import { defineMessages } from "react-intl";

import { messages } from "../messages";

export const addressFormMessages = defineMessages({
  addressLine1EmptyError: {
    ...messages.emptyError,
    id: "addressForm.addressLine1.error.empty",
  },
  addressLine1Label: {
    defaultMessage: "Address 1",
    id: "addressForm.addressLine1.label",
  },
  addressLine1Placeholder: {
    defaultMessage: "e.g. 21 Sun Lane",
    id: "addressForm.addressLine1.placeholder",
  },
  addressLine2Label: {
    defaultMessage: "Address 2",
    id: "addressForm.addressLine2.label",
  },
  addressLine2Placeholder: {
    defaultMessage: "e.g. Sun Land",
    id: "addressForm.addressLine2.placeholder",
  },
  cityEmptyError: {
    ...messages.emptyError,
    id: "addressForm.city.error.empty",
  },
  cityLabel: {
    defaultMessage: "City",
    id: "addressForm.city.label",
  },
  cityPlaceholder: {
    defaultMessage: "e.g. Dublin",
    id: "addressForm.city.placeholder",
  },
  countryEmptyError: {
    ...messages.emptyError,
    id: "addressForm.country.error.empty",
  },
  countryLabel: {
    defaultMessage: "Country",
    id: "addressForm.country.label",
  },
  countryPlaceholder: {
    defaultMessage: "Select country",
    id: "addressForm.country.placeholder",
  },
  postalCodeEmptyError: {
    ...messages.emptyError,
    id: "addressForm.postalCode.error.empty",
  },
  postalCodeLabel: {
    defaultMessage: "Postal code",
    id: "addressForm.postalCode.label",
  },
  postalCodePlaceholder: {
    defaultMessage: "e.g. 12345",
    id: "addressForm.postalCode.placeholder",
  },
  provinceEmptyError: {
    ...messages.emptyError,
    id: "addressForm.region.province.error.empty",
  },
  provinceLabel: {
    defaultMessage: "Province",
    id: "addressForm.region.province.label",
  },
  provincePlaceholder: {
    defaultMessage: "Select province",
    id: "addressForm.region.province.placeholder",
  },
  regionEmptyError: {
    ...messages.emptyError,
    id: "addressForm.region.error.empty",
  },
  regionLabel: {
    defaultMessage: "Region",
    id: "addressForm.region.label",
  },
  regionPlaceholder: {
    defaultMessage: "Select region",
    id: "addressForm.region.placeholder",
  },
  stateEmptyError: {
    ...messages.emptyError,
    id: "addressForm.region.state.error.empty",
  },
  stateLabel: {
    defaultMessage: "State",
    id: "addressForm.region.state.label",
  },
  statePlaceholder: {
    defaultMessage: "Select state",
    id: "addressForm.region.state.placeholder",
  },
  zipCodeEmptyError: {
    ...messages.emptyError,
    id: "addressForm.postalCode.zipCode.emptyError",
  },
  zipCodeLabel: {
    defaultMessage: "ZIP Code",
    id: "addressForm.postalCode.zipCode.label",
  },
  zipCodePlaceholder: {
    defaultMessage: "e.g. 12345",
    id: "addressForm.postalCode.zipCode.placeholder",
  },
});
