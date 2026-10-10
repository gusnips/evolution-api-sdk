import type { TemplateCategory, TemplateComponent } from "./common";

export interface MetaTemplate {
  id: string;
  name: string;
  language: string;
  /**
   * `APPROVED`, `PENDING`, `REJECTED` and so on
   */
  status: string;
  category: TemplateCategory;
  components: TemplateComponent[];
}

export type FindTemplatesResponse = MetaTemplate[];
