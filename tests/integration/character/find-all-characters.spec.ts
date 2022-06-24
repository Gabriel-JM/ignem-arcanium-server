import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '@/main/server/app'
import { testKnex } from '@/tests/integration/test-db-connection/knex'
import { NanoIdUniqueIdGenerator } from '@/infra/identification'
import { JwtEncrypter } from '@/infra/cryptography'

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

  const character = {
    id: idGenerator.generate(),
    accountId,
    name: 'any_char_name',
    icon: 'any_icon',
    level: 1,
    gold: 20,
    hp: 10,
    mp: 10,
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charism: 1
  }

  const dbCharacter = {
    ...character,
    account_id: accountId
  }

  Reflect.deleteProperty(dbCharacter, 'accountId')

  await testKnex.table('characters').insert(dbCharacter)

  return {
    token,
    character
  }
}

describe('Find all characters', () => {
  beforeAll(async () => {
    chai.use(chaiHttp)
    await testKnex.migrate.latest()
  })

  afterEach(async () => {
    await testKnex.raw('delete from characters')
    await testKnex.raw('delete from accounts')
  })

  afterAll(async () => {
    await testKnex.destroy()
  })

  it('should return all characters from the correct account', async () => {
    const { token, character } = await setupSut()
    
    const response = await chai.request(server)
      .get('/characters')
      .set('Authorization', 'Bearer ' + token)
      
    const body = JSON.parse(response.text)

    expect(response.status).toBe(200)
    expect(body).toEqual([character])
  })
})
