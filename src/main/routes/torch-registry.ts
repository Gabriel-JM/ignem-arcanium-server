import { adaptEvent } from '@/main/adapters'
import { makeCreateTorchRegistryController } from '@/main/factories/controllers'
import { Router } from '@/main/server/router'

export function torchRegistryRoutes(router: Router) {
  router.defineRoute('create-torch-registry', adaptEvent(
    makeCreateTorchRegistryController(),
    'create-torch-registry-response'
  ))
}
