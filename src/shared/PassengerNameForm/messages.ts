import { defineMessages, FormattedMessage } from "react-intl";

import { messages } from "../messages";
import { HonorificTitle } from "../PassengerName";

export const passengerNameFormMessages = defineMessages({
  firstNameEmptyError: {
    ...messages.emptyError,
    id: "passengerNameForm.firstName.error.empty",
  },
  firstNameLabel: {
    defaultMessage: "First name",
    id: "passengerNameForm.firstName.label",
  },
  firstNameMaxLengthError: {
    ...messages.maxLengthError,
    id: "passengerNameForm.firstName.error.maxLength",
  },
  firstNameMinLengthError: {
    ...messages.minLengthError,
    id: "passengerNameForm.firstName.error.minLength",
  },
  firstNamePlaceholder: {
    defaultMessage: "e.g. John",
    id: "passengerNameForm.firstName.placeholder",
  },
  lastNameEmptyError: {
    ...messages.emptyError,
    id: "passengerNameForm.lastName.error.empty",
  },
  lastNameLabel: {
    defaultMessage: "Last name",
    id: "passengerNameForm.lastName.label",
  },
  lastNameMaxLengthError: {
    ...messages.maxLengthError,
    id: "passengerNameForm.lastName.error.maxLength",
  },
  lastNameMinLengthError: {
    ...messages.minLengthError,
    id: "passengerNameForm.lastName.error.minLength",
  },
  lastNamePlaceholder: {
    defaultMessage: "e.g. Smith",
    id: "passengerNameForm.lastName.placeholder",
  },
  titleEmptyError: {
    ...messages.emptyError,
    id: "passengerNameForm.title.error.empty",
  },
  titleLabel: {
    defaultMessage: "Title",
    id: "passengerNameForm.title.label",
  },
  titleMr: {
    defaultMessage: "Mr",
    id: "passengerNameForm.title.mr",
  },
  titleMrs: {
    defaultMessage: "Mrs",
    id: "passengerNameForm.title.mrs",
  },
  titleMs: {
    defaultMessage: "Ms",
    id: "passengerNameForm.title.ms",
  },
  titlePlaceholder: {
    defaultMessage: "Select title",
    id: "passengerNameForm.title.placeholder",
  },
});

export const getTitleMessage = (title: HonorificTitle): FormattedMessage.MessageDescriptor => {
  switch (title) {
    case HonorificTitle.Mr:
      return passengerNameFormMessages.titleMr;
    case HonorificTitle.Mrs:
      return passengerNameFormMessages.titleMrs;
    case HonorificTitle.Ms:
      return passengerNameFormMessages.titleMs;
  }
};
