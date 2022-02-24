export class TorchRegistryNotFoundError extends Error {
  name = 'TorchRegistryNotFoundError'
  type = 'Business'

  constructor(readonly searchParameter: Record<string, unknown>) {
    super('Torch registry not found')
  }
}
