export interface CreateTorchRegistryParams {
  characterName: string
  torchCount: number
  torchCharge?: number
  isLit: boolean
}

export type CreateTorchRegistryResult = string

export interface CreateTorchRegistry {
  create(params: CreateTorchRegistryParams): Promise<CreateTorchRegistryResult>
}
