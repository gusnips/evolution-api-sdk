import { z } from "zod";

export const ClientOptionsSchema = z.object({
	/**
	 * Your server URL
	 */
	serverUrl: z.string().url(),
	/**
	 * Your instance token or global API key
	 */
	token: z.string(),
	/**
	 * Your instance name
	 */
	instance: z.string().optional(),
});

export type ClientOptions = z.infer<typeof ClientOptionsSchema>;
