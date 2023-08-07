export function ok(data: any, headers?: Record<string, string>) {
  return {
    statusCode: 200,
    headers,
    body: data
  }
}

export function created(data: any) {
  return  {
    statusCode: 201,
    body: data
  }
}

export function noContent() {
  return {
    statusCode: 204,
    body: null
  }
}

export function badRequest(data: any) {
  return {
    statusCode: 400,
    body: data
  }
}

export function notFound(data: any) {
  return {
    statusCode: 404,
    body: data
  }
}

export function serverError(data: any) {
  return {
    statusCode: 500,
    body: data
  }
}
