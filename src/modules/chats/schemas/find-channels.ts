export interface FindChannelsRequest {
  page?: number;
  /**
   * Channels per page. Defaults to 50
   */
  limit?: number;
}

export interface Channel {
  /**
   * JID ending with \@newsletter
   */
  remoteJid: string;
  lastMessageTimestamp: number;
}

export interface FindChannelsResponse {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
  records: Channel[];
}
