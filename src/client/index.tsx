import { LocaleProvider } from "antd";
import { Locale } from "antd/lib/locale-provider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { addLocaleData, IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import "antd/dist/antd.css";

import en = require("react-intl/locale-data/en");
import pl = require("react-intl/locale-data/pl");

addLocaleData([...en, ...pl]);

const enUS: Locale = require("antd/lib/locale-provider/en_US");
const plPL: Locale = require("antd/lib/locale-provider/pl_PL");

import { store } from "ra-store";

import { App } from "./App";

const AppRoot = (props: RouteComponentProps<{ language: "en" | "pl" }>) => {
  const locales: { [language: string]: Locale } = {
    en: enUS,
    pl: plPL,
  };

  const { language } = props.match.params;

  return (
    <IntlProvider locale={language} defaultLocale="en">
      <LocaleProvider locale={locales[language]}>
        <App {...props} />
      </LocaleProvider>
    </IntlProvider>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/:language(en|pl)" component={AppRoot} />
        <Redirect to="/en" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app-root"),
);
