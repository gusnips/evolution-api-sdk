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
// or
yarn add evolution-api-sdk
// or
bun add evolution-api-sdk
```

## Getting Started

```ts
import { EvolutionClient } from "evolution-api-sdk";

const client = new EvolutionClient({
  serverUrl: "Your server url",
  token: "Global api key or instance token",
  instance: "Your instance", // optional
});
```

## Usage Examples

### Sending a Text Message

```ts
client.setInstance("my-instance-01");

await client.messages.sendText({
  number: "5511999999999",
  text: "Hello from the SDK!",
});
```

### Using Different Instances

You can override the default instance for any method call:

```ts
// Send message using a different instance
await client.messages.sendText(
  {
    number: "5511999999999",
    text: "Hello from another instance!",
  },
  { instance: "different-instance-name" }
);

// Check numbers on a specific instance
await client.chats.check(["5511999999999"], { instance: "my-instance" });

// Works with all methods across all modules
await client.groups.create(
  {
    subject: "My Group",
    participants: ["5511999999999"],
  },
  { instance: "work-instance" }
);

await client.profile.updateName(
  {
    name: "New Name",
  },
  { instance: "personal-instance" }
);
```

### Sending an Image

```ts
await client.messages.sendImage({
  number: "5511999999999",
  image: "https://i.imgur.com/REo1ODy.png",
  caption: "A cute cat",
});
```

### Creating a Group

```ts
await client.groups.create({
  subject: "My Awesome Group",
  participants: ["5511999999999", "5522988888888"],
});
```

### Checking if a Number has WhatsApp

```ts
const result = await client.chats.check(["5511999999999"]);
console.log(result);
// [{ jid: '5511999999999@s.whatsapp.net', exists: true }]
```

## API Reference

> **💡 Pro Tip:** All methods support an optional `{ instance: "instance-name" }` parameter to override the default instance.

### 🔧 Instance Management

#### Create Instance

```ts
await client.instance.create({
  instanceName: "my-bot",
  token: "optional-token",
});
```

#### Setting the default Instance

```ts
await client.setInstance("InstanceName");
```

#### Connect to Instance

```ts
await client.instance.connect({ instanceName: "my-bot" });
```

#### Get Connection State

```ts
const state = await client.instance.connectionState({ instanceName: "my-bot" });
```

#### Manage Instance

```ts
// Logout
await client.instance.logout({ instanceName: "my-bot" });

// Restart
await client.instance.restart({ instanceName: "my-bot" });

// Delete
await client.instance.delete({ instanceName: "my-bot" });

// List all instances
const instances = await client.instance.fetchAll();

// Set presence
await client.instance.setPresence({
  instanceName: "my-bot",
  presence: "available",
});
```

---

### 💬 Chat Operations

#### Check WhatsApp Numbers

```ts
const result = await client.chats.check(["5511999999999", "5522888888888"]);
// Override instance: client.chats.check(numbers, { instance: "my-instance" })
```

#### Get All Chats

```ts
const chats = await client.chats.findAll();
```

#### Chat Actions

```ts
client.setInstance("my-instance-01");
// Update presence
await client.chats.updatePresence({
  number: "5511999999999",
  presence: "composing",
  delay: 1000,
});

// Mark as read
await client.chats.markAsRead({
  remoteJid: "5511999999999@s.whatsapp.net",
  fromMe: false,
  id: "message-id",
});

// Archive chat
await client.chats.archive({
  remoteJid: "5511999999999@s.whatsapp.net",
  archive: true,
});
```

#### Message Management

```ts
// Delete message
await client.chats.deleteMessage({
  remoteJid: "5511999999999@s.whatsapp.net",
  fromMe: true,
  id: "message-id",
});

// Find messages
const messages = await client.chats.findMessages({
  where: {
    key: {
      remoteJid: "5511999999999@s.whatsapp.net",
    },
  },
  offset: 10, // limit
  page: 1,
});

