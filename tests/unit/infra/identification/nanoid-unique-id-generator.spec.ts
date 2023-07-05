vi.mock('nanoid', () => {
  return { nanoid: vi.fn(() => 'any_id') }
})

vi.mock('@/infra/identification/id-prefixes.ts', () => {
  return {
    IDPrefixes: {
      subject: 'sub_'
    }
  }
})

import { nanoid } from 'nanoid'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.ts'
import { InvalidIDPrefixSubject } from '@/infra/errors/index.ts'

describe('NanoIdUniqueIdGenerator', () => {
  it('should call nanoid function', () => {
    const sut = new NanoIdUniqueIdGenerator()

    sut.generate('subject')

    expect(nanoid).toHaveBeenCalledWith()
  })

  it('should throw an InvalidIDPrefixSubject if an invalid prefix subject is provided', () => {
    const sut = new NanoIdUniqueIdGenerator()

    expect(() => sut.generate('invalid')).toThrowError(new InvalidIDPrefixSubject('invalid'))
  })

  it('should return a random string', () => {
    const sut = new NanoIdUniqueIdGenerator()

    const response = sut.generate('subject')

    expect(response).toBe('sub_any_id')
  })
})
