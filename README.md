<h1 align="center">Evolution API SDK for Javascript</h1>

<p align="center">Unofficial SDK for the <a href="https://doc.evolution-api.com/v2" target="_blank">Evolution Whatsapp API</a> (v2).</p>

<p align="center"><em>This is a fork of <a href="https://github.com/solufyapp/evolution-sdk" target="_blank">@solufy/evolution-sdk</a> with additional features.</em></p>

<div align="center">
  <div style="width: fit-content; display: flex; align-items: flex-start; gap: 4px;">
    <img alt="NPM License" src="https://img.shields.io/npm/l/evolution-api-sdk">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/evolution-api-sdk">
    <a href="https://npmjs.com/package/evolution-api-sdk">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/evolution-api-sdk">
    </a>
  </div>
</div>

## Installation

```bash
npm install evolution-api-sdk
# or
yarn add evolution-api-sdk
# or
bun add evolution-api-sdk
```

## Getting started

```ts
import { EvolutionClient } from "evolution-api-sdk";

const client = new EvolutionClient({
  serverUrl: "Your server url",
  token: "Global api key or instance token",
  instance: "Your instance", // optional
});
```

The types follow the Evolution API source at its `develop` branch (July 2026, commit `e273b90`), which is newer than the 2.3.7 release. A route or field can be missing on an older server.

## Usage examples

### Sending a text message

```ts
client.setInstance("my-instance-01");

await client.messages.sendText({
  number: "5511999999999",
  text: "Hello from the SDK!",
});
```

### Using different instances

Every method takes `{ instance: "name" }` as its last argument. It overrides the default instance for that call:

```ts
await client.messages.sendText(
  {
    number: "5511999999999",
    text: "Hello from another instance!",
  },
  { instance: "different-instance-name" },
);

await client.chats.check(["5511999999999"], { instance: "my-instance" });
```

### Sending an image

```ts
await client.messages.sendImage({
  number: "5511999999999",
  media: "https://i.imgur.com/REo1ODy.png",
  caption: "A cute cat",
});
```

`media` takes a URL or the file as base64.

### Creating a group

`ChatId` marks a string as a chat id. The SDK exports it, with `MessageId` and `GroupInviteCode`, for the fields that need one.

```ts
import { ChatId } from "evolution-api-sdk";

await client.groups.create({
  subject: "My Awesome Group",
  participants: [ChatId("5511999999999"), ChatId("5522988888888")],
});
```

### Checking if a number has WhatsApp

```ts
const result = await client.chats.check(["5511999999999"]);
console.log(result);
// [{ exists: true, jid: "5511999999999@s.whatsapp.net", number: "5511999999999" }]
```

## Responses and errors

Responses are the JSON the server sends. The SDK types describe it as is and renames nothing.

A failed request throws `EvolutionApiError`. It has `message`, `statusCode` and `details`:

```ts
import { EvolutionApiError } from "evolution-api-sdk";

try {
  await client.messages.sendText({ number: "5511999999999", text: "Hi" });
} catch (error) {
  if (error instanceof EvolutionApiError) {
    console.error(error.statusCode, error.message);
  }
}
```

Some calls answer 200 and put the failure in the body: `instances.connect`, `instances.restart` and the `business` calls. Their response types are unions, so you have to check the body before you use it.

## API reference

### Instances

`client.instances`

```ts
// Create an instance. `integration` is required.
const created = await client.instances.create({
  instanceName: "my-bot",
  integration: "WHATSAPP-BAILEYS",
  qrcode: true, // the server waits 5 seconds for the QR code
});
// created.hash is the API key of the new instance
// created.qrcode?.base64 is the QR code image

// Connect. The answer is a QR code, the connection state, or an error.
const result = await client.instances.connect({ instanceName: "my-bot" });
if ("error" in result) throw new Error(result.message);
if ("base64" in result) console.log(result.base64);

// Ask for a pairing code instead of a QR code
await client.instances.connect({
  instanceName: "my-bot",
  number: "5511999999999",
});

// Connection state: "open", "connecting" or "close"
const { instance } = await client.instances.connectionState({
  instanceName: "my-bot",
});
console.log(instance.state);

// List instances. With the global API key and no filter you get all of them.
const instances = await client.instances.fetchAll();
const one = await client.instances.fetchAll({ instanceName: "my-bot" });

await client.instances.setPresence({
  instanceName: "my-bot",
  presence: "available", // or unavailable, composing, recording, paused
});

await client.instances.restart({ instanceName: "my-bot" });
await client.instances.logout({ instanceName: "my-bot" });
await client.instances.delete({ instanceName: "my-bot" });
```