// Update message
await client.chats.updateMessage({
  remoteJid: "5511999999999@s.whatsapp.net",
  fromMe: true,
  id: "message-id",
  text: "Updated message",
});

// Get base64 from media message
const mediaBase64 = await client.chats.getBase64FromMediaMessage({
  message: {
    key: {
      id: "message-id",
    },
  },
  convertToMp4: true, // Optional: Convert video to MP4
});

// Response format:
// {
//   "mediaType": "audioMessage",
//   "fileName": "3A3B333C3EC7505284A8.oga",
//   "size": {"fileLength": "7905"},
//   "mimetype": "audio/mp4",
//   "base64": "AAAAIGZ0eXBpc2....=",
//   "buffer": null
// }
```

#### Contact & Profile

```ts
// Fetch profile picture
const profilePic = await client.chats.fetchProfilePicture({
  number: "5511999999999",
});

// Find contacts
const contacts = await client.chats.findContacts({
  where: { name: "John" },
});
```

---

### 📱 Messaging

#### Text Messages

```ts
await client.messages.sendText({
  number: "5511999999999",
  text: "Hello! 👋",
});
```

#### Media Messages

```ts
// Send image
await client.messages.sendImage({
  number: "5511999999999",
  image: "https://example.com/image.jpg",
  caption: "Check this out!",
});

// Send video
await client.messages.sendVideo({
  number: "5511999999999",
  video: "https://example.com/video.mp4",
  caption: "Amazing video!",
});

// Send document
await client.messages.sendDocument({
  number: "5511999999999",
  document: "https://example.com/document.pdf",
  fileName: "report.pdf",
});

// Send audio
await client.messages.sendAudio({
  number: "5511999999999",
  audio: "https://example.com/audio.mp3",
});
```

#### Interactive Messages

```ts
// Send location
await client.messages.sendLocation({
  number: "5511999999999",
  latitude: -23.5505,
  longitude: -46.6333,
  name: "São Paulo",
});

// Send contact
await client.messages.sendContact({
  number: "5511999999999",
  contact: [
    {
      fullName: "John Doe",
      phones: ["5511999999999"],
    },
  ],
});

// Send reaction
await client.messages.sendReaction({
  reactionMessage: {
    key: { remoteJid: "5511999999999@s.whatsapp.net", id: "message-id" },
    text: "👍",
  },
});
```

#### Advanced Messages

```ts
// Send list
await client.messages.sendList({
  number: "5511999999999",
  title: "Choose an option",
  description: "Select from the options below",
  sections: [
    {
      title: "Options",
      rows: [
        { title: "Option 1", description: "First option" },
        { title: "Option 2", description: "Second option" },
      ],
    },
  ],
});

// Send template
await client.messages.sendTemplate({
  number: "5511999999999",
  template: {
    name: "hello_world",
    language: { code: "en_US" },
  },
});
```

---

### 👥 Group Management

#### Group Operations

```ts
// Create group
await client.groups.create({
  subject: "My Awesome Group",
  participants: ["5511999999999", "5522888888888"],
});

// Get all groups
const groups = await client.groups.findAll(false); // without participants
const groupsWithMembers = await client.groups.findAll(true); // with participants

// Find group by invite code
const group = await client.groups.findByInviteCode("invite-code-here");

// Find group by JID
const group = await client.groups.findByJid("group-id@g.us");
```

#### Group Settings

```ts
// Update group subject
await client.groups.updateSubject({
  groupJid: "group-id@g.us",
  subject: "New Group Name",
});

// Update group description
await client.groups.updateDescription({
  groupJid: "group-id@g.us",
  description: "New group description",
});

// Update group picture
await client.groups.updatePicture({
  groupJid: "group-id@g.us",
  image: "https://example.com/group-pic.jpg",
});
```

#### Group Members

```ts
// Add/remove members
await client.groups.updateMembers({
  groupJid: "group-id@g.us",
  action: "add",
  participants: ["5511999999999"],
});

// Get group members
const members = await client.groups.findMembers({
  groupJid: "group-id@g.us",
});

