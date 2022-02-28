export class TorchRegistryNotFoundError extends Error {
  name = 'TorchRegistryNotFoundError'
  type = 'Search'

  constructor(readonly searchParameter: Record<string, unknown>) {
    super('Torch registry not found')
  }
}
