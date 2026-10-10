export interface GetPollVoteRequest {
  /**
   * The poll message, sent or received
   */
  message: {
    key: {
      id: string;
    };
  };
  remoteJid: string;
}

export interface GetPollVoteResponse {
  poll: {
    name: string;
    totalVotes: number;
    /**
     * Votes and voters of each option, by option name
     */
    results: Record<string, { votes: number; voters: string[] }>;
  };
}