// Leave group
await client.groups.leave({
  groupJid: "group-id@g.us",
});
```

#### Group Invites

```ts
// Get invite code
const inviteCode = await client.groups.fetchInviteCode({
  groupJid: "group-id@g.us",
});

// Revoke invite code
await client.groups.revokeInviteCode({
  groupJid: "group-id@g.us",
});

// Accept invite
await client.groups.acceptInviteCode({
  inviteCode: "invite-code-here",
});
```

---

### 👤 Profile Management

#### Profile Information

```ts
// Get profile
const profile = await client.profile.fetchProfile({
  number: "5511999999999",
});

// Get business profile
const businessProfile = await client.profile.fetchBusinessProfile({
  number: "5511999999999",
});
```

#### Update Profile

```ts
// Update name
await client.profile.updateName({
  name: "My New Name",
});

// Update status
await client.profile.updateStatus({
  status: "Hey there! I'm using WhatsApp",
});

// Update picture
await client.profile.updatePicture({
  picture: "https://example.com/my-photo.jpg",
});

// Remove picture
await client.profile.removePicture();
```

#### Privacy Settings

```ts
// Get privacy settings
const privacy = await client.profile.fetchPrivacySettings();

// Update privacy settings
await client.profile.updatePrivacySettings({
  privacySettings: {
    readReceipts: "all",
    profile: "contacts",
    status: "contacts",
    online: "all",
    last: "contacts",
    groupAdd: "contacts",
  },
});
```

---

### ⚙️ Settings & Webhooks

#### Instance Settings

```ts
// Get settings
const settings = await client.settings.find();

// Update settings
await client.settings.set({
  reject_call: true,
  msg_call: "Sorry, I can't take calls right now",
  groups_ignore: false,
});
```

#### Webhook Configuration

```ts
// Get webhook settings
const webhook = await client.webhook.find();

// Set webhook
await client.webhook.set({
  url: "https://your-webhook-url.com/webhook",
  webhook_by_events: true,
  events: ["MESSAGES_UPSERT", "CONNECTION_UPDATE"],
});
```

---

### 🔄 Instance Override Examples

You can override the default instance for any method:

```ts
// Send message with different instance
await client.messages.sendText(
  {
    number: "5511999999999",
    text: "Hello from work bot!",
  },
  { instance: "work-instance" }
);

// Check numbers on personal instance
await client.chats.check(["5511999999999"], { instance: "personal-bot" });

// Create group on specific instance
await client.groups.create(
  {
    subject: "Team Meeting",
    participants: ["5511999999999"],
  },
  { instance: "team-bot" }
);
```

---

### 🔗 Webhook Integration

The SDK provides complete TypeScript support for handling webhooks from the Evolution API.

#### Basic Webhook Setup

```ts
import express from "express";
import {
  WebhookData,
  WebhookEvent,
  WebhookEventSetup,
  MessagePayload,
  ContactPayload,
  ConnectionUpdatePayload,
} from "evolution-api-sdk";

const app = express();
app.use(express.json());

// Webhook endpoint
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

#### Processing Webhook Events

```ts
async function processWebhook(webhookData: WebhookData): Promise<void> {
  const { event, instance, data } = webhookData;

  console.log(`[WEBHOOK] Event: ${event} | Instance: ${instance}`);

  switch (event) {
    case WebhookEvent.MESSAGES_UPSERT:
      await handleNewMessage(data as MessagePayload, instance);
      break;

    case WebhookEvent.MESSAGES_UPDATE:
      await handleMessageUpdate(data as MessagePayload, instance);
      break;

    case WebhookEvent.CONNECTION_UPDATE:
      await handleConnectionUpdate(data as ConnectionUpdatePayload);
      break;

    case WebhookEvent.CONTACTS_UPSERT:
    case WebhookEvent.CONTACTS_UPDATE:
      await handleContact(data as ContactPayload, instance);
      break;

    case WebhookEvent.QRCODE_UPDATED:
      console.log(`[WEBHOOK] QR Code updated for instance: ${instance}`);
      break;

    default:
      console.log(`[WEBHOOK] Unhandled event: ${event}`);
  }
}
```

