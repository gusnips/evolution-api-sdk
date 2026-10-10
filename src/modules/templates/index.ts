import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import type { MethodOptions } from "@/types/api";

import type * as CreateTemplate from "./schemas/create-template";
import type * as DeleteTemplate from "./schemas/delete-template";
import type * as EditTemplate from "./schemas/edit-template";
import type * as FindTemplates from "./schemas/find-templates";

/**
 * Message templates live on Meta's side, so they only work on
 * `WHATSAPP-BUSINESS` instances
 */
export class TemplatesModule {
  constructor(private readonly api: ApiService) {}

  /**
   * Sends a new template to Meta for review
   * @param options - Template options
   * @param methodOptions - Method-specific options (instance override)
   */
  async create(
    options: CreateTemplate.CreateTemplateRequest,
    methodOptions?: MethodOptions,
  ): Promise<CreateTemplate.CreateTemplateResponse> {
    const response = await this.api.post(Routes.Templates.Create, {
      body: options,
      ...methodOptions,
    });

    return response as CreateTemplate.CreateTemplateResponse;
  }

  /**
   * Edits a template
   * @param options - Template edit options
   * @param methodOptions - Method-specific options (instance override)
   */
  async edit(
    options: EditTemplate.EditTemplateRequest,
    methodOptions?: MethodOptions,
  ): Promise<EditTemplate.EditTemplateResponse> {
    const response = await this.api.post(Routes.Templates.Edit, {
      body: options,
      ...methodOptions,
    });

    return response as EditTemplate.EditTemplateResponse;
  }

  /**
   * Deletes a template by name
   * @param options - Template delete options
   * @param methodOptions - Method-specific options (instance override)
   */
  async delete(
    options: DeleteTemplate.DeleteTemplateRequest,
    methodOptions?: MethodOptions,
  ): Promise<DeleteTemplate.DeleteTemplateResponse> {
    const response = await this.api.delete(Routes.Templates.Delete, {
      body: options,
      ...methodOptions,
    });

    return response as DeleteTemplate.DeleteTemplateResponse;
  }

  /**
   * Lists the templates of the business account
   * @param methodOptions - Method-specific options (instance override)
   */
  async find(
    methodOptions?: MethodOptions,
  ): Promise<FindTemplates.FindTemplatesResponse> {
    const response = await this.api.get(Routes.Templates.Find, methodOptions);

    return response as FindTemplates.FindTemplatesResponse;
  }
}
