import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import { validateGroupJid, validateJid } from "@/schemas/common";
import type { MethodOptions } from "@/types/api";

import type * as Archive from "./schemas/archive";
import type * as Check from "./schemas/check";
import type * as DeleteMessage from "./schemas/delete-message";
import type * as FetchProfilePicture from "./schemas/fetch-profile-picture";
import type * as FindAll from "./schemas/find-all";
import type * as FindChannels from "./schemas/find-channels";
import type * as FindChatByRemoteJid from "./schemas/find-chat-by-remote-jid";
import type * as FindContacts from "./schemas/find-contacts";
import type * as FindMessages from "./schemas/find-messages";
import type * as FindStatusMessage from "./schemas/find-status-message";
import type * as GetBase64FromMediaMessage from "./schemas/get-base64-from-media-message";
import type * as GetPollVote from "./schemas/get-poll-vote";
import type * as MarkAsPlayed from "./schemas/mark-as-played";
import type * as MarkAsRead from "./schemas/mark-as-read";
import type * as MarkAsUnread from "./schemas/mark-as-unread";
import type * as Presence from "./schemas/presence";
import type * as UpdateBlockStatus from "./schemas/update-block-status";
import type * as UpdateMessage from "./schemas/update-message";

export class ChatsModule {
  constructor(private readonly api: ApiService) {}

  /**
   * Checks if phone numbers are registered on WhatsApp
   * @param numbers - Array of phone numbers to check
   * @param methodOptions - Method-specific options (instance override)
   */
  async check(
    numbers: Check.CheckOptions,
    methodOptions?: MethodOptions
  ): Promise<Check.CheckResponse> {
    const body = {
      numbers: Array.isArray(numbers) ? numbers : [numbers],
    };
    const response = await this.api.post(Routes.Chats.Check, {
      body,
      ...methodOptions,
    });

    return response as Check.CheckResponse;
  }

  /**
   * Gets all chats
   * @param methodOptions - Method-specific options (instance override)
   */
  async findAll(
    methodOptions?: MethodOptions
  ): Promise<FindAll.FindAllChatsResponse> {
    const response = await this.api.post(Routes.Chats.FindAll, {
      body: {},
      ...methodOptions,
    });

    return response as FindAll.FindAllChatsResponse;
  }

  /**
   * Updates presence status
   * @param params - Presence parameters
   * @param methodOptions - Method-specific options (instance override)
   */
  async updatePresence(
    options: Presence.PresenceOptions,
    methodOptions?: MethodOptions
  ): Promise<void> {
    if (!options.number) {
      throw new Error("Number is required");
    }

    if (!validateJid(options.number) && !validateGroupJid(options.number)) {
      options.number = `${options.number}@s.whatsapp.net`;
    }

    await this.api.post(Routes.Chats.SendPresence, {
      body: options,
      ...methodOptions,
    });
  }

  /**
   * Marks messages as read
   * @param options - Mark as read options
   * @param methodOptions - Method-specific options (instance override)
   */
  async markAsRead(
    options: MarkAsRead.MarkAsReadRequest,
    methodOptions?: MethodOptions
  ): Promise<MarkAsRead.MarkAsReadResponse> {
    const response = await this.api.post(Routes.Chats.MarkAsRead, {
      body: options,
      ...methodOptions,
    });

    return response as MarkAsRead.MarkAsReadResponse;
  }

  /**
   * Marks received audio messages as played (the blue microphone)
   * @param options - Mark as played options
   * @param methodOptions - Method-specific options (instance override)
   */
  async markAsPlayed(
    options: MarkAsPlayed.MarkAsPlayedRequest,
    methodOptions?: MethodOptions
  ): Promise<MarkAsPlayed.MarkAsPlayedResponse> {
    const response = await this.api.post(Routes.Chats.MarkAsPlayed, {
      body: options,
      ...methodOptions,
    });

    return response as MarkAsPlayed.MarkAsPlayedResponse;
  }

  /**
   * Marks messages as unread
   * @param options - Mark as unread options
   * @param methodOptions - Method-specific options (instance override)
   */
  async markAsUnread(
    options: MarkAsUnread.MarkAsUnreadRequest,
    methodOptions?: MethodOptions
  ): Promise<MarkAsUnread.MarkAsUnreadResponse> {
    const response = await this.api.post(Routes.Chats.MarkAsUnread, {
      body: options,
      ...methodOptions,
    });

    return response as MarkAsUnread.MarkAsUnreadResponse;
  }

  /**
   * Archives a chat
   * @param options - Archive options
   * @param methodOptions - Method-specific options (instance override)
   */
  async archive(
    options: Archive.ArchiveRequest,
    methodOptions?: MethodOptions
  ): Promise<Archive.ArchiveResponse> {
    const response = await this.api.post(Routes.Chats.Archive, {
      body: options,
      ...methodOptions,
    });

    return response as Archive.ArchiveResponse;
  }

