import { server } from '@/main/server/app.ts'
import { createConnectionValidation, initServerAndDb } from '@/tests/integration/connection/index.ts'
import { testKnex } from '@/tests/integration/test-db-connection/knex.ts'
import crypto from 'crypto'
import request from 'superwstest'

describe('Consume all torches', () => {
  initServerAndDb(server, testKnex, 'torch_registries')

  it('should reduce one charge of all lit torches', async () => {
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
        event: 'consume-all-torches',
        headers: {},
        data: null
      })
      .expectJson((messageData) => {
        testKnex
          .table('torch_registries')
          .select()
          .then(result => {
            expect(result[0]).toEqual({
              ...torchesData[0],
              torch_count: 1,
              torch_charge: 6
            })
            expect(result[1]).toEqual({
              ...torchesData[1],
              torch_count: 1,
              torch_charge: 2
            })
            expect(result[2]).toEqual({
              ...torchesData[2]
            })
          })

        expect(messageData.event).toBe('consume-all-torches-response')
        expect(messageData.statusCode).toBe(204)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toBeNull()
      })
  })
})
