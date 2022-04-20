import request from 'superwstest'
import { server } from '@/main/server/app'
import { createConnectionValidation } from '@/tests/integration/connection'
import { randomUUID } from 'crypto'

describe('Update torch registry validation', () => {
  beforeEach((done) => void server.listen(0, 'localhost', done))
  afterEach((done) => void server.close(done))
  
  test('id', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          torchCount: 1,
          torchCharge: 3,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'id is required',
              'id must be of type string'
            ]
          }
        })
      })
  })

  test('torchCount', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: randomUUID(),
          torchCharge: 3,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'torchCount must be one of types: string, number'
            ]
          }
        })
      })
  })

  test('torchCharge', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: randomUUID(),
          torchCount: 3,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'torchCharge must be one of types: string, number',
              'torchCharge must be in between 0 and 6'
            ]
          }
        })
      })
  })

  test('numeric torchCharge greater than 6', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: randomUUID(),
          torchCount: 1,
          torchCharge: 7,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'torchCharge must be in between 0 and 6'
            ]
          }
        })
      })
  })

  test('numeric torchCharge lower than 0', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: randomUUID(),
          torchCount: 1,
          torchCharge: -1,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'torchCharge must be in between 0 and 6'
            ]
          }
        })
      })
  })

  test('string torchCharge greater than 6', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: randomUUID(),
          torchCount: 1,
          torchCharge: '+7',
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'torchCharge must be in between 0 and 6'
            ]
          }
        })
      })
  })

  test('string torchCharge lower than 0', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: randomUUID(),
          torchCount: 1,
          torchCharge: '-7',
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'torchCharge must be in between 0 and 6'
            ]
          }
        })
      })
  })

  test('isLit', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'update-torch-registry',
        headers: {},
        data: {
          id: randomUUID(),
          torchCount: 1,
          torchCharge: 3
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('update-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'isLit must be of type boolean'
            ]
          }
        })
      })
  })
})
