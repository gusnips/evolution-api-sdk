import type {
  TemplateCategory,
  TemplateComponent,
  TemplateSuccessResponse,
} from "./common";

export interface EditTemplateRequest {
  /**
   * Meta's ID of the template (`id` in `find`)
   */
  templateId: string;
  category?: TemplateCategory;
  allowCategoryChange?: boolean;
  /**
   * Time to live in seconds
   */
  ttl?: number;
  components?: TemplateComponent[];
}

export type EditTemplateResponse = TemplateSuccessResponse;
