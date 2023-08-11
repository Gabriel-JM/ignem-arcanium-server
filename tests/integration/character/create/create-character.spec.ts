import { JwtEncrypter } from '@/account/infra/cryptography/index.js'
import { NanoIdUniqueIdGenerator } from '@/infra/identification/index.js'
import { testKnex } from '@/tests/integration/test-db-connection/knex.js'
import { clearTables, closeDbConnection, setupTestRequest, testRequest } from '@/tests/integration/test-utils/index.js'

describe('Create Characters', () => {
  beforeAll(setupTestRequest)
  beforeEach(clearTables('characters', 'creatures', 'accounts'))
  afterAll(closeDbConnection)

  async function createAccount() {
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

    return {
      token
    }
  }

  it('should return an error if a wrong item is set in equipment slot', async () => {
    const { token } = await createAccount()

    const { status, body } = await testRequest({
      method: 'post',
      path: '/characters',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        name: 'Jonh Snow',
        icon: './icon.png',
        level: 1,
        gold: 10,
        alignment: 'Lawful Good',
        characterPoints: 1,
        description: 'Description text',
        strength: 1,
        dexterity: 1,
        constitution: 1,
        intelligence: 1,
        wisdom: 1,
        charisma: 1,
        equipment: {
          leftHand: '4aO5DzTD_phJDk885XjUt', // Dagger
          rightHand: '8twjG-MtlmO3HR0nnzzKM', // Leather Armor
          armor: '0M6FEfl6w95w6ot_hk8j8' // Rope
        }
      }
    })

    expect({ status, body }).toEqual({
      status: 400,
      body: {
        error: {
          name: 'InvalidEquipmentError',
          details: [
            '\'Leather Armor\' cannot be equipped in Right Hand',
            '\'Rope\' cannot be equipped in Armor'
          ]
        }
      }
    })
  })
})
