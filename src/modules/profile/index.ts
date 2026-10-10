import { Routes } from "@/api/routes";
import type { ApiService } from "@/api/service";
import type { MethodOptions } from "@/types/api";

import type * as FetchBusinessProfile from "./schemas/fetch-business-profile";
import type * as FetchLid from "./schemas/fetch-lid";
import type * as FetchPrivacySettings from "./schemas/fetch-privacy-settings";
import type * as FetchProfile from "./schemas/fetch-profile";
import type * as RemovePicture from "./schemas/remove-picture";
import type * as UpdateName from "./schemas/update-name";
import type * as UpdatePicture from "./schemas/update-picture";
import type * as UpdatePrivacySettings from "./schemas/update-privacy-settings";
import type * as UpdateStatus from "./schemas/update-status";

export class ProfileModule {
  constructor(private readonly api: ApiService) {}

  async fetchBusinessProfile(
    options: FetchBusinessProfile.FetchBusinessProfileRequest,
    methodOptions?: MethodOptions,
  ): Promise<FetchBusinessProfile.FetchBusinessProfileResponse> {
    const response = await this.api.post(Routes.Profile.FetchBusinessProfile, {
      body: options,
      ...methodOptions,
    });

    return response as FetchBusinessProfile.FetchBusinessProfileResponse;
  }

  async fetchProfile(
    options: FetchProfile.FetchProfileRequest,
    methodOptions?: MethodOptions,
  ): Promise<FetchProfile.FetchProfileResponse> {
    const response = await this.api.post(Routes.Profile.FetchProfile, {
      body: options,
      ...methodOptions,
    });

    return response as FetchProfile.FetchProfileResponse;
  }

  /**
   * Finds the LID (WhatsApp's private ID) of a phone number
   * @param options - The phone number
   * @param methodOptions - Method-specific options (instance override)
   */
  async fetchLid(
    options: FetchLid.FetchLidRequest,
    methodOptions?: MethodOptions,
  ): Promise<FetchLid.FetchLidResponse> {
    const response = await this.api.post(Routes.Profile.FetchLid, {
      body: options,
      ...methodOptions,
    });

    return response as FetchLid.FetchLidResponse;
  }

  async updateName(
    options: UpdateName.UpdateNameRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdateName.UpdateNameResponse> {
    const response = await this.api.post(Routes.Profile.UpdateName, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateName.UpdateNameResponse;
  }

  async updateStatus(
    options: UpdateStatus.UpdateStatusRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdateStatus.UpdateStatusResponse> {
    const response = await this.api.post(Routes.Profile.UpdateStatus, {
      body: options,
      ...methodOptions,
    });

    return response as UpdateStatus.UpdateStatusResponse;
  }

  async updatePicture(
    options: UpdatePicture.UpdatePictureRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdatePicture.UpdatePictureResponse> {
    const response = await this.api.post(Routes.Profile.UpdatePicture, {
      body: options,
      ...methodOptions,
    });

    return response as UpdatePicture.UpdatePictureResponse;
  }

  async removePicture(
    methodOptions?: MethodOptions,
  ): Promise<RemovePicture.RemovePictureResponse> {
    const response = await this.api.delete(
      Routes.Profile.RemovePicture,
      methodOptions,
    );

    return response as RemovePicture.RemovePictureResponse;
  }

  async fetchPrivacySettings(
    methodOptions?: MethodOptions,
  ): Promise<FetchPrivacySettings.FetchPrivacySettingsResponse> {
    const response = await this.api.get(
      Routes.Profile.FetchPrivacySettings,
      methodOptions,
    );

    return response as FetchPrivacySettings.FetchPrivacySettingsResponse;
  }

  async updatePrivacySettings(
    options: UpdatePrivacySettings.UpdatePrivacySettingsRequest,
    methodOptions?: MethodOptions,
  ): Promise<UpdatePrivacySettings.UpdatePrivacySettingsResponse> {
    const response = await this.api.post(Routes.Profile.UpdatePrivacySettings, {
      body: options,
      ...methodOptions,
    });

    return response as UpdatePrivacySettings.UpdatePrivacySettingsResponse;
  }
}
