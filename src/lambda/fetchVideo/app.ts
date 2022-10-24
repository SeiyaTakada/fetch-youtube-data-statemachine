interface InputEvent {
  channel_ids: string[]
}

interface OutputEvent {
  video_ids: string[]
}

export const handler = async ({ channel_ids }: InputEvent): Promise<OutputEvent> => {
  return {
    video_ids: channel_ids
  }
}