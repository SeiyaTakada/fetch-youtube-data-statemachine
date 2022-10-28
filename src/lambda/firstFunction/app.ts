interface InputEvent {
  firstInputs: string[]
}

interface OutputEvent {
  firstOutputs: string[]
}

export const handler = async ({ firstInputs }: InputEvent): Promise<OutputEvent> => {
  return {
    firstOutputs: firstInputs
  }
}
