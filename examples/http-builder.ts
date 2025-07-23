class HttpRequestBuilder {
  private method: string = 'GET'
  private baseUrl!: string
  private path: string = ''
  private headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }
  private queryParams: URLSearchParams = new URLSearchParams()
  private body: BodyInit | undefined

  setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE'): this {
    this.method = method
    return this
  }

  setBaseUrl(baseUrl: string): this {
    this.baseUrl = baseUrl
    return this
  }

  setPath(path: string): this {
    this.path = path.startsWith('/') ? path : `/${path}`
    return this
  }

  addHeader(key: string, value: string): this {
    this.headers[key] = value
    return this
  }

  addQueryParam(key: string, value: string): this {
    this.queryParams.append(key, value)
    return this
  }

  setJsonBody(data: object): this {
    this.body = JSON.stringify(data)
    this.headers['Content-Type'] = 'application/json'
    return this
  }

  build(): Request {
    const url = `${this.baseUrl}${this.path}?${this.queryParams.toString()}`
    return new Request(url, {
      method: this.method,
      headers: this.headers,
      // oxlint-disable-next-line no-invalid-fetch-options
      body: this.method !== 'GET' ? this.body : undefined
    })
  }
}

// ✅ Usage Example
const request = new HttpRequestBuilder()
  .setBaseUrl('https://www.httpbin.org')
  .setPath('anything')
  .setMethod('POST')
  .addHeader('Authorization', 'Bearer token123')
  .addQueryParam('priority', 'high')
  .setJsonBody({ ticketType: 'VIP', price: 250 })
  .build()

// Send the request using fetch
fetch(request)
  .then((res) => res.json())
  .then((data) => console.log('Response:', data))
