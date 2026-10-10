import type { TemplateCategory, TemplateComponent } from "./common";

export interface CreateTemplateRequest {
  /**
   * Lower case letters, numbers and underscores
   */
  name: string;
  category: TemplateCategory;
  /**
   * Language code, like `en_US` or `pt_BR`
   */
  language: string;
  components: TemplateComponent[];
  /**
   * Let Meta change the category if it disagrees with yours
   */
  allowCategoryChange?: boolean;
  /**
   * The server calls this URL when the template is approved or rejected
   */
  webhookUrl?: string;
}

export interface CreateTemplateResponse {
  id: string;
  templateId: string;
  name: string;
  /**
   * What Meta answered when it received the template
   */
  template: {
    id: string;
    status: string;
    category: TemplateCategory;
  };
  webhookUrl: string | null;
  createdAt: string | null;
  updatedAt: string;
  instanceId: string;
}
