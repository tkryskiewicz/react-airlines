import Channel from "@storybook/channels";

declare class AddonStore {
  public getChannel(): Channel;
}

declare const store: AddonStore;

export default store;
