import { adaptEvent } from '@/main/adapters'
import { makeConsumeAllTorchesController, makeCreateTorchRegistryController, makeFindAllTorchRegistriesController } from '@/main/factories/controllers'
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

  router.defineRoute('find-all-torch-registries', adaptEvent(
    makeFindAllTorchRegistriesController(),
    'find-all-torch-registries-response'
  ))
}
