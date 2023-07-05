import { Validator } from '@/common/validation/protocols/index.ts'

export class FakeValidator implements Validator {
  result: string[] = []
  validate = vi.fn<[], string[]>(() => this.result)
}