To make the later calls use one instance, call `client.setInstance("my-bot")`.

`create` also takes the instance settings (`rejectCall`, `groupsIgnore` and the others), a proxy (`proxyHost`, `proxyPort`, `proxyProtocol`), event channels (`webhook`, `websocket`, `rabbitmq`, `nats`, `sqs`, `pusher`, `kafka`) and Chatwoot fields. The type has a note on each one.

### Chats

`client.chats`

```ts
import { ChatId } from "evolution-api-sdk";

const numbers = await client.chats.check(["5511999999999", "5522888888888"]);
const chats = await client.chats.findAll();

await client.chats.updatePresence({
  number: "5511999999999",
  presence: "composing",
  delay: 1000,
});

await client.chats.markAsRead({
  readMessages: [
    {
      remoteJid: "5511999999999@s.whatsapp.net",
      fromMe: false,
      id: "message-id",
    },
  ],
});

// Mark received voice messages as played
await client.chats.markAsPlayed({
  playedMessages: [
    {
      remoteJid: "5511999999999@s.whatsapp.net",
      fromMe: false,
      id: "message-id",
    },
  ],
});

await client.chats.markAsUnread({ chat: "5511999999999@s.whatsapp.net" });

await client.chats.archive({
  chat: "5511999999999@s.whatsapp.net",
  archive: true,
});

await client.chats.updateBlockStatus({
  number: ChatId("5511999999999"),
  status: "block", // or "unblock"
});
```

#### Messages

```ts
await client.chats.deleteMessage({
  remoteJid: "5511999999999@s.whatsapp.net",
  fromMe: true,
  id: "message-id",
});

await client.chats.updateMessage({
  number: ChatId("5511999999999"),
  key: {
    remoteJid: "5511999999999@s.whatsapp.net",
    fromMe: true,
    id: "message-id",
  },
  text: "Updated message",
});

const { messages } = await client.chats.findMessages({
  where: { key: { remoteJid: "5511999999999@s.whatsapp.net" } },
  offset: 10, // records per page
  page: 1,
});
console.log(messages.total, messages.records);

const media = await client.chats.getBase64FromMediaMessage({
  message: { key: { id: "message-id" } },
  convertToMp4: true, // optional, for video
});
// { mediaType, fileName, size: { fileLength }, mimetype, base64, buffer }

const { poll } = await client.chats.getPollVote({
  message: { key: { id: "poll-message-id" } },
  remoteJid: "5511999999999@s.whatsapp.net",
});
// poll.results: { "Option A": { votes: 2, voters: [...] }, ... }
```

#### Contacts and channels

```ts
const { profilePictureUrl } = await client.chats.fetchProfilePicture({
  number: ChatId("5511999999999"),
});

const contacts = await client.chats.findContacts({
  where: { pushName: "John" },
});

const chat = await client.chats.findChatByRemoteJid({
  remoteJid: "5511999999999@s.whatsapp.net",
}); // null when there is no such chat

const channels = await client.chats.findChannels({ page: 1, limit: 20 });
```

### Messages

`client.messages`

Every send method takes `number` and these options: `delay` (milliseconds), `quoted`, `linkPreview`, `mentionsEveryOne`, `mentioned` and `messageId`. Each call returns the sent message: `key`, `message`, `messageType`, `messageTimestamp` and more.

#### Text and media

