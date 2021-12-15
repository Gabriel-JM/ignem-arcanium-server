export interface CreateTorchRegistryRepositoryParams {
  id: string
  characterName: string
  torchCount: number
  torchCharge: number
}

export interface CreateTorchRegistryRepository {
  create(params: CreateTorchRegistryRepositoryParams): Promise<void>
}
