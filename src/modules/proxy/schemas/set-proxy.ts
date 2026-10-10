export type ProxyProtocol = "http" | "socks" | "socks5";

export interface SetProxyRequest {
  enabled: boolean;
  host: string;
  port: string;
  protocol: ProxyProtocol;
  /**
   * Send an empty string when the proxy has no login
   */
  username: string;
  password: string;
}

export interface SetProxyResponse {
  proxy: {
    instanceName: string;
    proxy: SetProxyRequest;
  };
}