```ts
await client.messages.sendText({
  number: "5511999999999",
  text: "Hello!",
});

await client.messages.sendImage({
  number: "5511999999999",
  media: "https://example.com/image.jpg",
  caption: "Check this out",
});

await client.messages.sendVideo({
  number: "5511999999999",
  media: "https://example.com/video.mp4",
  caption: "Amazing video",
});

// Send a video as a looping GIF
await client.messages.sendVideo({
  number: "5511999999999",
  media: "https://example.com/clip.mp4",
  gifPlayback: true,
});

await client.messages.sendDocument({
  number: "5511999999999",
  media: "https://example.com/document.pdf",
  fileName: "report.pdf",
});

await client.messages.sendAudio({
  number: "5511999999999",
  media: "https://example.com/audio.mp3",
});

// A voice message, shown as a recording
await client.messages.sendVoice({
  number: "5511999999999",
  audio: "https://example.com/voice.ogg",
});

// A round video
await client.messages.sendPtv({
  number: "5511999999999",
  video: "https://example.com/round.mp4",
});

await client.messages.sendSticker({
  number: "5511999999999",
  sticker: "https://example.com/sticker.webp",
});
```

#### Location, contacts and reactions

```ts
import { ChatId, MessageId } from "evolution-api-sdk";

await client.messages.sendLocation({
  number: "5511999999999",
  name: "Avenida Paulista",
  address: "Av. Paulista, São Paulo",
  latitude: -23.5614,
  longitude: -46.6559,
});

await client.messages.sendContact({
  number: "5511999999999",
  contact: [{ fullName: "John Doe", phoneNumber: "5522988888888" }],
});

await client.messages.sendReaction({
  key: {
    remoteJid: ChatId("5511999999999@s.whatsapp.net"),
    fromMe: false,
    id: MessageId("message-id"),
  },
  reaction: "👍",
});
```

#### Polls, lists, buttons and carousels

```ts
await client.messages.sendPoll({
  number: "5511999999999",
  name: "Lunch?",
  selectableCount: 1,
  values: ["Pizza", "Sushi", "Salad"],
});

await client.messages.sendList({
  number: "5511999999999",
  title: "Choose an option",
  description: "Select from the options below",
  footerText: "Tap the button to see them",
  buttonText: "Options",
  sections: [
    {
      title: "Options",
      rows: [
        { rowId: "1", title: "Option 1", description: "First option" },
        { rowId: "2", title: "Option 2", description: "Second option" },
      ],
    },
  ],
});

// Up to 3 reply buttons. Or up to 2 of url, call and copy. Or one pix. Never a mix.
await client.messages.sendButtons({
  number: "5511999999999",
  title: "Order ready",
  description: "Do you want it delivered?",
  buttons: [
    { type: "reply", displayText: "Yes", id: "yes" },
    { type: "reply", displayText: "No", id: "no" },
  ],
});

// From 1 to 10 cards, each with 1 to 3 buttons
await client.messages.sendCarousel({
  number: "5511999999999",
  body: "This week's offers",
  cards: [
    {
      title: "Coffee",
      body: "20% off",
      imageUrl: "https://example.com/coffee.jpg",
      buttons: [
        { type: "url", displayText: "Open", url: "https://example.com" },
      ],
    },
  ],
});
```

#### Status and templates

```ts
await client.messages.sendStatus({
  type: "text",
  content: "Open until 6 pm",
  backgroundColor: "#008000",
  font: 1,
  allContacts: true,
});

// Templates work on WHATSAPP-BUSINESS instances only
await client.messages.sendTemplate({
  number: "5511999999999",
  name: "hello_world",
  language: "en_US",
});
```

### Groups

`client.groups`

```ts
import { ChatId, GroupInviteCode } from "evolution-api-sdk";

const group = await client.groups.create({
  subject: "My Awesome Group",
  description: "Where we talk",
  participants: [ChatId("5511999999999")],
});

const groups = await client.groups.findAll(false); // without participants
const withMembers = await client.groups.findAll(true); // with participants
const byJid = await client.groups.findByJid("group-id@g.us");
const byCode = await client.groups.findByInviteCode("invite-code");

await client.groups.updateSubject({
  groupJid: "group-id@g.us",
  subject: "New name",
});
await client.groups.updateDescription({
  groupJid: "group-id@g.us",
  description: "New description",
});
await client.groups.updatePicture({
  groupJid: "group-id@g.us",
  image: "https://example.com/group-pic.jpg",
});
```

