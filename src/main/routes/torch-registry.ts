import { adaptEvent } from '@/main/adapters'
import { makeConsumeAllTorchesController, makeCreateTorchRegistryController, makeFindAllTorchRegistriesController } from '@/main/factories/controllers'
import { makeUpdateTorchRegistryController } from '@/main/factories/controllers/torch-registry/update-torch-registry-controller-factory'
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

  router.defineRoute('update-torch-registry', adaptEvent(
    makeUpdateTorchRegistryController(),
    'update-torch-registry-response'
  ))
}
