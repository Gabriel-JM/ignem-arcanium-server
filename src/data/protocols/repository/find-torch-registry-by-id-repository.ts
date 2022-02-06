export type FindTorchRegistryByIdRepositoryResult = null | {
  id: string
  characterName: string
  torchCount: number
  torchCharge: number
  isLit: boolean
}

export interface FindTorchRegistryByIdRepository {
  findById(id: string): Promise<FindTorchRegistryByIdRepositoryResult>
}
