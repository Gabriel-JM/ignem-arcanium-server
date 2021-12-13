export interface CreateTorchRegistryRepositoryParams {
  characterName: string
  torchCount: number
  torchCharge: number
}

export type CreateTorchRegistryRepositoryResult = string

export interface CreateTorchRegistryRepository {
  create(params: CreateTorchRegistryRepositoryParams): Promise<CreateTorchRegistryRepositoryResult>
}
