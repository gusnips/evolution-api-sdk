// Pure TypeScript interfaces for media message base64 conversion
export interface GetBase64FromMediaMessageRequest {
  message: {
    key: {
      id: string;
    };
  };
  convertToMp4?: boolean;
}

export interface GetBase64FromMediaMessageResponse {
  mediaType: string;
  fileName: string;
  size: {
    fileLength: string;
  };
  mimetype: string;
  base64: string;
  buffer: string | null;
}