#### Members and settings

```ts
await client.groups.updateMembers({
  groupJid: "group-id@g.us",
  action: "add", // or remove, promote, demote
  participants: ["5511999999999"],
});

const { participants } = await client.groups.findMembers({
  groupJid: "group-id@g.us",
});

// Who can send messages: "announcement" is admins only
await client.groups.updateSetting({
  groupJid: "group-id@g.us",
  action: "announcement", // or not_announcement, locked, unlocked
});

// Who can add members
await client.groups.updateMemberAddMode({
  groupJid: "group-id@g.us",
  mode: "admin_add", // or all_member_add
});

// Disappearing messages: 0 (off), 86400 (1 day), 604800 (7 days), 7776000 (90 days)
await client.groups.toggleEphemeral({
  groupJid: "group-id@g.us",
  expiration: 604800,
});

await client.groups.leave({ groupJid: "group-id@g.us" });
```

#### Invites

```ts
const { inviteUrl, inviteCode } = await client.groups.fetchInviteCode({
  groupJid: "group-id@g.us",
});

await client.groups.revokeInviteCode({ groupJid: "group-id@g.us" });

await client.groups.sendGroupInvite({
  groupJid: "group-id@g.us",
  description: "Join us",
  numbers: ["5511999999999"],
});

await client.groups.acceptInviteCode({
  inviteCode: GroupInviteCode("invite-code"),
});
```

### Profile

`client.profile`

```ts
const profile = await client.profile.fetchProfile({ number: "5511999999999" });

// The answer depends on `isBusiness`
const business = await client.profile.fetchBusinessProfile({
  number: "5511999999999",
});
if (business.isBusiness) console.log(business.description, business.website);

const { lid } = await client.profile.fetchLid({ number: "5511999999999" });

await client.profile.updateName({ name: "My new name" });
await client.profile.updateStatus({ status: "Available" });
await client.profile.updatePicture({
  picture: "https://example.com/my-photo.jpg",
});
await client.profile.removePicture();
```

#### Privacy settings

```ts
const privacy = await client.profile.fetchPrivacySettings();

// Send all six fields
await client.profile.updatePrivacySettings({
  readreceipts: "all", // all or none
  profile: "contacts", // all, contacts, contact_blacklist or none
  status: "contacts",
  online: "all", // all or match_last_seen
  last: "contacts",
  groupadd: "contacts",
});
```

### Settings

`client.settings`

```ts
const settings = await client.settings.find(); // null when nothing is saved

// Send the six booleans. `msgCall` is the text sent when a call is rejected.
await client.settings.set({
  rejectCall: true,
  msgCall: "Sorry, I can't take calls right now",
  groupsIgnore: false,
  alwaysOnline: false,
  readMessages: false,
  readStatus: false,
  syncFullHistory: false,
});
```

### Webhook

`client.webhook`

```ts
import { WebhookEventSetup } from "evolution-api-sdk";

const webhook = await client.webhook.find(); // null when nothing is saved

await client.webhook.set({
  webhook: {
    enabled: true,
    url: "https://your-domain.com/webhook",
    byEvents: false, // true adds the event name to the end of the url
    base64: false, // true sends media as base64
    events: [
      WebhookEventSetup.MESSAGES_UPSERT,
      WebhookEventSetup.MESSAGES_UPDATE,
      WebhookEventSetup.CONNECTION_UPDATE,
    ], // an empty list subscribes to every event
  },
});
```

### Labels

`client.labels`. Works on `WHATSAPP-BAILEYS` instances.

```ts
// Each label has an `id`, a `name` and a `color`
const labels = await client.labels.findAll();

await client.labels.handle({
  number: "5511999999999",
  labelId: "label-id",
  action: "add", // or "remove"
});
```

### Proxy

`client.proxy`

```ts
// The server connects through the proxy once and rejects it if that fails.
// `protocol` is http, socks or socks5. Use "" for username and password when there is no login.
await client.proxy.set({
  enabled: true,
  host: "proxy.example.com",
  port: "8080",
  protocol: "http",
  username: "",
  password: "",
});

const proxy = await client.proxy.find(); // null when nothing is saved
```

