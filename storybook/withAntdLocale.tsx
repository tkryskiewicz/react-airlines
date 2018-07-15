import StorybookAddons from "@storybook/addons";
import Channel from "@storybook/channels";
import { StoryDecorator } from "@storybook/react";
import { LocaleProvider } from "antd";
import { Locale } from "antd/lib/locale-provider";
import * as React from "react";
import { EVENT_SET_LOCALE_ID } from "storybook-addon-intl/dist/shared";

const enUS = require("antd/lib/locale-provider/en_US");
const plPL = require("antd/lib/locale-provider/pl_PL");

const Locales: { [locale: string]: Locale } = {
  en: enUS,
  pl: plPL,
};

export interface WithAntdLocaleProps {
  channel: Channel;
}

interface WithAntdLocaleState {
  locale: string;
}

class WithAntdLocale extends React.Component<WithAntdLocaleProps, WithAntdLocaleState> {
  public state: WithAntdLocaleState = {
    locale: "",
  };

  constructor(props: WithAntdLocaleProps) {
    super(props);

    this.setLocale = this.setLocale.bind(this);

    this.props.channel.on(EVENT_SET_LOCALE_ID, this.setLocale);
  }

  public componentWillUnmount() {
    this.props.channel.removeListener(EVENT_SET_LOCALE_ID, this.setLocale);
  }

  public render() {
    const locale = Locales[this.state.locale];

    return (
      <LocaleProvider locale={locale}>
        {this.props.children as any}
      </LocaleProvider>
    );
  }

  private setLocale(locale: string) {
    this.setState({
      locale,
    });
  }
}

export const withAntdLocale: StoryDecorator = (story) => {
  const channel = StorybookAddons.getChannel();

  return (
    <WithAntdLocale channel={channel}>
      {story()}
    </WithAntdLocale>
  );
};
