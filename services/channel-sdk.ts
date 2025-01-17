// Modified from ChennelIO's SDK
// Source: https://github.com/channel-io/channel-web-sdk-loader/blob/main/src/index.ts

// ================== Original source code starts here ==================

declare global {
  interface Window {
    ChannelIO: IChannelIO;
    ChannelIOInitialized?: boolean;

    // ================== Modified code starts here ==================
    ChannelIOLoader: () => any;
    // ================== Modified code ends here ==================
  }
}

interface IChannelIO {
  c?: (...args: any) => void;
  q?: [methodName: string, ...args: any[]][];
  (...args: any): void;
}

/**
 * Represents user information.
 * @see https://developers.channel.io/docs/web-user-object
 */
export interface User {
  /**
   * The number of important notifications that are unread.
   * - A numerical indicator is displayed on the channel button to signify this count.
   * @see https://developers.channel.io/docs/web-user-object#alert
   */
  alert: number;

  /** URL representing the user's avatar image. */
  avatarUrl: string;

  /** Unique identifier for the user. */
  id: string;

  /**
   * The language setting for the user.
   * - Utilized for translation purposes.
   * - Configurable via the `updateUser` method or the language `boot` option.
   * - Supports the following 32 languages:
   *   - 'de'(German), 'hi'(Hindi), 'no'(Norwegian), 'ru'(Russian), 'fi'(Finnish), 'pt'(Portuguese), 'hr'(Croatian), 'fr'(French), 'hu'(Hungarian), 'uk'(Ukrainian), 'sk'(Slovak), 'ca'(Catalan), 'sv'(Swedish), 'ko'(Korean), 'id'(Indonesian), 'ms'(Malay), 'el'(Greek), 'en'(English), 'it'(Italian), 'es'(Spanish), 'he'(Hebrew), 'zh'(Chinese), 'cs'(Czech), 'ar'(Arabic), 'vi'(Vietnamese),'th'(Thai), 'ja'(Japanese), 'pl'(Polish), 'ro'(Romanian), 'da'(Danish), 'nl'(Dutch), 'tr'(Turkish)
   * @see https://developers.channel.io/docs/web-user-object#language
   */
  language: string;

  /**
   * Unique identifier for member user.
   * - If `memberId` is specified in the boot option, the user is considered a member.
   * @see https://developers.channel.io/docs/web-user-object#memberid
   */
  memberId: string;

  /**
   * The user's name.
   * - Configurable via the `updateUser` method.
   * @see https://developers.channel.io/docs/web-user-object#name
   */
  name?: string;

  /**
   * The user's profile information.
   * - Configurable via the `updateUser` method or the profile boot option.
   * @see https://developers.channel.io/docs/web-user-object#profile
   */
  profile?: Profile | null;

  /**
   * An array of tags associated with the user.
   * - All tags are in lowercase.
   * - Configurable via the `updateUser`, `addTags`, or `removeTags` methods.
   * @see https://developers.channel.io/docs/web-user-object#tags
   */
  tags?: string[] | null;

  /**
   * The total count of unread notifications for the user.
   * - If you have 'unread' notifications but no 'alert', a red dot is displayed on the channel button to signify unread messages.
   * @see https://developers.channel.io/docs/web-user-object#unread
   */
  unread: number;

  /**
   * Whether the user has opted out of receiving marketing emails.
   * - Configurable via the `updateUser` method or the `unsubscribeEmail` boot option.
   * @see https://developers.channel.io/docs/web-user-object#unsubscribeemail
   */
  unsubscribeEmail: boolean;

  /**
   * Whether the user has opted out of receiving marketing text messages.
   * - Configurable via the `updateUser` method or the `unsubscribeTexting` boot option.
   * @see https://developers.channel.io/docs/web-user-object#unsubscribetexting
   */
  unsubscribeTexting: boolean;
}

/**
 * Callback for error or success responses.
 * - On failure: passes an Error object as the first argument and null as the second.
 * - On success: passes null as the first argument and a User object as the second.
 */
export type Callback = (error: Error | null, user: User | null) => void;

/**
 * Represents user profile information.
 * - Populated by `updateUser` or the `profile` field in boot options.
 * @see https://developers.channel.io/docs/web-user-object#profile
 */
export interface Profile {
  [key: string]: string | string[] | number | number[] | boolean | null;
}

/**
 * Defines appearance options for the theme.
 * - `light`: Light theme.
 * - `dark`: Dark theme.
 * - `system`: System-defined theme.
 * - null: Inherits `Desk` theme setting.
 * @see https://developers.channel.io/docs/web-boot-option#appearance
 */
