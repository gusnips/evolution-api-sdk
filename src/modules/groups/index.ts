import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import type { MethodOptions } from "@/types/api";
import type { GroupInviteCode, GroupJid } from "@/types/tags";

import type * as AcceptInviteCode from "./schemas/accept-invite-code";
import type * as Create from "./schemas/create";
import type * as FetchInviteCode from "./schemas/fetch-invite-code";
import type * as FindAll from "./schemas/find-all";
import type * as FindByInviteCode from "./schemas/find-by-invite-code";
import type * as FindByJid from "./schemas/find-by-jid";
import type * as FindMembers from "./schemas/find-members";
import type * as Leave from "./schemas/leave";
import type * as RevokeInviteCode from "./schemas/revoke-invite-code";
import type * as SendGroupInvite from "./schemas/send-group-invite";
import type * as ToggleEphemeral from "./schemas/toggle-ephemeral";
import type * as UpdateDescription from "./schemas/update-description";
import type * as UpdateMemberAddMode from "./schemas/update-member-add-mode";
import type * as UpdateMembers from "./schemas/update-members";
import type * as UpdatePicture from "./schemas/update-picture";
import type * as UpdateSetting from "./schemas/update-setting";
import type * as UpdateSubject from "./schemas/update-subject";

export class GroupsModule {
  constructor(private readonly api: ApiService) {}

  /**
   * Gets all groups
   * @param getParticipants - Whether to get participants
   * @param methodOptions - Method-specific options (instance override)
   */
  async findAll(
    getParticipants: false,
    methodOptions?: MethodOptions,
  ): Promise<FindAll.FindAllGroupsResponse>;
  async findAll(
    getParticipants: true,
    methodOptions?: MethodOptions,
  ): Promise<FindAll.FindAllGroupsWithParticipantsResponse>;
  async findAll(
    getParticipants = false,
    methodOptions?: MethodOptions,
  ): Promise<
    | FindAll.FindAllGroupsResponse
    | FindAll.FindAllGroupsWithParticipantsResponse
  > {
    const response = await this.api.get(Routes.Groups.FindAll, {
      params: { getParticipants },
      ...methodOptions,
    });

    if (getParticipants) {
      return response as FindAll.FindAllGroupsWithParticipantsResponse;
    }
    return response as FindAll.FindAllGroupsResponse;
  }

  /**
   * Gets a group by invite code
   * @param inviteCode - The group invite code (not the URL)
   * @param methodOptions - Method-specific options (instance override)
   */
  async findByInviteCode(
    inviteCode: string | GroupInviteCode,
    methodOptions?: MethodOptions,
  ): Promise<FindByInviteCode.FindGroupByInviteCodeResponse> {
    const response = await this.api.get(Routes.Groups.FindByInviteCode, {
      params: { inviteCode: inviteCode as GroupInviteCode },
      ...methodOptions,
    });

    return response as FindByInviteCode.FindGroupByInviteCodeResponse;
  }

  /**
   * Gets a group by JID
   * @param groupJid - The group JID terminated with \@g.us
   * @param methodOptions - Method-specific options (instance override)
   */
  async findByJid(
    groupJid: string | GroupJid,
    methodOptions?: MethodOptions,
  ): Promise<FindByJid.FindGroupByJidResponse> {
    const response = await this.api.get(Routes.Groups.FindByJid, {
      params: { groupJid: groupJid as GroupJid },
      ...methodOptions,
    });

    return response as FindByJid.FindGroupByJidResponse;
  }

  async create(
    options: Create.CreateGroupRequest,
    methodOptions?: MethodOptions,
  ): Promise<Create.CreateGroupResponse> {
    const response = await this.api.post(Routes.Groups.Create, {
      body: options,
      ...methodOptions,
    });

    return response as Create.CreateGroupResponse;
  }

