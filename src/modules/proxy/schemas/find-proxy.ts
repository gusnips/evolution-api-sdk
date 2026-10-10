export interface ProxyRecord {
  id: string;
  enabled: boolean;
  host: string;
  port: string;
  protocol: string;
  username: string;
  password: string;
  createdAt: string | null;
  updatedAt: string;
  instanceId: string;
}

/**
 * `null` when the instance has no proxy yet
 */
export type FindProxyResponse = ProxyRecord | null;
