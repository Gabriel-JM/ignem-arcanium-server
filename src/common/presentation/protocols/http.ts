export interface HTTPResponse {
  statusCode: number
  headers?: Record<string, string>
  body: any
}
