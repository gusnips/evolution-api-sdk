import type { ClientOptions } from "@/schemas/client";
import type { APIRequestInit } from "@/types/api";

import { EvolutionApiError, extractErrorMessage } from "./errors";

export class ApiService {
  constructor(private options: ClientOptions) {}

  setInstance(instance: string) {
    this.options.instance = instance;
  }

  async request<T = unknown>(
    path: string,
    options: APIRequestInit = {},
  ): Promise<T> {
    const { isInstanceUrl = true } = options;
    let instance = this.options.instance;

    // Priority: options.instance > this.options.instance
    if (options.instance) {
      instance = options.instance;
      delete options.instance;
    }

    if (isInstanceUrl && !instance) {
      throw new EvolutionApiError("Instance not set", {
        message:
          "Please set the instance before making a request or pass instance in the method options.",
      });
    }

    const { init, params } = this.makeInit(options);

    const urlPath = isInstanceUrl ? `/${path}/${instance}/` : `/${path}/`;
    const url = new URL(urlPath, this.options.serverUrl);

    // Add query parameters if any
    if (params.toString()) {
      url.search = params.toString();
    }

    let response: Response;
    let data: unknown;

    try {
      response = await fetch(url, init);
      data = await response.json();
    } catch (error) {
      // Handle network errors or JSON parsing errors
      throw new EvolutionApiError("Network or parsing error", error);
    }

    if (!response.ok) {
      // Extract meaningful error message from the response
      const errorMessage =
        extractErrorMessage(data) ||
        `Request failed with status ${response.status}: ${response.statusText}`;

      throw new EvolutionApiError(
        errorMessage,
        {
          message: errorMessage,
          response: JSON.stringify(data),
          url: url.toString(),
          params: params.toString(),
          body: JSON.stringify(options.body),
        },
        response.status,
      );
    }

    return data as T;
  }

  private makeInit(options: APIRequestInit): {
    init: RequestInit;
    params: URLSearchParams;
  } {
    const init: RequestInit = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: this.options.token, // Evolution API uses apikey header
        ...this.options.headers,
        ...options.headers,
      },
    };

    if (options.body) {
      init.body = JSON.stringify(options.body);
    }

    const params = new URLSearchParams();
    if (options.params) {
      // Convert any object to URLSearchParams
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, String(value));
        }
      });
    }

    return { init, params };
  }

  async get<T = unknown>(
    path: string,
    options: Omit<APIRequestInit, "method"> = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  async post<T = unknown>(
    path: string,
    options: Omit<APIRequestInit, "method"> = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: "POST" });
  }

  async put<T = unknown>(
    path: string,
    options: Omit<APIRequestInit, "method"> = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: "PUT" });
  }

  async patch<T = unknown>(
    path: string,
    options: Omit<APIRequestInit, "method"> = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: "PATCH" });
  }

  async delete<T = unknown>(
    path: string,
    options: Omit<APIRequestInit, "method"> = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}