export type Appearance = "light" | "dark" | "system" | null;

const isSSR = () => {
  if (typeof window === "undefined") {
    console.error("ChannelIO APIs are only executable on browser.");
    return true;
  }
  return false;
};

const isSDKLoaded = () => {
  if (!window.ChannelIO) {
    console.error(
      "ChannelIO is not loaded. Please call loadScript() before calling ChannelIO APIs.",
    );
    return false;
  }
  return true;
};

const safeChannelIO = (...args: unknown[]) => {
  if (isSSR() || !isSDKLoaded()) {
    return;
  }
  window.ChannelIO(...args);
};

/**
 * Loads the Channel SDK script into the document.
 * - Browser-only: This function can only be executed in a browser environment.
 * - Idempotent: If the Channel SDK script is already loaded, calling this function has no effect.
 */
export function loadScript() {
  if (isSSR()) {
    return;
  }

  (function () {
    var w = window;
    if (!!w.ChannelIO) {
      return;
    }
    var ch: IChannelIO = function () {
      ch.c?.(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q?.push(args);
    };
    w.ChannelIO = ch;

    // ================== Modified code starts here ==================

    // Changed from local function 'l' to a named function on the window object
    w.ChannelIOLoader = function l() {
      // ================== Modified code ends here ==================

      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
      var x = document.getElementsByTagName("script")[0];
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x);
      }
    };
    if (document.readyState === "complete") {
      w.ChannelIOLoader();
    } else {
      w.addEventListener("DOMContentLoaded", w.ChannelIOLoader);
      w.addEventListener("load", w.ChannelIOLoader);
    }
  })();
}

/**
 * Boot options for initializing the SDK.
 * @see https://developers.channel.io/docs/web-boot-option
 */
export interface BootOption {
  /**
   * Configure the initial appearance of your theme.
   * - The default value is `null`.
   */
  appearance?: Appearance;

  /**
   * Specifies a CSS selector to target the custom launcher.
   * - Useful for customizing the default `channel button`.
   * @see [BootOption: customlauncherselector](https://developers.channel.io/docs/web-boot-option#customlauncherselector)
   * @see [Customization](https://developers.channel.io/docs/web-customization)
   */
  customLauncherSelector?: string;

  /**
   * Determines whether to hide the default `channel button`.
   * - The default value is `false`.
   * @see [BootOption: hidechannelbuttononboot](https://developers.channel.io/docs/web-boot-option#hidechannelbuttononboot)
   * @see [Customization](https://developers.channel.io/docs/web-customization)
   */
  hideChannelButtonOnBoot?: boolean;

  /**
   * Determines whether to hide marketing pop-ups and message alert pop-ups.
   * - The default value is `false`.
   */
  hidePopup?: boolean;

  /**
   * Specifies the default language setting.
   * - Applies to new users; does not modify existing users' language settings.
   * - Supports message translation in `32 languages` and UI language in `ko`, `ja`, and `en`.
   * - UI text adapts to `ko` or `ja`; defaults to `en` otherwise.
   * @see [Boot Option: language](https://developers.channel.io/docs/web-boot-option#language)
   * @see [List of 32 languages](https://developers.channel.io/docs/web-user-object#language)
   */
  language?: string;

  /**
   * Pass the `HMAC-SHA256` hash of the user `memberid` using the issued secret key.
   * - No need to pass `memberHash` unless using `user data encryption`.
   * @see [BootOption: memberHash](https://developers.channel.io/docs/web-boot-option#memberhash)
   * @see [Member Hash Reference](https://developers.channel.io/docs/member-hash)
   * @see [user-data-encryption](https://channel.io/en/guides/channel-settings/security#user-data-encryption)
   */
  memberHash?: string;

  /**
   * Specifies the member user's ID.
   * @see https://developers.channel.io/docs/web-boot-option#memberid
   */
  memberId?: string;

  /**
   * Specifies the plugin key for your channel.
   * @see [BootOption: pluginKey](https://developers.channel.io/docs/web-boot-option#pluginkey)
   * @see [Obtaining a Plugin Key](https://developers.channel.io/docs/sdk#get-a-plugin-key)
   */
  pluginKey: string;

  /**
   * Specifies the user’s profile.
   * @see [Boot Option: profile](https://developers.channel.io/docs/web-boot-option#profile)
   * @see [User Object: profile](https://developers.channel.io/docs/web-user-object#profile)
   */
  profile?: Profile;

