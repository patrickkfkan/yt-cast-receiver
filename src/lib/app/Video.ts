import type Client from './Client';

interface Video {
  id: string;
  client: Client;

  context?: {
    playlistId?: string,
    params?: string,
    index?: number
    ctt?: string,
  } & Record<string, any>;
}

export default Video;
