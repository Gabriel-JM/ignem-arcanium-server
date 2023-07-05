import { text } from '@/presentation/helpers/index.ts'

describe('textTagFunction', () => {
  it('should remove all line breaks', () => {
    const response = text`
    
    
    
    `

    expect(response).toBe('')
  })

  it('should not add null or undefined values', () => {
    const response = text`
      My ${null} Text ${undefined}
    `

    expect(response).toBe('My Text')
  })
})
