export class TorchRegistryNotFoundError extends Error {
  constructor(readonly searchParameter: Record<string, unknown>) {
    super('Torch registry not found')
  }
}
