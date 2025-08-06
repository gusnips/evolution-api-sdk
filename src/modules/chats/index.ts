import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import { validateGroupJid, validateJid } from "@/schemas/common";
import type { MethodOptions } from "@/types/api";

import type * as Archive from "./schemas/archive";
import type * as Check from "./schemas/check";
import type * as DeleteMessage from "./schemas/delete-message";
import type * as FetchProfilePicture from "./schemas/fetch-profile-picture";
import type * as FindAll from "./schemas/find-all";
import type * as FindContacts from "./schemas/find-contacts";
import type * as FindMessages from "./schemas/find-messages";
import type * as FindStatusMessage from "./schemas/find-status-message";
import type * as GetBase64FromMediaMessage from "./schemas/get-base64-from-media-message";
import type * as MarkAsRead from "./schemas/mark-as-read";
import type * as MarkAsUnread from "./schemas/mark-as-unread";
import type * as Presence from "./schemas/presence";
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
    const response = await this.api.put(Routes.Chats.UpdateMessage, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateMessage.UpdateMessageResponse;
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
