import { adaptEvent } from '@/main/adapters'
import { makeConsumeAllTorchesController, makeCreateTorchRegistryController } from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function torchRegistryRoutes(router: Router) {
  router.defineRoute('create-torch-registry', adaptEvent(
    makeCreateTorchRegistryController(),
    'create-torch-registry-response'
  ))

  router.defineRoute('consume-all-torches', adaptEvent(
    makeConsumeAllTorchesController(),
    'consume-all-torches-response'
  ))
}