  /**
   * Determines whether to track the default `PageView` event.
   * - The default value is `true`.
   * @see [Boot Option: trackdefaultevent](https://developers.channel.io/docs/web-boot-option#trackdefaultevent)
   * @see [Event Glossary](https://developers.channel.io/docs/event)
   */
  trackDefaultEvent?: boolean;

  /**
   * Determines whether to track the `UTM source` and `referrer`.
   * - The default value is `true`.
   * @see https://developers.channel.io/docs/web-boot-option#trackutmsource
   */
  trackUtmSource?: boolean;

  /**
   * Determines whether to opt out of receiving marketing emails and text messages.
   * - The default value is `false`.
   */
  unsubscribe?: boolean;

  /**
   * Determines whether to opt out of receiving marketing emails.
   * - The default value is `false`.
   */
  unsubscribeEmail?: boolean;

  /**
   * Determines whether to opt out of receiving marketing text messages.
   * - The default value is `false`.
   */
  unsubscribeTexting?: boolean;

  /**
   * Sets the `z-index` for elements generated by the SDK.
   * - Applies to the `channel button`, `messenger`, and marketing pop-ups.
   * - The default value is `10,000,000`.
   * @see https://developers.channel.io/docs/web-boot-option#zindex
   */
  zIndex?: number;
}

/**
 * Initializes the SDK, making `Channel button` and features like marketing pop-ups operational.
 *
 * @param {BootOption} option - Configuration options for initializing the SDK.
 * @param {Callback | undefined} callback - Function to be called after booting is complete. On failure, it receives an error object as its first argument and null as the second. On success, it receives null as the first argument and a user object as the second.
 * @see [Boot Glossary](https://developers.channel.io/docs/glossary#boot)
 * @see [Boot Option](https://developers.channel.io/docs/web-boot-option)
 * @see [User Object](https://developers.channel.io/docs/web-user-object)
 */
export function boot(option: BootOption, callback?: Callback) {
  safeChannelIO("boot", option, callback);
}

/**
 * Terminates all SDK operations and reinitializes internal data.
 */
export function shutdown() {
  safeChannelIO("shutdown");
}

/**
 * Displays the messenger interface.
 *
 * @see [ChannelIO: showmessenger API](https://developers.channel.io/docs/web-channelio#showmessenger)
 * @see [Messenger Glossary](https://developers.channel.io/docs/glossary#messenger)
 */
export function showMessenger() {
  safeChannelIO("showMessenger");
}

/**
 * Hides the messenger interface.
 *
 * @see [ChannelIO: hidemessenger API](https://developers.channel.io/docs/web-channelio#hidemessenger)
 * @see [Messenger Glossary](https://developers.channel.io/docs/glossary#messenger)
 */
export function hideMessenger() {
  safeChannelIO("hideMessenger");
}

/**
 * Opens a chat interface
 *
 * - Reveals the `messenger` if hidden.
 * - For an undefined `chatId`, a new chat is created. Any provided `message` populates the chat input. The workflow initializes if active.
 * - If a chat with the given `chatId` exists, the chat will open, and the `message` parameter will be disregarded.
 * - If no matching chat exists, the `home` view opens.
 * - Caution: Utilizing this function outside a click event may cause issues in iOS Safari.
 *
 * @param {string | number | undefined} chatId - ID of the chat to reveal.
 * @param {string | undefined} message - Optional text to populate the chat input field.
 * @see https://developers.channel.io/docs/web-channelio#openchat
 */
export function openChat(chatId?: string | number, message?: string) {
  safeChannelIO("openChat", chatId, message);
}

/**
 * Initiates a chat by triggering a specified workflow.
 *
 * - Reveals the `messenger` if hidden.
 * - Activates the workflow identified by the given `workflowId`.
 * - No action is taken if `workflowId` is not specified.
 * - Shows an error page if a workflow with the specified `workflowId` does not exist.
 * - Caution: Utilizing this function outside a click event may cause issues in iOS Safari.
 *
 * @param {string} workflowId - Identifier of the targeted workflow.
 * @see https://developers.channel.io/docs/web-channelio#openworkflow
 */
export function openWorkflow(workflowId: string) {
  safeChannelIO("openWorkflow", workflowId);
}

export interface EventProperty {
  [key: string]: string | number | boolean | null;
}
/**
 * Tracks user event.
 *
 * - If the event is new, it gets created.
 * - Data might take from minutes to hours to appear on the `Desk`.
 *
 * @param {string} eventName - Name of the event. Max length is 30 characters.
 * @param {EventProperty | undefined} eventProperty - Additional properties for the event.
 * @see [ChannelIO: track API](https://developers.channel.io/docs/web-channelio#track)
 * @see [Event Glossary](https://developers.channel.io/docs/event)
 */
