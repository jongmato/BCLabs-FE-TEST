export type EventsType = Array<{
  created: string;
  creator: { email: string; self: boolean };
  description: string;
  end: { dateTime?: string; timeZone?: string; date?: string };
  etag: string;
  eventType: string;
  htmlLink: string;
  iCalUID: string;
  id: string;
  kind: string;
  organizer: { email: string; self: boolean };
  sequence: number;
  start: { dateTime?: string; timeZone?: string; date?: string };
  status: string;
  summary: string;
  updated: string;
}>;

export type EventType = {
  created: string;
  creator: { email: string; self: boolean };
  description: string;
  end: { dateTime?: string; timeZone?: string; date?: string };
  etag: string;
  eventType: string;
  htmlLink: string;
  iCalUID: string;
  id: string;
  kind: string;
  organizer: { email: string; self: boolean };
  sequence: number;
  start: { dateTime?: string; timeZone?: string; date?: string };
  status: string;
  summary: string;
  updated: string;
};
