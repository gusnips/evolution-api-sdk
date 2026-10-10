export interface LogoutRequest {
  instanceName: string;
}

export interface LogoutResponse {
  status: "SUCCESS";
  error: false;
  response: {
    /**
     * "Instance logged out", or "Instance was already disconnected"
     */
    message: string;
  };
}
