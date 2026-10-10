export class EvolutionApiError extends Error {
  public readonly statusCode?: number;
  public readonly details?: unknown;

  constructor(message: string, cause?: unknown, statusCode?: number) {
    const extractedMessage = extractErrorMessage(cause);
    const finalMessage =
      extractedMessage || message || "Unknown error occurred";

    super(finalMessage);

    this.name = EvolutionApiError.name;
    this.message = finalMessage;
    this.statusCode = statusCode;
    this.details = cause;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, EvolutionApiError);
    }
  }

  /**
   * Returns a user-friendly string representation of the error
   */
  toString(): string {
    let result = `${this.name}: ${this.message}`;

    if (this.statusCode) {
      result += ` (${this.statusCode})`;
    }

    // Add relevant details without showing [Object ...]
    if (this.details && typeof this.details === "object") {
      const details = this.details as Record<string, any>;
      const relevantDetails: string[] = [];

      if (details.url) {
        relevantDetails.push(`URL: ${details.url}`);
      }

      if (details.method) {
        relevantDetails.push(`Method: ${details.method}`);
      }

      // Show response details if they exist and are meaningful
      if (details.response && typeof details.response === "object") {
        const response = details.response as Record<string, any>;
        if (response.error && response.error !== this.message) {
          relevantDetails.push(`Server Error: ${response.error}`);
        }
        if (response.message && response.message !== this.message) {
          relevantDetails.push(`Server Message: ${response.message}`);
        }
      }

      if (relevantDetails.length > 0) {
        result += `\n  ${relevantDetails.join("\n  ")}`;
      }
    }

    return result;
  }

  /**
   * Returns a JSON representation suitable for logging
   */
  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      stack: this.stack,
    };
  }
}

/**
 * Extracts error message from various Evolution API error response formats
 */
export function extractErrorMessage(response: unknown): string | null {
  if (!response) {
    return null;
  }

  // Handle string responses
  if (typeof response === "string") {
    return response;
  }

  // Handle object responses
  if (typeof response === "object" && response !== null) {
    const errorObj = response as Record<string, any>;

    // Try different common error message paths, prioritizing Evolution API format
    const messagePaths = [
      // Evolution API specific nested structure (most common)
      errorObj.response?.response?.message?.[0],
      errorObj.response?.response?.error,
      errorObj.response?.response?.description,

      // Evolution API first level nested
      Array.isArray(errorObj.response?.message)
        ? errorObj.response.message[0]
        : null,
      errorObj.response?.error,
      errorObj.response?.description,

      // Direct error message
      Array.isArray(errorObj.message) ? errorObj.message[0] : errorObj.message,
      errorObj.error,
      errorObj.description,
      errorObj.detail,

      // Other nested error messages
      errorObj.data?.error,
      errorObj.data?.message,

      // Array format messages (fallback)
      Array.isArray(errorObj.error) ? errorObj.error[0] : null,
      Array.isArray(errorObj.errors) ? errorObj.errors[0] : null,
    ];

    for (const path of messagePaths) {
      if (typeof path === "string" && path.trim()) {
        return path.trim();
      }
      // Handle nested objects in arrays
      if (typeof path === "object" && path !== null) {
        const nestedMessage = extractErrorMessage(path);
        if (nestedMessage) {
          return nestedMessage;
        }
      }
    }

    // Handle validation errors (common format)
    if (errorObj.validation && Array.isArray(errorObj.validation)) {
      const validationErrors = errorObj.validation
        .map((v: any) => v.message || v.error || String(v))
        .filter(Boolean)
        .join(", ");
      if (validationErrors) {
        return `Validation error: ${validationErrors}`;
      }
    }

    // Handle specific Evolution API error patterns
    if (errorObj.statusCode && errorObj.statusText) {
      return `${errorObj.statusCode}: ${errorObj.statusText}`;
    }

    // Last resort: try to stringify the object meaningfully
    if (Object.keys(errorObj).length > 0) {
      try {
        return JSON.stringify(errorObj);
      } catch {
        return "[Complex error object]";
      }
    }
  }

  return null;
}
