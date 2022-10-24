interface InputEvent {
  channel_ids: string[]
}

interface OutputEvent {
  channel_ids: string[]
}

export const handler = async ({ channel_ids }: InputEvent): Promise<OutputEvent> => {
  return {
    channel_ids: channel_ids
  }
}