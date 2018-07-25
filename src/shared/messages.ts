import { defineMessages } from "react-intl";

export const messages = defineMessages({
  emptyError: {
    defaultMessage: "This field is required",
    id: "error.empty",
  },
  lengthError: {
    defaultMessage: "Must be {length, number} characters long",
    id: "error.length",
  },
  maxLengthError: {
    defaultMessage: "Cannot be longer than {length, number} characters",
    id: "error.maxLength",
  },
  minLengthError: {
    defaultMessage: "Must be at least {length, number} characters long",
    id: "error.minLength",
  },
});
