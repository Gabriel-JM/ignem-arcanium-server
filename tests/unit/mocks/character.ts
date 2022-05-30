import { FindAllCharactersRepositoryResult } from '@/data/protocols/repository'

export function fakeCreateCharacterParams() {
  return {
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
    charism: 1
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
    charism: 1
  }
}

export function mockCreateCharacterRepository() {
  return {
    create: jest.fn(() => Promise.resolve())
  }
}

export function mockFindAllCharactersRepository() {
  const result = [fakeCharacter()]

  return {
    result,
    findAll: jest.fn(() => Promise.resolve(result))
  }
}
