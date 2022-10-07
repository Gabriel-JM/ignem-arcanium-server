import { Validator } from '@/validation/protocols/index.js'

export class FakeValidator implements Validator {
  result: string[] = []
  validate = vi.fn<[], string[]>(() => this.result)
}
