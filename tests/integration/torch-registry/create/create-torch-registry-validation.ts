import request from 'superwstest'
import { server } from '@/main/server/app'
import { createConnectionValidation } from '@/tests/integration/connection'

describe('Create torch registry validation', () => {
  beforeEach(() => void server.listen(0, 'localhost'))
  afterEach(() => void server.close())
  
  test('characterName', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'create-torch-registry',
        headers: {},
        data: {
          torchCount: 1,
          torchCharge: 3,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('create-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'characterName is required',
              'characterName must be of type string'
            ]
          }
        })
      })
  })

  test('torchCount', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'create-torch-registry',
        headers: {},
        data: {
          characterName: 'any_name',
          torchCharge: 3,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('create-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'torchCount is required',
              'torchCount must be of type number'
            ]
          }
        })
      })
  })

  test('torchCharge', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'create-torch-registry',
        headers: {},
        data: {
          characterName: 'any_name',
          torchCount: 1,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('create-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'torchCharge is required',
              'torchCharge must be of type number',
              'torchCharge must be in between 0 and 6'
            ]
          }
        })
      })
  })

  test('torchCharge greater than 6', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'create-torch-registry',
        headers: {},
        data: {
          characterName: 'any_name',
          torchCount: 1,
          torchCharge: 7,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('create-torch-registry-response')
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

  test('torchCharge lower than 0', async () => {
    await request(server).ws('/ws')
      .expectJson(createConnectionValidation)
      .sendJson({
        event: 'create-torch-registry',
        headers: {},
        data: {
          characterName: 'any_name',
          torchCount: 1,
          torchCharge: -1,
          isLit: false
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('create-torch-registry-response')
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
        event: 'create-torch-registry',
        headers: {},
        data: {
          characterName: 'any_name',
          torchCount: 1,
          torchCharge: 3
        }
      })
      .expectJson((messageData) => {
        expect(messageData.event).toBe('create-torch-registry-response')
        expect(messageData.statusCode).toBe(400)
        expect(messageData.headers).toEqual({})
        expect(messageData.data).toEqual({
          error: {
            name: 'Validation Error',
            details: [
              'isLit is required',
              'isLit must be of type boolean'
            ]
          }
        })
      })
  })
})
