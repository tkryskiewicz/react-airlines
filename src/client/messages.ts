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
});
