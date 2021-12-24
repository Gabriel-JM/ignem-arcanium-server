export interface UpdateManyTorchRegistriesRepositoryParams {
  id: string
  torchCount?: number
  torchCharge?: number
  isLit?: boolean
} 

export interface UpdateManyTorchRegistriesRepository {
  updateMany(params: UpdateManyTorchRegistriesRepositoryParams[]): Promise<void>
}
