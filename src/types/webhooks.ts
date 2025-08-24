import { MessageUpdateStatus } from "./messages";

export enum ConnectionState {
  OPEN = "open",
  CONNECTING = "connecting",
  CLOSED = "close",
  REFUSED = "refused",
}

export enum MessageType {
  CONVERSATION = "conversation",
  TEXT = "textMessage",
  EPHEMERAL = "ephemeralMessage",
  AUDIO = "audioMessage",
  IMAGE = "imageMessage",
  VIDEO = "videoMessage",
  DOCUMENT = "documentMessage",
  STICKER = "stickerMessage",
  CONTACT = "contactMessage",
  LOCATION = "locationMessage",
  REACTION = "reactionMessage",
  BUTTONS = "buttonsMessage",
}

export interface DeviceListMetadata {
  senderKeyHash: string;
  senderTimestamp: string;
  recipientKeyHash: string;
  recipientTimestamp: string;
}

export interface MessageContextInfo {
  deviceListMetadata?: DeviceListMetadata | Record<string, unknown>;
  deviceListMetadataVersion: number;
  messageSecret: string;
}

export interface DisappearingMode {
  initiator: string;
  trigger: string;
  initiatedByMe: boolean;
}

export interface ContextInfo {
  expiration?: number;
  ephemeralSettingTimestamp?: string;
  disappearingMode?: DisappearingMode;
  stanzaId?: string;
  participant?: string;
  quotedMessage?: {
    conversation?: string;
  };
  statusSourceType?: string;
  forwardingScore?: number;
  isForwarded?: boolean;
  pairedMediaType?: string;
}

export interface ImageMessage {
  url: string;
  mimetype: string;
  fileSha256: string;
  fileLength: string;
  height: number;
  width: number;
  mediaKey: string;
  fileEncSha256: string;
  directPath: string;
  mediaKeyTimestamp: string;
  jpegThumbnail: string;
  contextInfo?: ContextInfo;
  firstScanSidecar: string;
  firstScanLength: number;
  scansSidecar: string;
  scanLengths: number[];
  midQualityFileSha256: string;
  imageSourceType: string;
}

export interface AudioMessage {
  url: string;
  mimetype: string;
  fileSha256: string;
  fileLength: string;
  seconds: number;
  ptt: boolean;
  mediaKey: string;
  fileEncSha256: string;
  directPath: string;
  mediaKeyTimestamp: string;
  waveform: string;
}

export interface StickerMessage {
  url: string;
  width: number;
  height: number;
  isAvatar: boolean;
  isLottie: boolean;
  mediaKey: string;
  mimetype: string;
  directPath: string;
  fileLength: string;
  fileSha256: string;
  isAnimated: boolean;
  isAiSticker: boolean;
  fileEncSha256: string;
  stickerSentTs: string;
  mediaKeyTimestamp: string;
}

export interface VideoMessage {
  url: string;
  mimetype: string;
  fileSha256: string;
  fileLength: string;
  seconds: number;
  mediaKey: string;
  height: number;
  width: number;
  fileEncSha256: string;
  directPath: string;
  mediaKeyTimestamp: string;
  jpegThumbnail: string;
  contextInfo?: ContextInfo;
  streamingSidecar: string;
  externalShareFullVideoDurationInSeconds: number;
}

export interface ReactionMessage {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  text: string;
  senderTimestampMs: string;
}

export interface DocumentMessage {
  url: string;
  mimetype: string;
  fileSha256: string;
  fileLength: string;
  pageCount: number;
  mediaKey: string;
  fileName: string;
  fileEncSha256: string;
  directPath: string;
  mediaKeyTimestamp: string;
  contextInfo: ContextInfo;
  caption: string;
}

export interface ContactMessage {
  displayName: string;
  vcard: string;
}

export interface ExtendedTextMessage {
  text: string;
  contextInfo?: ContextInfo;
}

export type MessageContent = {
  messageContextInfo?: MessageContextInfo;
  conversation?: string;
  extendedTextMessage?: ExtendedTextMessage;
  imageMessage?: ImageMessage;
  audioMessage?: AudioMessage;
  stickerMessage?: StickerMessage;
  ephemeralMessage?: EphemeralMessage;
  videoMessage?: VideoMessage;
  documentMessage?: DocumentMessage;
  contactMessage?: ContactMessage;
  locationMessage?: any;
  reactionMessage?: ReactionMessage;
  buttonsMessage?: any;
};

export interface MessageUpdate {
  status: MessageUpdateStatus;
}

export interface ConnectionUpdatePayload {
  instance: string;
  wuid?: string;
  profileName?: string;
  profilePictureUrl?: string | null;
  state: ConnectionState;
  statusReason: number;
}

export interface ContactPayload {
  remoteJid: string;
  pushName: string;
  profilePicUrl: string | null;
  instanceId: string;
}

export interface EphemeralMessage {
  message: MessageContent;
}

export interface MessagePayload {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
    senderLid?: string;
  };
  pushName?: string;
  message?: MessageContent;
  messageType?: MessageType;
  messageTimestamp?: number;
  status?: string;
  participant?: string;
  contextInfo?: ContextInfo;
  instanceId?: string;
  source?: string;
}

export interface WebhookData {
  event: string;
  instance: string;
  data:
    | MessagePayload
    | ContactPayload
    | ContactPayload[]
    | ConnectionUpdatePayload;
  sender: string;
  date?: number;
  instanceName?: string;
  destination?: string;
  date_time?: string;
  server_url?: string;
  apikey?: string;
}

export interface Instance {
  instanceName: string;
  status: string;
  qrcode?: string;
}

export interface Message {
  key: {
    remoteJid: string;
    fromMe: boolean;
    id: string;
  };
  message: Record<string, unknown>;
  messageTimestamp: number;
  pushName?: string;
}
