import { connect } from '@/infra/db/knex/knex-helper'
import { server } from '@/main/server/app'
import { createConnectionValidation } from '@/tests/integration/connection/create-connection'
import crypto from 'crypto'
import request from 'superwstest'

interface DbTorchRegistry {
  id: string
  character_name: string
  torch_count: number
  torch_charge: number
  is_lit: number
}

const mapFields = (dbData: DbTorchRegistry) => ({
  id: dbData.id,
  characterName: dbData.character_name,
  torchCount: dbData.torch_count,
  torchCharge: dbData.torch_charge,
  isLit: Boolean(dbData.is_lit)
})

describe('Find all torch registries', () => {
  const knex = connect('ignem-arcanium.test.db')
  
  beforeAll(async () => {
    await knex.migrate.latest()
  })

  beforeEach((done) => void server.listen(0, 'localhost', done))
  afterEach((done) => void server.close(done))

  afterAll(async () => {
    await knex.raw('delete from torch_registries;')
    await knex.destroy()
  })

  it('should return all torch registries', async () => {
    const torchesData = [
      {
        id: crypto.randomUUID(),
        character_name: 'any_character_name',
        torch_count: 2,
        torch_charge: 1,
        is_lit: 1
      },
      {
        id: crypto.randomUUID(),
        character_name: 'any_character_name',
        torch_count: 1,
        torch_charge: 3,
        is_lit: 1
      },
      {
        id: crypto.randomUUID(),
        character_name: 'any_character_name',
        torch_count: 1,
        torch_charge: 3,
        is_lit: 0
      }
    ]
    
    await knex.table('torch_registries').insert(torchesData)

    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'find-all-torch-registries',
        headers: {},
        data: null
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('find-all-torch-registries-response')
        expect(messageData.statusCode).toBe(200)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual(torchesData.map(mapFields))
      })
  })
})
