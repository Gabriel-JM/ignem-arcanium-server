import { CreateCharacterParams } from '@/domain/usecases/index.ts'

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
    charisma: 1,
    equipment: {},
    inventoryItems: []
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

export function mockCreateCharacterRepository() {
  return {
    create: vi.fn(() => Promise.resolve())
  }
}

export function mockFindAllCharactersRepository() {
  const result = [{ ...fakeCharacter(), charism: 1 }]

  return {
    result,
    findAll: vi.fn(() => Promise.resolve(result))
  }
}

export function mockCheckCharacterRepository() {
  return {
    result: true,
    check: vi.fn(() => Promise.resolve(true))
  }
}

export function mockDeleteCharacterRepository() {
  return {
    delete: vi.fn(() => Promise.resolve())
  }
}

export function mockUpdateCharacterRepository() {
  return {
    update: vi.fn(() => Promise.resolve())
  }
}
