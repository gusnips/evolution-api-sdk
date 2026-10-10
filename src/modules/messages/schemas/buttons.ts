import type { BaseMessageOptions, SentMessageResponse } from "./base";

export interface ReplyButton {
  type: "reply";
  displayText: string;
  id: string;
}

export interface CopyButton {
  type: "copy";
  displayText: string;
  copyCode: string;
}

export interface UrlButton {
  type: "url";
  displayText: string;
  url: string;
}

export interface CallButton {
  type: "call";
  displayText: string;
  phoneNumber: string;
}

export interface PixButton {
  type: "pix";
  currency: string;
  /**
   * Name of the person who receives the payment
   */
  name: string;
  keyType: "phone" | "email" | "cpf" | "cnpj" | "random";
  key: string;
}

export type Button =
  ReplyButton | CopyButton | UrlButton | CallButton | PixButton;

/**
 * WhatsApp accepts one of these sets of buttons, never a mix:
 * - up to 3 `reply` buttons
 * - up to 2 of `url`, `call` and `copy`
 * - one `pix` button
 */
export interface ButtonsMessageOptions extends BaseMessageOptions {
  title: string;
  description?: string;
  footer?: string;
  /**
   * Image shown above the title
   */
  thumbnailUrl?: string;
  buttons: Button[];
}

export type ButtonsMessageResponse = SentMessageResponse<"interactiveMessage">;
