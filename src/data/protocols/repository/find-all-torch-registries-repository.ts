export interface FindAllTorchRegistriesRepositoryResult {
  id: string
  torchCount: number
  torchCharge: number
  isLit: boolean
}

export interface FindAllTorchRegistriesRepository {
  findAll(): Promise<FindAllTorchRegistriesRepositoryResult[]>
}
