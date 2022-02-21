export function ok(data: any) {
  return {
    statusCode: 200,
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