### Templates

`client.templates`. Message templates live on Meta's side, so this works on `WHATSAPP-BUSINESS` instances only.

```ts
await client.templates.create({
  name: "order_ready",
  category: "UTILITY",
  language: "en_US",
  components: [{ type: "BODY", text: "Your order is ready." }],
});

const templates = await client.templates.find();

await client.templates.edit({
  templateId: templates[0].id,
  components: [{ type: "BODY", text: "Your order is ready for pickup." }],
});

await client.templates.delete({ name: "order_ready" });
```

### Business

`client.business`. Reads a business account's catalog.

```ts
const catalog = await client.business.getCatalog({ number: "5511999999999" });
if ("catalog" in catalog) console.log(catalog.catalogLength, catalog.catalog);

const collections = await client.business.getCollections({
  number: "5511999999999",
});
```

Leave `number` out to read the catalog of the connected account. When the server cannot read the catalog it answers 200 with `isBusiness: false` and no `catalog`.

## Webhook integration

The SDK types the payloads the server posts to your webhook.

### Basic setup

```ts
import express from "express";
import {
  ConnectionState,
  ConnectionUpdatePayload,
  ContactPayload,
  MessagePayload,
  MessageUpdateStatus,
  WebhookData,
  WebhookEvent,
} from "evolution-api-sdk";

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const webhookData: WebhookData = req.body;
    await processWebhook(webhookData);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Webhook server running on port 3000");
});
```

### Processing events

`WebhookEvent` holds the values of the `event` field (`messages.upsert`).

```ts
async function processWebhook(webhookData: WebhookData): Promise<void> {
  const { event, instance, data } = webhookData;

  switch (event) {
    case WebhookEvent.MESSAGES_UPSERT:
      await handleNewMessage(data as MessagePayload, instance);
      break;

    case WebhookEvent.MESSAGES_UPDATE:
      await handleMessageUpdate(data as MessagePayload);
      break;

    case WebhookEvent.CONNECTION_UPDATE:
      await handleConnectionUpdate(data as ConnectionUpdatePayload);
      break;

    case WebhookEvent.CONTACTS_UPSERT:
    case WebhookEvent.CONTACTS_UPDATE:
      await handleContact(data as ContactPayload);
      break;

    case WebhookEvent.QRCODE_UPDATED:
      console.log(`New QR code for ${instance}`);
      break;

    default:
      console.log(`Unhandled event: ${event}`);
  }
}
```

### Handling messages

```ts
async function handleNewMessage(
  messageData: MessagePayload,
  instance: string,
): Promise<void> {
  const { key, message, pushName } = messageData;

  // Skip groups and messages sent by this instance
  if (key.remoteJid.includes("@g.us") || key.fromMe) return;

  const from = key.remoteJid;
  const contactName = pushName || "Unknown";

  if (message?.conversation) {
    const text = message.conversation;
    console.log(`${contactName} (${from}): ${text}`);

    if (text.toLowerCase() === "hello") {
      await client.messages.sendText(
        {
          number: from.replace("@s.whatsapp.net", ""),
          text: "Hello! How can I help you?",
        },
        { instance },
      );
    }
  } else if (message?.imageMessage) {
    console.log(`${contactName} sent an image`);
  } else if (message?.audioMessage) {
    console.log(`${contactName} sent an audio`);
  }
}

async function handleMessageUpdate(messageData: MessagePayload): Promise<void> {
  const { key, status } = messageData;

  switch (status) {
    case MessageUpdateStatus.SERVER_ACK:
      console.log(`${key.id} reached the server`);
      break;
    case MessageUpdateStatus.DELIVERY_ACK:
      console.log(`${key.id} was delivered`);
      break;
    case MessageUpdateStatus.READ:
      console.log(`${key.id} was read`);
      break;
  }
}

async function handleConnectionUpdate(
  connectionData: ConnectionUpdatePayload,
): Promise<void> {
  const { instance, state, statusReason } = connectionData;

  switch (state) {
    case ConnectionState.OPEN:
      console.log(`${instance} connected`);
      break;
    case ConnectionState.CLOSED:
      console.log(`${instance} disconnected (reason ${statusReason})`);
      break;
    case ConnectionState.CONNECTING:
      console.log(`${instance} is connecting`);
      break;
  }
}

async function handleContact(contactData: ContactPayload): Promise<void> {
  const { remoteJid, pushName } = contactData;
  console.log(`Contact update: ${pushName} (${remoteJid})`);
}
```

