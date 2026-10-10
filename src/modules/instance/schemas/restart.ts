import type { InstanceErrorResponse } from "./connect";

export interface RestartRequest {
  instanceName: string;
}

export type RestartResponse =
  | {
      instance: {
        instanceName: string;
        status: string;
      };
    }
  | InstanceErrorResponse;
