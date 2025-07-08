// Pure TypeScript interfaces for better IDE support and performance
export interface UpdateNameRequest {
  name: string;
}

export interface UpdateNameResponse {
  update: "success" | "error";
}

// Backward compatibility aliases
export type UpdateNameOptions = UpdateNameRequest; 