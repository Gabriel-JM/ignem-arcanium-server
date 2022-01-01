export interface FindAllTorchRegistriesRepositoryResult {
  id: string
  characterName: string
  torchCount: number
  torchCharge: number
  isLit: boolean
}

export interface FindAllTorchRegistriesRepository {
  findAll(): Promise<FindAllTorchRegistriesRepositoryResult[]>
}
