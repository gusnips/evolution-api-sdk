// Pure TypeScript interfaces for better IDE support and performance
import type { GroupResponse, GroupWithParticipantsResponse } from "./common";

export type FindAllGroupsResponse = GroupResponse[];
export type FindAllGroupsWithParticipantsResponse =
  GroupWithParticipantsResponse[];
