# evolution-api-sdk

## Unreleased

The routes, request bodies and response types now follow the Evolution API source (`develop` branch, July 2026). Many calls failed against a real server, and the response types listed fields the SDK never returned. None of this was run against a live server. It was checked against the server source and with `scripts/check-routes.ts`.

### Breaking changes

- Response types describe the JSON the server sends. Since `ef1666e` the SDK no longer reshapes responses, but the types still listed the reshaped fields.
- `webhook.set` takes `{ webhook: { enabled, url, byEvents, base64, events } }`. `webhook.find` returns the stored record, or `null`.
- `settings.set` requires `rejectCall` and returns `{ settings: { instanceName, settings } }`. `settings.find` returns `null` when nothing is saved.
- `instances.create` requires `integration`. `proxyProtocol` is `http`, `socks` or `socks5`. `chatwootAccountId` is a string. Event channels (`webhook`, `websocket`, `rabbitmq`, `nats`, `sqs`, `pusher`, `kafka`) are objects with an `events` list.
- `instances.connect` and `instances.restart` return a union, because the server answers 200 with `{ error: true, message }` when they fail.
- `WebhookEvent.NEW_TOKEN` and the `NEW_TOKEN`, `ERRORS` and `ERRORS_WEBHOOK` setup names are gone. The server has no such events. Subscribe to group changes with `WebhookEventSetup.GROUP_UPDATE` instead of `GROUPS_UPDATE`. `WebhookEvent.GROUP_PARTICIPANTS_UPDATE` is now `group-participants.update`.
- `chats.archive` takes `{ chat?, lastMessage?, archive }`. `chats.updateMessage` takes `{ number, key, text }`. The bodies of `markAsRead`, `markAsUnread`, `deleteMessage`, `findContacts`, `findMessages` and `findStatusMessage` changed to what the server validates.
- `groups.updatePicture` takes `image`, `toggleEphemeral` takes `expiration`, `updateSetting` takes `action`, `sendGroupInvite` takes `description` and `numbers`. `groups.findMembers` returns `{ participants }`.
- `profile.updatePrivacySettings` takes all six fields at the top level and uses POST. `profile.fetchProfile` returns `status` as a string.
- `messages.sendImage`, `sendVideo`, `sendDocument` and `sendAudio` no longer take `mediatype`. Send methods return one `SentMessageResponse` type. `sendList`, `sendStatus` and `sendTemplate` take the fields the server validates (see the types).

### Fixed

- Wrong routes and verbs: `chats.archive`, `chats.updateMessage`, `groups.findMembers`, `fetchInviteCode`, `sendGroupInvite`, `updateMembers`, `updateSetting`, `acceptInviteCode`, `leave` and `profile.updatePrivacySettings`.
- `GroupInviteCode` is exported, so `groups.acceptInviteCode` can be called.

### Added

- Modules: `labels`, `proxy`, `templates` and `business`.
- Messages: `sendPoll`, `sendPtv`, `sendButtons` and `sendCarousel`. Every send method takes `quoted`, `mentioned`, `mentionsEveryOne`, `linkPreview` and `messageId`. Video takes `gifPlayback` and `gifAttribution`.
- Chats: `markAsPlayed`, `updateBlockStatus`, `findChatByRemoteJid`, `findChannels` and `getPollVote`.
- `groups.updateMemberAddMode` and `profile.fetchLid`.
- `instances.connect` takes `number` to ask for a pairing code. `instances.fetchAll` takes `instanceId` and `number`.
- Every event the server accepts in `WebhookEvent` and `WebhookEventSetup`, and the `MessagingHistorySetPayload` type.
- `scripts/check-routes.ts`, which compares the SDK routes and verbs with a clone of the server source.

### Not included

- A `call` module. The server's `call/offer` returns a fixed fake object and starts no call.
- Chatbot, Chatwoot and message broker routes (Typebot, OpenAI, Dify, RabbitMQ and so on).

## 0.3.0

### Minor Changes

- Added `Instance`, `Profile`, `Webhook`, and `Settings` modules.
- Added missing methods to `Messages`, `Chats`, and `Groups` modules.
- Added `setInstance` method to `EvolutionClient` to allow setting the instance after initialization.
- Added types for webhook payloads (`WebhookPayloadSchema`).
- Added `WebhookEvent` enum for all supported webhook events.
- Updated `README.md` with more usage examples.

### Patch Changes

- Updated `package.json` with new author and repository information.

## 0.2.1

### Patch Changes

- 35a7989: Include instance in error messages.
- 1638df7: Add AggregateError to mapped errors

## 0.2.0

### Minor Changes

- 155b3de: Improved error messages

## 0.1.2

### Patch Changes

- d8bcc58: Fix waveform parsing error.

## 0.1.1

### Patch Changes

- bffe8f7: Fix API response validation

## 0.1.0

### Minor Changes

- 308a394: **Chats module** for finding chats, sending presences and checking numbers
- 308a394: **Messages module** for sending messages
- 308a394: **Groups module** for finding groups
