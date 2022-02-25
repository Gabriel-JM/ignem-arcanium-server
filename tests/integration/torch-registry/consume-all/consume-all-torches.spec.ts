import { connect } from '@/infra/db/knex/knex-helper'
import { server } from '@/main/server/app'
import { createConnectionValidation } from '@/tests/integration/connection/create-connection'
import crypto from 'crypto'
import request from 'superwstest'

describe('Consume all torches', () => {
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

  it('should reduce one charge of all lit torches', async () => {
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
        event: 'consume-all-torches',
        headers: {},
        data: null
      })
      .expectJson((messageData) => {
        knex
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
