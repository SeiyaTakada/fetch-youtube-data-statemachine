interface InputEvent {
  firstOutputs: string[]
}

interface OutputEvent {
  secondOutputs: string[]
}

export const handler = async ({ firstOutputs }: InputEvent): Promise<OutputEvent> => {
  return {
    secondOutputs: firstOutputs
  }
}