  /**
   * Deletes a message
   * @param options - Delete message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async deleteMessage(
    options: DeleteMessage.DeleteMessageRequest,
    methodOptions?: MethodOptions
  ): Promise<DeleteMessage.DeleteMessageResponse> {
    const response = await this.api.delete(Routes.Chats.DeleteMessage, {
      body: options,
      ...methodOptions,
    });

    return response as DeleteMessage.DeleteMessageResponse;
  }

  /**
   * Fetches profile picture
   * @param options - Fetch profile picture options
   * @param methodOptions - Method-specific options (instance override)
   */
  async fetchProfilePicture(
    options: FetchProfilePicture.FetchProfilePictureRequest,
    methodOptions?: MethodOptions
  ): Promise<FetchProfilePicture.FetchProfilePictureResponse> {
    const response = await this.api.post(Routes.Chats.FetchProfilePicture, {
      body: options,
      ...methodOptions,
    });

    return response as FetchProfilePicture.FetchProfilePictureResponse;
  }

  /**
   * Finds contacts
   * @param options - Find contacts options
   * @param methodOptions - Method-specific options (instance override)
   */
  async findContacts(
    options: FindContacts.FindContactsRequest,
    methodOptions?: MethodOptions
  ): Promise<FindContacts.FindContactsResponse> {
    const response = await this.api.post(Routes.Chats.FindContacts, {
      body: options,
      ...methodOptions,
    });

    return response as FindContacts.FindContactsResponse;
  }

  /**
   * Finds messages
   * @param options - Find messages options
   * @param methodOptions - Method-specific options (instance override)
   */
  async findMessages(
    options: FindMessages.FindMessagesRequest,
    methodOptions?: MethodOptions
  ): Promise<FindMessages.FindMessagesResponse> {
    const response = await this.api.post(Routes.Chats.FindMessages, {
      body: options,
      ...methodOptions,
    });

    return response as FindMessages.FindMessagesResponse;
  }

  /**
   * Finds status messages
   * @param options - Find status message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async findStatusMessage(
    options: FindStatusMessage.FindStatusMessageRequest,
    methodOptions?: MethodOptions
  ): Promise<FindStatusMessage.FindStatusMessageResponse> {
    const response = await this.api.post(Routes.Chats.FindStatusMessage, {
      body: options,
      ...methodOptions,
    });

    return response as FindStatusMessage.FindStatusMessageResponse;
  }

  /**
   * Updates a message
   * @param options - Update message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async updateMessage(
    options: UpdateMessage.UpdateMessageRequest,
    methodOptions?: MethodOptions
  ): Promise<UpdateMessage.UpdateMessageResponse> {
    const response = await this.api.post(Routes.Chats.UpdateMessage, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateMessage.UpdateMessageResponse;
  }

  /**
   * Blocks or unblocks a contact
   * @param options - Number and `block` or `unblock`
   * @param methodOptions - Method-specific options (instance override)
   */
  async updateBlockStatus(
    options: UpdateBlockStatus.UpdateBlockStatusRequest,
    methodOptions?: MethodOptions
  ): Promise<UpdateBlockStatus.UpdateBlockStatusResponse> {
    const response = await this.api.post(Routes.Chats.UpdateBlockStatus, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateBlockStatus.UpdateBlockStatusResponse;
  }

  /**
   * Finds one chat by its JID
   * @param options - The chat JID
   * @param methodOptions - Method-specific options (instance override)
   */
  async findChatByRemoteJid(
    options: FindChatByRemoteJid.FindChatByRemoteJidRequest,
    methodOptions?: MethodOptions
  ): Promise<FindChatByRemoteJid.FindChatByRemoteJidResponse> {
    const response = await this.api.get(Routes.Chats.FindChatByRemoteJid, {
      params: options,
      ...methodOptions,
    });

    return response as FindChatByRemoteJid.FindChatByRemoteJidResponse;
  }

  /**
   * Finds the WhatsApp channels this instance has messages from
   * @param options - Pagination
   * @param methodOptions - Method-specific options (instance override)
   */
  async findChannels(
    options: FindChannels.FindChannelsRequest = {},
    methodOptions?: MethodOptions
  ): Promise<FindChannels.FindChannelsResponse> {
    const response = await this.api.post(Routes.Chats.FindChannels, {
      body: options,
      ...methodOptions,
    });

    return response as FindChannels.FindChannelsResponse;
  }

  /**
   * Counts the votes of a poll, by option
   * @param options - The poll message and its chat
   * @param methodOptions - Method-specific options (instance override)
   */
  async getPollVote(
    options: GetPollVote.GetPollVoteRequest,
    methodOptions?: MethodOptions
  ): Promise<GetPollVote.GetPollVoteResponse> {
    const response = await this.api.post(Routes.Chats.GetPollVote, {
      body: options,
      ...methodOptions,
    });

    return response as GetPollVote.GetPollVoteResponse;
  }

  /**
   * Gets base64 representation of media from a message
   * @param options - Get base64 from media message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async getBase64FromMediaMessage(
    options: GetBase64FromMediaMessage.GetBase64FromMediaMessageRequest,
    methodOptions?: MethodOptions
  ): Promise<GetBase64FromMediaMessage.GetBase64FromMediaMessageResponse> {
    const response = await this.api.post(
      Routes.Chats.GetBase64FromMediaMessage,
      {
        body: options,
        ...methodOptions,
      }
    );

    return response as GetBase64FromMediaMessage.GetBase64FromMediaMessageResponse;
  }
}
