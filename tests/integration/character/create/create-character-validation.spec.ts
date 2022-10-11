import { setupTestRequest, testRequest } from '@/tests/integration/test-utils/index.js'

describe('Create characters validation', () => {
  setupTestRequest()

  test('Invalid fields', async () => {
    const response = await testRequest({
      method: 'post',
      path: '/characters',
      body: {
        equipment: {},
        inventoryItems: []
      }
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: {
        name: 'Validation Error',
        details: [
          'name is required',
          'name must be of type string',
          'icon is required',
          'icon must be of type string',
          'level is required',
          'level must be of type number',
          'gold is required',
          'gold must be of type number',
          'alignment is required',
          'alignment must be of type string',
          'alignment must be one of these values: Lawful Good, Lawful Neutral, Lawful Evil, Neutral Good, Neutral, Neutral Evil, Chaotic Good, Chaotic Neutral, Chaotic Evil',
          'characterPoints is required',
          'characterPoints must be of type number',
          'hp is required',
          'hp must be of type number',
          'mp is required',
          'mp must be of type number',
          'strength is required',
          'strength must be of type number',
          'dexterity is required',
          'dexterity must be of type number',
          'constitution is required',
          'constitution must be of type number',
          'intelligence is required',
          'intelligence must be of type number',
          'wisdom is required',
          'wisdom must be of type number',
          'charisma is required',
          'charisma must be of type number'
        ]
      }
    })
  })
})
