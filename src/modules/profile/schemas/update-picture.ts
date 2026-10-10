// Pure TypeScript interfaces for better IDE support and performance
export interface UpdatePictureRequest {
  picture: string;
}

export interface UpdatePictureResponse {
  update: "success" | "error";
}
