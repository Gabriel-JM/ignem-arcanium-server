import { adaptEvent } from '@/main/adapters/index.js'
import {
  makeConsumeAllTorchesController,
  makeCreateTorchRegistryController,
  makeFindAllTorchRegistriesController,
  makeUpdateTorchRegistryController
} from '@/main/factories/controllers/index.js'
import { Router } from '@/main/server/router.js'

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
