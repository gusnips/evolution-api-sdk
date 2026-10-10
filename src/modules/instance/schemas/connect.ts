import type { ConnectionStateResponse } from "./connection-state";

export interface ConnectRequest {
  instanceName: string;
  /**
   * Phone number with country code. Asks for a pairing code, so the person
   * can link the phone by typing it instead of scanning the QR code
   */
  number?: string;
}

export interface QrCodeResponse {
  count?: number;
  pairingCode?: string;
  base64?: string;
  code?: string;
}

/**
 * The server answers 200 even when connecting fails
 */
export interface InstanceErrorResponse {
  error: true;
  message: string;
}

/**
 * - QR code or pairing code: the instance is waiting to be linked. Can come
 *   back empty if the code was not ready yet, so call `connect` again
 * - connection state: the instance is already connected
 * - error: the instance does not exist or could not start
 */
export type ConnectResponse =
  QrCodeResponse | ConnectionStateResponse | InstanceErrorResponse;
