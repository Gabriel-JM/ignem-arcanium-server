vi.mock('nanoid', () => {
  return { nanoid: vi.fn(() => 'any_id') }
})

import { nanoid } from 'nanoid'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'

describe('NanoIdUniqueIdGenerator', () => {
  it('should call nanoid function', () => {
    const sut = new NanoIdUniqueIdGenerator()

    sut.generate()

    expect(nanoid).toHaveBeenCalledWith()
  })

  it('should return a random string', () => {
    const sut = new NanoIdUniqueIdGenerator()

    const response = sut.generate()

    expect(typeof response).toBe('string')
  })
})
