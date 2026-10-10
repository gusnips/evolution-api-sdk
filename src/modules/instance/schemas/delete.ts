export interface DeleteRequest {
  instanceName: string;
}

export interface DeleteResponse {
  status: "SUCCESS";
  error: false;
  response: {
    message: string;
  };
}
