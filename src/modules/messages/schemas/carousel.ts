import type { BaseMessageOptions, SentMessageResponse } from "./base";
import type { CallButton, CopyButton, ReplyButton, UrlButton } from "./buttons";

export interface CarouselCard {
  title?: string;
  body: string;
  footer?: string;
  imageUrl?: string;
  /**
   * From 1 to 3 buttons
   */
  buttons: (ReplyButton | CopyButton | UrlButton | CallButton)[];
}

export interface CarouselMessageOptions extends BaseMessageOptions {
  body: string;
  /**
   * From 1 to 10 cards
   */
  cards: CarouselCard[];
}

export type CarouselMessageResponse = SentMessageResponse<"interactiveMessage">;
