export interface CreateTorchRegistryParams {
  characterName: string
  torchCount: number
  torchCharge?: number
}

export interface CreateTorchRegistryResult {
  id: string
}

export interface CreateTorchRegistry {
  create(params: CreateTorchRegistryParams): Promise<CreateTorchRegistryResult>
}
