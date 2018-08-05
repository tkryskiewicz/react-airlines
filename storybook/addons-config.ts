import { withKnobs } from "@storybook/addon-knobs";
import { addDecorator } from "@storybook/react";

addDecorator(withKnobs);

import { addLocaleData } from "react-intl";

import enLocaleData = require("react-intl/locale-data/en");
import plLocaleData = require("react-intl/locale-data/pl");

addLocaleData([
  ...enLocaleData,
  ...plLocaleData,
]);

import { setIntlConfig, withIntl } from "storybook-addon-intl";

setIntlConfig({
  defaultLocale: "en",
  getMessages: () => ({}),
  locales: [
    "en",
    "pl",
  ],
});

addDecorator(withIntl);

import { withAntdLocale } from "./withAntdLocale";

addDecorator(withAntdLocale);
