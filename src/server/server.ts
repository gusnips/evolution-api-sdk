import Fastify, { type FastifyInstance } from "fastify";

import type { ChatbotOrchestrator } from "@/chatbot/orchestrator";
import type { WebhookPayload } from "./webhook-types";
import { MessagePayload, WebhookData } from "@/types/webhooks";
import { WebhookEvent } from "@/types/events";
import { EvolutionClient } from "../index";

const client = new EvolutionClient({
  serverUrl: process.env.EVOLUTION_SERVER_URL!,
  token: process.env.EVOLUTION_TOKEN!,
  instance: process.env.EVOLUTION_INSTANCE!,
});
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

export function buildServer(orchestrator: ChatbotOrchestrator): FastifyInstance {
  const fastify = Fastify();

  fastify.post("/webhook", async (request, reply) => {
    const webhookData = request.body as WebhookData;

    if (webhookData.event === WebhookEvent.MESSAGES_UPSERT) {
      
      handleNewMessage(webhookData.data as MessagePayload, webhookData.instance);
    }

    return reply.status(200).send({ received: true });
  });

  return fastify;
}
