type Config = {
  channelTalk: {
    pluginKey: string;
  };
};

export const config: Config = {
  channelTalk: {
    pluginKey: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY as string,
  },
};