export function track(eventName: string, eventProperty?: EventProperty) {
  safeChannelIO("track", eventName, eventProperty);
}

/**
 * Registers a callback function that is invoked when the messenger is displayed.
 * @param {Function} callback - The callback function to be executed.
 */
export function onShowMessenger(callback: () => void) {
  safeChannelIO("onShowMessenger", callback);
}

/**
 * Registers a callback function that is invoked when the messenger is hidden.
 * @param {Function} callback - The callback function to be executed.
 */
export function onHideMessenger(callback: () => void) {
  safeChannelIO("onHideMessenger", callback);
}

/**
 * Callback function type for handling badge changes.
 * @param {number} unread - The total number of unread notifications. If you have `unread` notifications but no `alert`, a red dot is displayed on the channel button to signify unread messages.
 * @param {number} alert - The number of important unread notifications. This count is displayed as a number on the channel button.
 * @see [ChannelIO: onbadgechanged API](https://developers.channel.io/docs/web-channelio#onbadgechanged)
 * @see [Customization](https://developers.channel.io/docs/web-customization)
 */
export type BadgeChangedCallback = (unread: number, alert: number) => void;
/**
 * Register a callback invoked when the count of messages that the user has not yet read.
 * @param {BadgeChangedCallback} callback
 * @see [ChannelIO: onbadgechanged API](https://developers.channel.io/docs/web-channelio#onbadgechanged)
 * @see [Customization](https://developers.channel.io/docs/web-customization)
 */
export function onBadgeChanged(callback: BadgeChangedCallback) {
  safeChannelIO("onBadgeChanged", callback);
}

/**
 * Registers a callback function that is invoked when a chat is created.
 * @param {Function} callback - The callback function to be executed.
 */
export function onChatCreated(callback: () => void) {
  safeChannelIO("onChatCreated", callback);
}

/**
 * Represents the user profile information passed in the `onFollowUpChanged` callback argument.
 */
export interface FollowUpProfile {
  /** User's name. */
  name?: string | null;
  /** User's mobile number, following the E.164 format. */
  mobileNumber?: string | null;
  /** User's email address. */
  email?: string | null;
}
export type FollowUpChangedCallback = (
  followUpProfile: FollowUpProfile,
) => void;
/**
 * Registers a callback function that is invoked when the user updates their profile.
 * @param {FollowUpChangedCallback} callback - The callback function, receiving the `FollowUpProfile` object as an argument.
 * @see https://developers.channel.io/docs/web-channelio#onfollowupchanged
 */
export function onFollowUpChanged(callback: FollowUpChangedCallback) {
  safeChannelIO("onFollowUpChanged", callback);
}

export type UrlClickedCallback = (url: string) => void;
/**
 * Registers a callback function that is invoked when the user clicks on a link.
 * - Supported link types include:
 *   - Link buttons or text in marketing pop-ups
 *   - Link buttons or text sent by a manager in chat
 * @param {UrlClickedCallback} callback - The callback function, receiving the clicked URL as an argument.
 * @see https://developers.channel.io/docs/web-channelio#onurlclicked
 */
export function onUrlClicked(callback: UrlClickedCallback) {
  safeChannelIO("onUrlClicked", callback);
}

/**
 * Clears all registered callbacks
 * @see https://developers.channel.io/docs/web-channelio#clearcallbacks
 */
export function clearCallbacks() {
  safeChannelIO("clearCallbacks");
}

/**
 * Information required to update a user.
 * @see https://developers.channel.io/docs/web-channelio#updateuser
 */
export interface UpdateUserInfo {
  /**
   * Specifies the user's language.
   * - Supports message translation in `32 languages` and UI language in `ko`, `ja`, and `en`.
   * - UI text adapts to `ko` or `ja`; defaults to `en` otherwise.
   */
  language?: string;
  /**
   * Specifies the user's profile.
   * - Passing `null` will initialize the whole profile.
   * - For specific fields inside the profile object, passing `null` will initialize that field.
   * - Field names must be in camelCase.
   * - The `mobileNumber` field must follow the `E.164` format.
   * - Empty objects are not allowed.
   */
  profile?: Profile | null;
  /**
   * Specifies the user's profile.
   * - Only fields with no existing values in the profile will be added from the `profileOnce` object.
   */
  profileOnce?: Profile;
  /**
   * Specifies the User's tags.
   * - Up to 10 tags are allowed.
   * - Passing `null` will initialize the tags.
   * - Empty arrays are not allowed.
   */
  tags?: string[] | null;
  /**
   * Determines whether to opt out of receiving marketing emails.
   * - Setting this to `true` will terminate the subscription.
   */
  unsubscribeEmail?: boolean;
  /**
   * Determines whether to opt out of receiving marketing text messages.
   * - Setting this to `true` will terminate the subscription.
   */
  unsubscribeTexting?: boolean;
}
/**
 * Updates user information.
 *
 * @param {UpdateUserInfo} userInfo - Object containing user information to be updated.
 * @param {Callback} [callback] - Optional callback function to be executed upon completion.
 * @see https://developers.channel.io/docs/web-channelio#updateuser
 */
