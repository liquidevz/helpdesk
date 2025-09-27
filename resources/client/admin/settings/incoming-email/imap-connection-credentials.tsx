export interface ImapConnectionCredentials {
  id: string;
  name: string;
  host: string;
  port?: number;
  username: string;
  password: string;
  ssl?: boolean;
  folders?: string[];
  createTickets?: boolean;
  createReplies?: boolean;
}
