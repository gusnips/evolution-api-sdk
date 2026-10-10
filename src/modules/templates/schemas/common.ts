export type TemplateCategory = "AUTHENTICATION" | "MARKETING" | "UTILITY";

/**
 * One block of a Meta message template. `type` is `HEADER`, `BODY`, `FOOTER`
 * or `BUTTONS`; the other fields depend on it. See Meta's template docs
 */
export interface TemplateComponent {
  type: string;
  format?: string;
  text?: string;
  example?: Record<string, unknown>;
  buttons?: Record<string, unknown>[];
}

/**
 * Meta answers `success: true` for edits and deletes
 */
export interface TemplateSuccessResponse {
  success: boolean;
}