#### Message Handling Examples

```ts
async function handleNewMessage(
  messageData: MessagePayload,
  instance: string
): Promise<void> {
  const { key, message, pushName } = messageData;

  // Skip messages from groups (optional)
  if (key.remoteJid?.includes("@g.us")) {
    console.log("Skipping group message");
    return;
  }

  // Skip messages sent by bot itself
  if (key.fromMe) {
    console.log("Skipping outgoing message");
    return;
  }

  const from = key.remoteJid;
  const messageId = key.id;
  const contactName = pushName || "Unknown";

  console.log(`Message from ${contactName} (${from}): ${messageId}`);

  // Process different message types
  if (message?.conversation) {
    // Text message
    const text = message.conversation;
    console.log(`Text: ${text}`);

    // Auto-reply example
    if (text.toLowerCase() === "hello") {
      await client.messages.sendText(
        {
          number: from.replace("@s.whatsapp.net", ""),
          text: "Hello! How can I help you?",
        },
        { instance }
      );
    }
  } else if (message?.imageMessage) {
    // Image message
    console.log(`Received image from ${contactName}`);
    const imageUrl = message.imageMessage.url;
    // Process image...
  } else if (message?.audioMessage) {
    // Audio message
    console.log(`Received audio from ${contactName}`);
    // Process audio...
  }
}

async function handleMessageUpdate(
  messageData: MessagePayload,
  instance: string
): Promise<void> {
  const { key, status } = messageData;
  console.log(`Message ${key.id} status updated to: ${status}`);

  // Handle read receipts, delivery confirmations, etc.
  switch (status) {
    case MessageUpdateStatus.DELIVERY_ACK:
      console.log("Message delivered");
      break;
    case MessageUpdateStatus.READ:
      console.log("Message read by recipient");
      break;
    case MessageUpdateStatus.SERVER_ACK:
      console.log("Message sent to server");
      break;
  }
}

async function handleConnectionUpdate(
  connectionData: ConnectionUpdatePayload
): Promise<void> {
  const { instance, state, statusReason } = connectionData;

  console.log(`Instance ${instance} connection state: ${state}`);

  switch (state) {
    case "open":
      console.log(`✅ Instance ${instance} connected successfully`);
      break;
    case "close":
      console.log(`❌ Instance ${instance} disconnected (${statusReason})`);
      break;
    case "connecting":
      console.log(`🔄 Instance ${instance} connecting...`);
      break;
  }
}

async function handleContact(
  contactData: ContactPayload,
  instance: string
): Promise<void> {
  const { remoteJid, pushName, profilePicUrl } = contactData;

  console.log(`Contact update: ${pushName} (${remoteJid})`);

  // Store or update contact information
  // You might want to save this to your database
}
```

#### Advanced Webhook Processing

```ts
class WebhookProcessor {
  private messageQueue: MessagePayload[] = [];
  private processing = false;

  async processWebhook(webhookData: WebhookData): Promise<void> {
    const { event, data, instance } = webhookData;

    // Add message to queue for batch processing
    if (event === WebhookEvent.MESSAGES_UPSERT) {
      this.messageQueue.push(data as MessagePayload);
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.messageQueue.length === 0) return;

    this.processing = true;

    try {
      // Process messages in batches
      const batch = this.messageQueue.splice(0, 10);

      for (const message of batch) {
        await this.processMessage(message);
        // Add delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } finally {
      this.processing = false;

      // Continue processing if more messages arrived
      if (this.messageQueue.length > 0) {
        setTimeout(() => this.processQueue(), 1000);
      }
    }
  }

  private async processMessage(message: MessagePayload): Promise<void> {
    // Your message processing logic here
    console.log(`Processing message: ${message.key.id}`);
  }
}
```

#### Available Webhook Events

The SDK supports all Evolution API webhook events:

