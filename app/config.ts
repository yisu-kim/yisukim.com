type Config = {
  channelSDK: {
    pluginKey: string;
  };
};

export const config: Config = {
  channelSDK: {
    pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string,
  },
};
