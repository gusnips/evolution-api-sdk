// Pure TypeScript interfaces for better IDE support and performance
export interface PresenceRequest {
	/**
	 * Chat number or JID to receve the presence
	 */
	number: string;
	/**
	 * Duration of the presence in millisseconds
	 */
	duration?: number;
	/**
	 * Delay of the presence in millisseconds
	 * this is the correct name of the field
	 * https://doc.evolution-api.com/v1/api-reference/chat-controller/send-presence#delay
	 */
	delay: number;
	/**
	 * Presence state
	 * - `composing`: typing a message
	 * - `recording`: recording an audio
	 */
	presence: "composing" | "recording";
	/**
	 * Whether to wait until the presence is finished (duration)
	 */
	waitUntilFinish?: boolean;
}

export interface PresenceBody {
	number: string;
	presence: "composing" | "recording";
	delay: number;
}

// Transform function
export const PresenceBodyTransform = (
	{ waitUntilFinish, duration, ...data }: PresenceRequest
): PresenceBody => ({ ...data, delay: duration });

// Backward compatibility aliases
export type PresenceOptions = PresenceRequest;
export const BodySchema = { parse: PresenceBodyTransform };
