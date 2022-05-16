export interface UpdateTorchRegistryParams {
  id: string
  torchCount?: number | string
  torchCharge?: number | string
  isLit?: boolean
}

export interface UpdateTorchRegistry {
  update(params: UpdateTorchRegistryParams): Promise<void>
}

