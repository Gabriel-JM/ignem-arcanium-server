import { testKnex } from '@/tests/integration/test-db-connection/knex.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { JwtEncrypter } from '@/infra/cryptography/index.js'
import {
  clearTables,
  closeDbConnection,
  setupTestRequest
} from '@/tests/integration/test-utils/test-setup.js'
import { testRequest } from '@/tests/integration/test-utils/test-request.js'
import { setTimeout } from 'node:timers/promises'

async function setupSut() {
  const idGenerator = new NanoIdUniqueIdGenerator()
  const accountId = idGenerator.generate()

  await testKnex.table('accounts').insert({
    id: accountId,
    name: 'any_name',
    email: 'any-character@email.com',
    password: 'any_password'
  })

  const token = await new JwtEncrypter(process.env.ENCRYPTER_SECRET).encrypt({
    id: accountId,
    name: 'any_name'
  })

  const creature = {
    id: idGenerator.generate(),
    name: 'any_name',
    icon: 'any_icon',
    alignment: 'any_alignment',
    gold: 20,
    statusEffects: [],
    description: null,
    hp: 12,
    mp: 11,
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1
  }

  const dbCreature = {
    ...creature,
    status_effects: '[]'
  }

  Reflect.deleteProperty(dbCreature, 'statusEffects')

  await testKnex.table('creatures').insert(dbCreature)

  const character = {
    id: idGenerator.generate(),
    accountId,
    creatureId: creature.id,
    level: 1,
    experience: 1,
    characterPoints: 0
  }

  const dbCharacter = {
    ...character,
    account_id: accountId,
    creature_id: creature.id,
    character_points: character.characterPoints
  }

  Reflect.deleteProperty(dbCharacter, 'accountId')
  Reflect.deleteProperty(dbCharacter, 'creatureId')
  Reflect.deleteProperty(dbCharacter, 'characterPoints')

  await testKnex.table('characters').insert(dbCharacter)

  return {
    token,
    character,
    creature
  }
}

describe('Find all characters', () => {
  beforeAll(setupTestRequest)
  beforeEach(clearTables('characters', 'creatures', 'accounts'))
  afterAll(closeDbConnection)

  it('should return all characters from the correct account', async () => {
    await setTimeout(4000)

    const { token, creature, character } = await setupSut()

    const { status, body } = await testRequest({
      method: 'get',
      path: '/characters',
      headers: { Authorization: `Bearer ${token}` }
    })

    expect({ status, body }).toEqual({
      status: 200,
      body: [{
        ...creature,
        ...character,
      }]
    })
  })
})