### Events

Subscribe with the `WebhookEventSetup` name. The server puts the `WebhookEvent` value in the payload.

| Subscribe with              | Payload `event`             | Sent when                                  |
| --------------------------- | --------------------------- | ------------------------------------------ |
| `APPLICATION_STARTUP`       | `application.startup`       | The API starts                             |
| `INSTANCE_CREATE`           | `instance.create`           | An instance is created                     |
| `INSTANCE_DELETE`           | `instance.delete`           | An instance is deleted                     |
| `REMOVE_INSTANCE`           | `remove.instance`           | An instance is removed                     |
| `LOGOUT_INSTANCE`           | `logout.instance`           | An instance logs out                       |
| `STATUS_INSTANCE`           | `status.instance`           | The status of an instance changes          |
| `QRCODE_UPDATED`            | `qrcode.updated`            | There is a new QR code                     |
| `CONNECTION_UPDATE`         | `connection.update`         | The connection state changes               |
| `MESSAGES_SET`              | `messages.set`              | Messages load after connecting             |
| `MESSAGES_UPSERT`           | `messages.upsert`           | A message arrives                          |
| `MESSAGES_EDITED`           | `messages.edited`           | A message is edited                        |
| `MESSAGES_UPDATE`           | `messages.update`           | A message changes status                   |
| `MESSAGES_DELETE`           | `messages.delete`           | A message is deleted                       |
| `MESSAGING_HISTORY_SET`     | `messaging-history.set`     | The history sync reaches 100%              |
| `SEND_MESSAGE`              | `send.message`              | A message is sent                          |
| `SEND_MESSAGE_UPDATE`       | `send.message.update`       | A sent message changes status              |
| `CONTACTS_SET`              | `contacts.set`              | Contacts load after connecting             |
| `CONTACTS_UPSERT`           | `contacts.upsert`           | A contact is added                         |
| `CONTACTS_UPDATE`           | `contacts.update`           | A contact changes                          |
| `PRESENCE_UPDATE`           | `presence.update`           | Someone's presence changes                 |
| `CHATS_SET`                 | `chats.set`                 | Chats load after connecting                |
| `CHATS_UPSERT`              | `chats.upsert`              | A chat is added                            |
| `CHATS_UPDATE`              | `chats.update`              | A chat changes                             |
| `CHATS_DELETE`              | `chats.delete`              | A chat is deleted                          |
| `GROUPS_UPSERT`             | `groups.upsert`             | A group is added                           |
| `GROUP_UPDATE`              | `groups.update`             | A group changes                            |
| `GROUP_PARTICIPANTS_UPDATE` | `group-participants.update` | Members are added, removed or promoted     |
| `LABELS_EDIT`               | `labels.edit`               | A label is edited                          |
| `LABELS_ASSOCIATION`        | `labels.association`        | A label is added to or removed from a chat |
| `CALL`                      | `call`                      | A call comes in                            |
| `TYPEBOT_START`             | `typebot.start`             | A Typebot flow starts                      |
| `TYPEBOT_CHANGE_STATUS`     | `typebot.change-status`     | A Typebot session changes status           |

## API documentation

Check the [official API documentation](https://doc.evolution-api.com/v2) for more information about their service.

## Contributing

Feel free to contribute with suggestions or bug reports at our [GitHub repository](https://github.com/gusnips/evolution-api-sdk).

To check that the SDK routes and verbs still exist on the server, clone the server source next to the SDK and run the script:

```bash
git clone https://github.com/evolution-foundation/evolution-api refs/evolution-api
bun scripts/check-routes.ts
```

## Authors

- [@joaotonaco](https://github.com/joaotonaco) (Original author)
- [@gusnips](https://github.com/gusnips)
