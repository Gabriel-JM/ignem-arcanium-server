export interface FindAllTorchRegistriesRepositoryResult {
  torchCount: number
  torchCharge: number
  isLit: boolean
}

export interface FindAllTorchRegistriesRepository {
  findAll(): Promise<FindAllTorchRegistriesRepositoryResult>
}