export function updateUser(userInfo: UpdateUserInfo, callback?: Callback) {
  safeChannelIO("updateUser", userInfo, callback);
}

/**
 * Adds tags to a user.
 * @param {string[]} tags - Unique tags only. Max 10, always in lowercase.
 * @param {Callback} callback - Called on success or failure.
 * @see https://developers.channel.io/docs/web-channelio#addtags
 */
export function addTags(tags: string[], callback?: Callback) {
  safeChannelIO("addTags", tags, callback);
}

/**
 * Removes tags from a user.
 * @param {string[]} tags - Ignores non-existent tags. Empty array or null not allowed.
 * @param {Callback} callback - Called on success or failure.
 * @see https://developers.channel.io/docs/web-channelio#removetags
 */
export function removeTags(tags: string[], callback?: Callback) {
  safeChannelIO("removeTags", tags, callback);
}

/**
 * Sets the current page and user chat profile.
 * - Page can be used instead of canonical URL.
 * @param {string} page - The page to set. Do not pass null or undefined. Use `resetPage` to clear.
 * @param {Record<string, any>} profile - The user chat profile value.
 * @see [ChannelIO: setpage API](https://developers.channel.io/docs/web-channelio#setpage)
 * @see [page Glossary](https://developers.channel.io/docs/page)
 * @see [canonical-url Glossary](https://developers.channel.io/docs/canonical-url)
 */
export function setPage(page: string, profile?: Record<string, any>) {
  safeChannelIO("setPage", page, profile);
}

/**
 * - Reset the page and user chat profile value.
 * - If you use resetPage, a canonical URL is used as the page value.
 * @see [ChannelIO: resetpage API](https://developers.channel.io/docs/web-channelio#resetpage)
 * @see [page Glossary](https://developers.channel.io/docs/page)
 * @see [canonical-url Glossary](https://developers.channel.io/docs/canonical-url)
 */
export function resetPage() {
  safeChannelIO("resetPage");
}

/**
 * Shows the channel button.
 * - No need to call if `hideChannelButtonOnBoot` is false or `hideChannelButton` was not called.
 * @see [ChannelIO: showChannelButton API](https://developers.channel.io/docs/web-channelio#showchannelbutton)
 * @see [Channel Button Glossary](https://developers.channel.io/docs/glossary#channel-button)
 */
export function showChannelButton() {
  safeChannelIO("showChannelButton");
}

/**
 * Hides the channel button.
 * @see [ChannelIO: hidechannelbutton API](https://developers.channel.io/docs/web-channelio#hidechannelbutton)
 * @see [Channel Button Glossary](https://developers.channel.io/docs/glossary#channel-button)
 */
export function hideChannelButton() {
  safeChannelIO("hideChannelButton");
}

/**
 * Sets the appearance theme.
 * @param {Appearance} appearance
 */
export function setAppearance(appearance: Appearance) {
  safeChannelIO("setAppearance", appearance);
}

// ================== Original source code ends here ==================

// ================== Modified code starts here ==================

/**
 * Unloads the ChannelIO script and resets related states.
 */
export function unloadScript() {
  if (isSSR()) {
    return;
  }

  const script = document.querySelector(
    'script[src="https://cdn.channel.io/plugin/ch-plugin-web.js"]',
  );
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }

  if (window.ChannelIOInitialized) {
    window.ChannelIOInitialized = false;
  }

  if (isSDKLoaded()) {
    delete (window as any).ChannelIO;
  }

  window.removeEventListener("DOMContentLoaded", window.ChannelIOLoader);
  window.removeEventListener("load", window.ChannelIOLoader);

  if ("ChannelIOLoader" in window) {
    delete (window as any).ChannelIOLoader;
  }
}

// ================== Modified code ends here ==================
