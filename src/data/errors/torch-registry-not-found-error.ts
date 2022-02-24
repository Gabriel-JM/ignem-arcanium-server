export class TorchRegistryNotFoundError extends Error {
  type = 'Business'

  constructor(readonly searchParameter: Record<string, unknown>) {
    super('Torch registry not found')
  }
}
