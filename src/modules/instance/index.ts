import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";

import type * as Connect from "./schemas/connect";
import type * as ConnectionState from "./schemas/connection-state";
import type * as Create from "./schemas/create";
import type * as Delete from "./schemas/delete";
import type * as FetchAll from "./schemas/fetch-all";
import type * as Logout from "./schemas/logout";
import type * as Restart from "./schemas/restart";
import type * as SetPresence from "./schemas/set-presence";

import type { MethodOptions } from "@/types/api";

export class InstanceModule {
  constructor(private readonly api: ApiService) {}

  async create(
    options: Create.CreateInstanceRequest
  ): Promise<Create.CreateInstanceResponse> {
    const response = await this.api.post(Routes.Instance.Create, {
      body: options,
      isInstanceUrl: false,
    });
    return response as Create.CreateInstanceResponse;
  }

  async connect(
    options: Connect.ConnectRequest
  ): Promise<Connect.ConnectResponse> {
    const response = await this.api.get(Routes.Instance.Connect, {
      instance: options.instanceName,
      isInstanceUrl: true,
    });
    return response as Connect.ConnectResponse;
  }

  async connectionState(
    options: ConnectionState.ConnectionStateRequest
  ): Promise<ConnectionState.ConnectionStateResponse> {
    const response = await this.api.get(Routes.Instance.ConnectionState, {
      instance: options.instanceName,
      isInstanceUrl: true,
    });
    return response as ConnectionState.ConnectionStateResponse;
  }

  async logout(options: Logout.LogoutRequest): Promise<Logout.LogoutResponse> {
    const response = await this.api.delete(Routes.Instance.Logout, {
      instance: options.instanceName,
      isInstanceUrl: true,
    });
    return response as Logout.LogoutResponse;
  }

  async delete(options: Delete.DeleteRequest): Promise<Delete.DeleteResponse> {
    const response = await this.api.delete(Routes.Instance.Delete, {
      instance: options.instanceName,
      isInstanceUrl: true,
    });
    return response as Delete.DeleteResponse;
  }

  async restart(
    options: Restart.RestartRequest
  ): Promise<Restart.RestartResponse> {
    const response = await this.api.post(Routes.Instance.Restart, {
      instance: options.instanceName,
      isInstanceUrl: true,
    });
    return response as Restart.RestartResponse;
  }

  async fetchAll(
    options?: FetchAll.FetchAllRequest
  ): Promise<FetchAll.FetchAllResponse> {
    const response = await this.api.get(Routes.Instance.FetchAll, {
      params: options,
      isInstanceUrl: false,
    });
    return response as FetchAll.FetchAllResponse;
  }

  async setPresence(
    options: SetPresence.SetPresenceRequest,
    methodOptions?: MethodOptions
  ): Promise<SetPresence.SetPresenceResponse> {
    const { instanceName, ...rest } = options;
    const instance = methodOptions?.instance ?? instanceName;
    if (!instance) {
      throw new Error("Instance name is required");
    }
    const response = await this.api.post(Routes.Instance.SetPresence, {
      body: rest,
      instance,
      isInstanceUrl: true,
    });
    return response as SetPresence.SetPresenceResponse;
  }
}
