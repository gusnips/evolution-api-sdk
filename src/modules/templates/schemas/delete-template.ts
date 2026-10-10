import type { TemplateSuccessResponse } from "./common";

export interface DeleteTemplateRequest {
  name: string;
  /**
   * Meta's ID of the template. Without it, every language of `name` is deleted
   */
  hsmId?: string;
}

export type DeleteTemplateResponse = TemplateSuccessResponse;
