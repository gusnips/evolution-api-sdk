// Pure TypeScript interfaces for better IDE support and performance
import { Jid } from "@/types/tags";

// Raw response interface from API
export interface CheckResponseRaw {
  exists: boolean;
  jid: string;
  number: string;
  name?: string;
  lid?: string;
}

// Transformed response interface
export interface CheckResponseItem {
  exists: boolean;
  jid: Jid;
  number: string;
  name?: string;
  lid?: string;
}

export type CheckOptions = string | string[];
export type CheckResponse = CheckResponseItem[];
