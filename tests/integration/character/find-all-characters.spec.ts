import chai from 'chai'
import { server } from '@/main/server/app.js'
import { testKnex } from '@/tests/integration/test-db-connection/knex.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { JwtEncrypter } from '@/infra/cryptography/index.js'
import { testSetup } from '@/tests/integration/test-utils/test-setup.js'

async function setupSut() {
  const idGenerator = new NanoIdUniqueIdGenerator()
  const accountId = idGenerator.generate()
  const token = await new JwtEncrypter(process.env.ENCRYPTER_SECRET).encrypt({
    id: accountId,
    name: 'any_name'
  })

  await testKnex.table('accounts').insert({
    id: accountId,
    name: 'any_name',
    email: 'any-character@email.com',
    password: 'any_password'
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
  testSetup('characters', 'accounts')

  it('should return all characters from the correct account', async () => {
    const { token, creature, character } = await setupSut()
    
    const response = await chai.request(server)
      .get('/characters')
      .set('Authorization', 'Bearer ' + token)
      
    const body = JSON.parse(response.text)

    expect(response.status).toBe(200)
    expect(body).toEqual([{
      ...creature,
      ...character,
    }])
  })
})
