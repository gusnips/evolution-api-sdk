// Pure TypeScript interfaces for better IDE support and performance
import type { BaseMessageOptions, SentMessageResponse } from "./base";

export interface ComponentParameter {
  type: "text" | "image" | "document" | "video";
  text?: string;
  image?: { link: string };
  document?: { link: string };
  video?: { link: string };
}

export interface Component {
  type: "body" | "header" | "button";
  sub_type?: "text" | "url" | "quick_reply";
  parameters: ComponentParameter[];
}

/**
 * Only instances connected to the WhatsApp Business API (Meta) send templates
 */
export interface TemplateMessageOptions extends BaseMessageOptions {
  /**
   * Name of an approved template
   */
  name: string;
  /**
   * Language code of the template, like `en_US` or `pt_BR`
   */
  language: string;
  components?: Component[];
  /**
   * URL that receives the events of this message
   */
  webhookUrl?: string;
}

export type TemplateMessageResponse = SentMessageResponse;
