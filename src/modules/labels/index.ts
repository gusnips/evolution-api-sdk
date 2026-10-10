import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import type { MethodOptions } from "@/types/api";

import type * as FindLabels from "./schemas/find-labels";
import type * as HandleLabel from "./schemas/handle-label";

/**
 * Labels only work on `WHATSAPP-BAILEYS` instances
 */
export class LabelsModule {
  constructor(private readonly api: ApiService) {}

  /**
   * Lists the labels of the instance
   * @param methodOptions - Method-specific options (instance override)
   */
  async findAll(
    methodOptions?: MethodOptions,
  ): Promise<FindLabels.FindLabelsResponse> {
    const response = await this.api.get(Routes.Labels.FindAll, methodOptions);

    return response as FindLabels.FindLabelsResponse;
  }

  /**
   * Adds a label to a chat, or removes it
   * @param options - Label handling options
   * @param methodOptions - Method-specific options (instance override)
   */
  async handle(
    options: HandleLabel.HandleLabelRequest,
    methodOptions?: MethodOptions,
  ): Promise<HandleLabel.HandleLabelResponse> {
    const response = await this.api.post(Routes.Labels.Handle, {
      body: options,
      ...methodOptions,
    });

    return response as HandleLabel.HandleLabelResponse;
  }
}
