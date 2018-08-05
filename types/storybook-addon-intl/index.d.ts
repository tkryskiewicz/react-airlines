import { Renderable, RenderFunction } from "@storybook/react";
import { IntlProvider } from "react-intl";

export function register(): void;

export interface Config extends IntlProvider.Props {
  locales: string[];
  getMessages: (locale: string) => object;
}

export function setIntlConfig(config: Config): void;

export function withIntl(
  story: RenderFunction,
  context: { kind: string; story: string },
): Renderable | null;
