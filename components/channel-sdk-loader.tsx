"use client";

import { PropsWithChildren, useEffect } from "react";

import * as ChannelSDKService from "@/services/channel-sdk";

import { Locale } from "@/utils/i18n";
import { config } from "@/app/config";

export type Props = Readonly<{
  lang: Locale;
}>;

export default function ChannelSDKLoader({
  lang,
  children,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    ChannelSDKService.loadScript();
    ChannelSDKService.boot({
      pluginKey: config.channelTalk.pluginKey,
      // Applies to new users; does not modify existing users' language settings.
      // See: https://developers.channel.io/docs/web-boot-option#language
      language: lang,
    });

    return () => {
      ChannelSDKService.shutdown();
      // Workaround for Next.js dynamic [lang] route and ChannelTalk script handling
      // This ensures a clean slate is provided when switching between language routes
      ChannelSDKService.unloadScript();
    };
  }, [lang]);

  return <>{children}</>;
}
