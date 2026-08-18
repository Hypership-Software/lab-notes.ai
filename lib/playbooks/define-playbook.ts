import { playbookSchema, type PlaybookInput } from "./schema"

export function definePlaybook(input: PlaybookInput) {
  return playbookSchema.parse(input)
}
