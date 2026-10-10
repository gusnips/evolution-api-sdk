import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import type { MethodOptions } from "@/types/api";

import type * as Audio from "./schemas/audio";
import type * as Buttons from "./schemas/buttons";
import type * as Carousel from "./schemas/carousel";
import type * as Contact from "./schemas/contact";
import type * as Document from "./schemas/document";
import type * as Image from "./schemas/image";
import type * as List from "./schemas/list";
import type * as Location from "./schemas/location";
import type * as Poll from "./schemas/poll";
import type * as Ptv from "./schemas/ptv";
import type * as Reaction from "./schemas/reaction";
import type * as Status from "./schemas/status";
import type * as Sticker from "./schemas/sticker";
import type * as Template from "./schemas/template";
import type * as Text from "./schemas/text";
import type * as Video from "./schemas/video";
import type * as Voice from "./schemas/voice";

export class MessagesModule {
  constructor(private readonly api: ApiService) {}

  /**
   * Sends a text message
   * @param options - Text message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendText(
    options: Text.TextMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Text.TextMessageResponse> {
    const response = await this.api.post(Routes.Message.SendText, {
      body: options,
      ...methodOptions,
    });

    return response as Text.TextMessageResponse;
  }

  /**
   * Sends an image
   * @param options - Image message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendImage(
    options: Image.ImageMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Image.ImageMessageResponse> {
    options.mediatype = "image";
    const response = await this.api.post(Routes.Message.SendMedia, {
      body: options,
      ...methodOptions,
    });

    return response as Image.ImageMessageResponse;
  }

  /**
   * Sends a video
   * @param options - Video message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendVideo(
    options: Video.VideoMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Video.VideoMessageResponse> {
    options.mediatype = "video";
    const response = await this.api.post(Routes.Message.SendMedia, {
      body: options,
      ...methodOptions,
    });

    return response as Video.VideoMessageResponse;
  }

  /**
   * Sends a document
   * @param options - Document message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendDocument(
    options: Document.DocumentMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Document.DocumentMessageResponse> {
    options.mediatype = "document";
    const response = await this.api.post(Routes.Message.SendMedia, {
      body: options,
      ...methodOptions,
    });

    return response as Document.DocumentMessageResponse;
  }

  /**
   * Sends an audio
   * @param options - Audio message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendAudio(
    options: Audio.AudioMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Audio.AudioMessageResponse> {
    options.mediatype = "audio";
    const response = await this.api.post(Routes.Message.SendMedia, {
      body: options,
      ...methodOptions,
    });

    return response as Audio.AudioMessageResponse;
  }

  /**
   * Sends a voice message
   * @param options - Voice message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendVoice(
    options: Voice.VoiceMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Voice.VoiceMessageResponse> {
    const response = await this.api.post(Routes.Message.SendVoice, {
      body: options,
      ...methodOptions,
    });

    return response as Voice.VoiceMessageResponse;
  }

  /**
   * Sends a round video message
   * @param options - Video note options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendPtv(
    options: Ptv.PtvMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Ptv.PtvMessageResponse> {
    const response = await this.api.post(Routes.Message.SendPtv, {
      body: options,
      ...methodOptions,
    });

    return response as Ptv.PtvMessageResponse;
  }

  /**
   * Sends a sticker
   * @param options - Sticker message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendSticker(
    options: Sticker.StickerMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Sticker.StickerMessageResponse> {
    const response = await this.api.post(Routes.Message.SendSticker, {
      body: options,
      ...methodOptions,
    });

    return response as Sticker.StickerMessageResponse;
  }

  /**
   * Sends a location
   * @param options - Location message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendLocation(
    options: Location.LocationMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Location.LocationMessageResponse> {
    const response = await this.api.post(Routes.Message.SendLocation, {
      body: options,
      ...methodOptions,
    });

    return response as Location.LocationMessageResponse;
  }

  /**
   * Sends a contact
   * @param options - Contact message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendContact(
    options: Contact.ContactMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Contact.ContactMessageResponse> {
    const response = await this.api.post(Routes.Message.SendContact, {
      body: options,
      ...methodOptions,
    });

    return response as Contact.ContactMessageResponse;
  }

  /**
   * Sends a poll
   * @param options - Poll message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendPoll(
    options: Poll.PollMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Poll.PollMessageResponse> {
    const response = await this.api.post(Routes.Message.SendPoll, {
      body: options,
      ...methodOptions,
    });

    return response as Poll.PollMessageResponse;
  }

  /**
   * Sends a reaction
   * @param options - Reaction message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendReaction(
    options: Reaction.ReactionMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Reaction.ReactionMessageResponse> {
    const response = await this.api.post(Routes.Message.SendReaction, {
      body: options,
      ...methodOptions,
    });

    return response as Reaction.ReactionMessageResponse;
  }

  /**
   * Sends a template
   * @param options - Template message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendTemplate(
    options: Template.TemplateMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Template.TemplateMessageResponse> {
    const response = await this.api.post(Routes.Message.SendTemplate, {
      body: options,
      ...methodOptions,
    });

    return response as Template.TemplateMessageResponse;
  }

  /**
   * Sends a status
   * @param options - Status message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendStatus(
    options: Status.StatusMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Status.StatusMessageResponse> {
    const response = await this.api.post(Routes.Message.SendStatus, {
      body: options,
      ...methodOptions,
    });

    return response as Status.StatusMessageResponse;
  }

  /**
   * Sends a list
   * @param options - List message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendList(
    options: List.ListMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<List.ListMessageResponse> {
    const response = await this.api.post(Routes.Message.SendList, {
      body: options,
      ...methodOptions,
    });

    return response as List.ListMessageResponse;
  }

  /**
   * Sends a message with buttons
   * @param options - Buttons message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendButtons(
    options: Buttons.ButtonsMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Buttons.ButtonsMessageResponse> {
    const response = await this.api.post(Routes.Message.SendButtons, {
      body: options,
      ...methodOptions,
    });

    return response as Buttons.ButtonsMessageResponse;
  }

  /**
   * Sends a carousel of cards
   * @param options - Carousel message options
   * @param methodOptions - Method-specific options (instance override)
   */
  async sendCarousel(
    options: Carousel.CarouselMessageOptions,
    methodOptions?: MethodOptions
  ): Promise<Carousel.CarouselMessageResponse> {
    const response = await this.api.post(Routes.Message.SendCarousel, {
      body: options,
      ...methodOptions,
    });

    return response as Carousel.CarouselMessageResponse;
  }
}
