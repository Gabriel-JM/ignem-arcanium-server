export interface UpdateTorchRegistryParams {
  torchCount: number | string
  torchCharge: number | string
  isLit: boolean
}

export interface UpdateTorchRegistry {
  update(params: UpdateTorchRegistryParams): Promise<void>
}

