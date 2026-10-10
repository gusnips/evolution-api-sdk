// Pure TypeScript types and utility functions for better IDE support and performance
import { isValidPhoneNumber, parsePhoneNumber } from "libphonenumber-js";
import type { GroupInviteCode, GroupJid, Jid } from "@/types/tags";

// Type definitions
export type PhoneNumber = string;
export type MessageId = string;
export type ChatId = PhoneNumber | Jid | GroupJid;
export type ApiNumber = PhoneNumber | Jid | GroupJid;
export type Media = string; // URL or base64 string

// Utility functions
export const validatePhoneNumber = (value: string): boolean =>
  isValidPhoneNumber(value);
export const parsePhoneNumberUtil = (phoneNumber: string): string =>
  parsePhoneNumber(phoneNumber).number;

export const validateJid = (value: string): boolean =>
  value.endsWith("@s.whatsapp.net");
export const validateGroupJid = (value: string): boolean =>
  value.endsWith("@g.us");
export const validateGroupInviteCode = (value: string): boolean =>
  value.length === 22 && /^[a-zA-Z0-9]{22}$/.test(value);

export const validateMedia = (value: string): boolean => {
  // Check if it's a URL or base64 string
  try {
    new URL(value);
    return true;
  } catch {
    // Check if it's a valid base64 string
    try {
      return btoa(atob(value)) === value;
    } catch {
      return false;
    }
  }
};
