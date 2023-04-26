export type ClientKey = 'YT' | 'YTMUSIC';

interface Client {
  key: ClientKey;
  theme: string;
  name: string;
}

export default Client;
