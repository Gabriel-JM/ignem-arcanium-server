export interface UpdateTorchRegistryRepositoryParams {
  id: string
  torchCount?: number
  torchCharge?: number
  isLit?: boolean
}

export interface UpdateTorchRegistryRepository {
  update(params: UpdateTorchRegistryRepositoryParams): Promise<void>
}
