import { adaptEvent } from '@/main/adapters'
import { makeConsumeAllTorchesController, makeCreateTorchRegistryController, makeFindAllTorchRegistriesController } from '@/main/factories/controllers'
import { makeUpdateTorchRegistryController } from '@/main/factories/controllers/torch-registry/update-torch-registry-controller-factory'
import { Router } from '@/main/server/router'

export function torchRegistryRoutes(router: Router) {
  router.wsEvent('create-torch-registry', adaptEvent(
    makeCreateTorchRegistryController(),
    'create-torch-registry-response'
  ))

  router.wsEvent('consume-all-torches', adaptEvent(
    makeConsumeAllTorchesController(),
    'consume-all-torches-response'
  ))

  router.wsEvent('find-all-torch-registries', adaptEvent(
    makeFindAllTorchRegistriesController(),
    'find-all-torch-registries-response'
  ))

  router.wsEvent('update-torch-registry', adaptEvent(
    makeUpdateTorchRegistryController(),
    'update-torch-registry-response'
  ))
}