- `WebhookEvent.APPLICATION_STARTUP` - API startup
- `WebhookEvent.QRCODE_UPDATED` - QR code updates
- `WebhookEvent.CONNECTION_UPDATE` - Connection status changes
- `WebhookEvent.MESSAGES_SET` - Initial message load
- `WebhookEvent.MESSAGES_UPSERT` - New messages
- `WebhookEvent.MESSAGES_UPDATE` - Message status updates
- `WebhookEvent.MESSAGES_DELETE` - Message deletions
- `WebhookEvent.SEND_MESSAGE` - Message sending events
- `WebhookEvent.CONTACTS_SET` - Initial contacts load
- `WebhookEvent.CONTACTS_UPSERT` - New contacts
- `WebhookEvent.CONTACTS_UPDATE` - Contact updates
- `WebhookEvent.PRESENCE_UPDATE` - User presence changes
- `WebhookEvent.CHATS_SET` - Initial chats load
- `WebhookEvent.CHATS_UPDATE` - Chat updates
- `WebhookEvent.CHATS_UPSERT` - New chats
- `WebhookEvent.CHATS_DELETE` - Chat deletions
- `WebhookEvent.GROUPS_UPSERT` - New groups
- `WebhookEvent.GROUPS_UPDATE` - Group updates
- `WebhookEvent.GROUP_PARTICIPANTS_UPDATE` - Group member changes
- `WebhookEvent.NEW_TOKEN` - JWT token updates

#### Available Webhook Events to Setup

To setup the WebHook, the constants are these ones:

- `WebhookEventSetup.APPLICATION_STARTUP` - API startup
- `WebhookEventSetup.QRCODE_UPDATED` - QR code updates
- `WebhookEventSetup.CONNECTION_UPDATE` - Connection status changes
- `WebhookEventSetup.MESSAGES_SET` - Initial message load
- `WebhookEventSetup.MESSAGES_UPSERT` - New messages
- `WebhookEventSetup.MESSAGES_UPDATE` - Message status updates
- `WebhookEventSetup.MESSAGES_DELETE` - Message deletions
- `WebhookEventSetup.SEND_MESSAGE` - Message sending events
- `WebhookEventSetup.CONTACTS_SET` - Initial contacts load
- `WebhookEventSetup.CONTACTS_UPSERT` - New contacts
- `WebhookEventSetup.CONTACTS_UPDATE` - Contact updates
- `WebhookEventSetup.PRESENCE_UPDATE` - User presence changes
- `WebhookEventSetup.CHATS_SET` - Initial chats load
- `WebhookEventSetup.CHATS_UPDATE` - Chat updates
- `WebhookEventSetup.CHATS_UPSERT` - New chats
- `WebhookEventSetup.CHATS_DELETE` - Chat deletions
- `WebhookEventSetup.GROUPS_UPSERT` - New groups
- `WebhookEventSetup.GROUPS_UPDATE` - Group updates
- `WebhookEventSetup.GROUP_PARTICIPANTS_UPDATE` - Group member changes
- `WebhookEventSetup.NEW_TOKEN` - JWT token updates

#### Configure Webhook URL

Don't forget to configure your webhook URL in the Evolution API:

```ts
// Set your webhook endpoint
await client.webhook.set({
  url: "https://your-domain.com/webhook",
  webhook_by_events: true,
  events: [
    WebhookEventSetup.MESSAGES_UPSERT,
    WebhookEventSetup.MESSAGES_UPDATE,
    WebhookEventSetup.CONNECTION_UPDATE,
    WebhookEventSetup.CONTACTS_UPSERT,
  ],
});
```

## API Documentation

Check the [official API documentation](https://doc.evolution-api.com/v2) for more information about their service.

## Contributing

Feel free to contribute with suggestions or bug reports at our [GitHub repository](https://github.com/gusnips/evolution-api-sdk).

## Authors

- [@joaotonaco](https://github.com/joaotonaco) (Original author)
- [@gusnips](https://github.com/gusnips)
