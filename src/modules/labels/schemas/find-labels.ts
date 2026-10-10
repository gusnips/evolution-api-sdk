export interface Label {
  /**
   * WhatsApp's ID for the label. Pass it as `labelId` to `handle`
   */
  id: string | null;
  name: string;
  color: string;
  predefinedId: string | null;
}

export type FindLabelsResponse = Label[];
