interface Video {
  id: string;

  context?: {
    playlistId?: string,
    params?: string,
    index?: number
    ctt?: string,
  } & Record<string, any>;
}

export default Video;
