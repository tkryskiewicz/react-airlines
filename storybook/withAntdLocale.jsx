import StorybookAddons from "@storybook/addons";
import { LocaleProvider } from "antd";
import * as React from "react";
import { EVENT_SET_LOCALE_ID } from "storybook-addon-intl/dist/shared";

const enUS = require("antd/lib/locale-provider/en_US");
const plPL = require("antd/lib/locale-provider/pl_PL");

const Locales = {
  en: enUS,
  pl: plPL,
};

class WithAntdLocale extends React.Component {
  state = {
    locale: "",
  };

  constructor(props) {
    super(props);

    this.setLocale = this.setLocale.bind(this);

    this.props.channel.on(EVENT_SET_LOCALE_ID, this.setLocale);
  }

  componentWillUnmount() {
    this.props.channel.removeListener(EVENT_SET_LOCALE_ID, this.setLocale);
  }

  render() {
    const locale = Locales[this.state.locale];

    return (
      <LocaleProvider locale={locale}>
        {this.props.children}
      </LocaleProvider>
    );
  }

  setLocale(locale) {
    this.setState({
      locale,
    });
  }
}

export const withAntdLocale = (story) => {
  const channel = StorybookAddons.getChannel();

  return (
    <WithAntdLocale channel={channel}>
      {story()}
    </WithAntdLocale>
  );
}
