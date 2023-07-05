import { server } from '@/main/server/app.ts'
import { createConnectionValidation, initServerAndDb } from '@/tests/integration/connection/index.ts'
import { testKnex } from '@/tests/integration/test-db-connection/knex.ts'
import crypto from 'crypto'
import request from 'superwstest'

interface DbTorchRegistry {
  id: string
  character_name: string
  torch_count: number
  torch_charge: number
  is_lit: boolean
}

const mapFields = (dbData: DbTorchRegistry) => ({
  id: dbData.id,
  characterName: dbData.character_name,
  torchCount: dbData.torch_count,
  torchCharge: dbData.torch_charge,
  isLit: Boolean(dbData.is_lit)
})

describe('Find all torch registries', () => {
  initServerAndDb(server, testKnex, 'torch_registries')

  it('should return all torch registries', async () => {
    const torchesData = [
      {
        id: crypto.randomUUID(),
        character_name: 'any_character_name',
        torch_count: 2,
        torch_charge: 1,
        is_lit: true
      },
      {
        id: crypto.randomUUID(),
        character_name: 'any_character_name',
        torch_count: 1,
        torch_charge: 3,
        is_lit: true
      },
      {
        id: crypto.randomUUID(),
        character_name: 'any_character_name',
        torch_count: 1,
        torch_charge: 3,
        is_lit: false
      }
    ]
    
    await testKnex.table('torch_registries').insert(torchesData)

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
