import { withKnobs } from "@storybook/addon-knobs";
import { configure, addDecorator } from "@storybook/react";

import "antd/dist/antd.css";

addDecorator(withKnobs);

import { addLocaleData } from "react-intl";

import enLocaleData from "react-intl/locale-data/en";
import plLocaleData from "react-intl/locale-data/pl";

addLocaleData([
  ...enLocaleData,
  ...plLocaleData,
]);

import { setIntlConfig, withIntl } from "storybook-addon-intl";

setIntlConfig({
  locales: [
    "en",
    "pl",
  ],
  defaultLocale: "en",
  getMessages: () => ({}),
})

addDecorator(withIntl);

import { withAntdLocale } from "./withAntdLocale";

addDecorator(withAntdLocale);

const req = require.context("../src", true, /\.story\.tsx$/)

configure(() => {
  req.keys().forEach(req);
}, module);
