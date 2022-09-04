import { HttpRouteHandler } from '@/main/server/router.js'

interface RouteInfo {
	method: string
	path: string
  pathRegex: string | RegExp
  handler: HttpRouteHandler
}

interface RouteMatch {
  routeRecord: RouteInfo
  params: Record<string, string>
}

function createPathRegex(path: string) {
  if (!path.includes(':')) {
    return path
  }

	const identifiers = Array.from(path.matchAll(/\/:([\w_\-$]+)/g))
    .map(match => match[1])
	
	const pathRegexString = identifiers.reduce((acc, value) => {
	  return acc.replace(`:${value}`, `(?<${value}>[\\w_\\-$@]+)`)
	}, path)
	
	return new RegExp(pathRegexString)
}

function defineRoutesInfo(routes: Map<string, HttpRouteHandler>) {
  return Array.from(routes.entries()).map(([routeName, routeHandler]) => {
    if (!routeName.endsWith('/')) {
      routeName += '/'
    }

		if (!routeName.includes('::')) {
	    throw new Error('Invalid route definition')
	  }
  
	  const [method, path] = routeName.split('::')

		if (!(/^\//).test(path)) {
		  throw new Error('Invalid path definition')
		}
  
	  const pathRegex = createPathRegex(path)

	  return {
	    method,
	    path,
	    pathRegex,
	    handler: routeHandler
	  }
  })
}

function filterRouteMatches(
  definedRoutes: RouteInfo[],
  requestedMethod: string,
  requestedPath: string
) {
  
  const matchedRouteRecords = definedRoutes.map(routeRecord => {
    const match = requestedPath.match(routeRecord.pathRegex)

    if (!match) return

    const params: Record<string, string> = match?.groups ? match.groups : {}
    const methodHasMatched = requestedMethod.toLowerCase() === routeRecord.method

    const pathHasMatched = (
      match?.[0] === requestedPath
      && match?.input === requestedPath
    )

    if (methodHasMatched && pathHasMatched) {
      return { routeRecord, params }
    }
  }).filter(Boolean) as RouteMatch[]

  return matchedRouteRecords
}

function findCorrectRouteRecord(routeMatches: RouteMatch[], requestedPath: string) {
  
  if (routeMatches.length > 1) {
    for(const routeMatch of routeMatches) {
      if (routeMatch.routeRecord.path === requestedPath) {
        return routeMatch
      }
    }
  }
    
  return routeMatches[0]
}

export function findPathMatch(
  routes: Map<string, HttpRouteHandler>,
  requestedMethod: string,
  requestedPath: string
) {
  const definedRoutes = defineRoutesInfo(routes)

  if (!requestedPath.endsWith('/')) {
    requestedPath += '/'
  }
  
  const matchedRouteRecords = filterRouteMatches(definedRoutes, requestedMethod, requestedPath)

  const findedRouteRecord = findCorrectRouteRecord(
    matchedRouteRecords,
    requestedPath
  )

  return {
    handler: findedRouteRecord?.routeRecord?.handler ?? null,
    params: findedRouteRecord?.params ?? {}
  }
}