  async updatePicture(
    options: UpdatePicture.UpdatePictureRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdatePicture.UpdatePictureResponse> {
    const response = await this.api.post(Routes.Groups.UpdatePicture, {
      body: options,
      ...methodOptions,
    });

    return response as UpdatePicture.UpdatePictureResponse;
  }

  async updateSubject(
    options: UpdateSubject.UpdateSubjectRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdateSubject.UpdateSubjectResponse> {
    const response = await this.api.post(Routes.Groups.UpdateSubject, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateSubject.UpdateSubjectResponse;
  }

  async updateDescription(
    options: UpdateDescription.UpdateDescriptionRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdateDescription.UpdateDescriptionResponse> {
    const response = await this.api.post(Routes.Groups.UpdateDescription, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateDescription.UpdateDescriptionResponse;
  }

  async fetchInviteCode(
    options: FetchInviteCode.FetchInviteCodeRequest,
    methodOptions?: MethodOptions,
  ): Promise<FetchInviteCode.FetchInviteCodeResponse> {
    const response = await this.api.get(Routes.Groups.FetchInviteCode, {
      params: options,
      ...methodOptions,
    });

    return response as FetchInviteCode.FetchInviteCodeResponse;
  }

  async acceptInviteCode(
    options: AcceptInviteCode.AcceptInviteCodeRequest,
    methodOptions?: MethodOptions,
  ): Promise<AcceptInviteCode.AcceptInviteCodeResponse> {
    const response = await this.api.get(Routes.Groups.AcceptInviteCode, {
      params: options,
      ...methodOptions,
    });

    return response as AcceptInviteCode.AcceptInviteCodeResponse;
  }

  async revokeInviteCode(
    options: RevokeInviteCode.RevokeInviteCodeRequest,
    methodOptions?: MethodOptions,
  ): Promise<RevokeInviteCode.RevokeInviteCodeResponse> {
    const response = await this.api.post(Routes.Groups.RevokeInviteCode, {
      body: options,
      ...methodOptions,
    });

    return response as RevokeInviteCode.RevokeInviteCodeResponse;
  }

  async sendGroupInvite(
    options: SendGroupInvite.SendGroupInviteRequest,
    methodOptions?: MethodOptions,
  ): Promise<SendGroupInvite.SendGroupInviteResponse> {
    const response = await this.api.post(Routes.Groups.SendGroupInvite, {
      body: options,
      ...methodOptions,
    });

    return response as SendGroupInvite.SendGroupInviteResponse;
  }

  async findMembers(
    options: FindMembers.FindMembersRequest,
    methodOptions?: MethodOptions,
  ): Promise<FindMembers.FindMembersResponse> {
    const response = await this.api.get(Routes.Groups.FindMembers, {
      params: options,
      ...methodOptions,
    });

    return response as FindMembers.FindMembersResponse;
  }

  async updateMembers(
    options: UpdateMembers.UpdateMembersRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdateMembers.UpdateMembersResponse> {
    const response = await this.api.post(Routes.Groups.UpdateMembers, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateMembers.UpdateMembersResponse;
  }

  async updateSetting(
    options: UpdateSetting.UpdateSettingRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdateSetting.UpdateSettingResponse> {
    const response = await this.api.post(Routes.Groups.UpdateSetting, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateSetting.UpdateSettingResponse;
  }

  async updateMemberAddMode(
    options: UpdateMemberAddMode.UpdateMemberAddModeRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdateMemberAddMode.UpdateMemberAddModeResponse> {
    const response = await this.api.post(Routes.Groups.UpdateMemberAddMode, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateMemberAddMode.UpdateMemberAddModeResponse;
  }

  async toggleEphemeral(
    options: ToggleEphemeral.ToggleEphemeralRequest,
    methodOptions?: MethodOptions,
  ): Promise<ToggleEphemeral.ToggleEphemeralResponse> {
    const response = await this.api.post(Routes.Groups.ToggleEphemeral, {
      body: options,
      ...methodOptions,
    });

    return response as ToggleEphemeral.ToggleEphemeralResponse;
  }

  async leave(
    options: Leave.LeaveRequest,
    methodOptions?: MethodOptions,
  ): Promise<Leave.LeaveResponse> {
    const response = await this.api.delete(Routes.Groups.Leave, {
      params: options,
      ...methodOptions,
    });

    return response as Leave.LeaveResponse;
  }
}
