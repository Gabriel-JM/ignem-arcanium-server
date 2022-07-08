import { CreateCharacterParams } from '@/domain/usecases'

export function fakeCreateCharacterParams() {
  return <CreateCharacterParams> {
    accountId: 'any_account_id',
    name: 'any_name',
    icon: 'any_icon',
    level: 1,
    gold: 10,
    alignment: 'any_alignment',
    characterPoints: 1,
    description: 'any_description',
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 2,
    wisdom: 1,
    charisma: 1
  }
}

export function fakeCharacter() {
  return {
    id: 'any_id',
    accountId: 'any_account_id',
    name: 'any_name',
    icon: 'any_icon',
    level: 1,
    gold: 10,
    hp: 11,
    mp: 12,
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 2,
    wisdom: 1,
    charisma: 1
  }
}

export function mockCreateCharacterRepository() {
  return {
    create: jest.fn(() => Promise.resolve())
  }
}

export function mockFindAllCharactersRepository() {
  const result = [{ ...fakeCharacter(), charism: 1 }]

  return {
    result,
    findAll: jest.fn(() => Promise.resolve(result))
  }
}

export function mockCheckCharacterRepository() {
  return {
    result: true,
    check: jest.fn(() => Promise.resolve(true))
  }
}

export function mockDeleteCharacterRepository() {
  return {
    delete: jest.fn(() => Promise.resolve())
  }
}

export function mockUpdateCharacterRepository() {
  return {
    update: jest.fn(() => Promise.resolve())
  }
}
