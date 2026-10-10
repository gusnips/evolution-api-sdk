// Pure TypeScript interfaces for better IDE support and performance
import type { BaseMessageOptions, SentMessageResponse } from "./base";

export interface Row {
  title: string;
  description?: string;
  rowId: string;
}

export interface Section {
  title: string;
  rows: Row[];
}

export interface ListMessageOptions extends BaseMessageOptions {
  title: string;
  description?: string;
  footerText: string;
  /**
   * Text of the button that opens the list
   */
  buttonText: string;
  sections: Section[];
}

export type ListMessageResponse = SentMessageResponse;
