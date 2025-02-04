
export function requests() {

  const virtualModuleId = 'virtual:vite-requests-bebra-plugin'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'requests',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export function setGlobalConfig(args) { console.table(args) }`
      }
    },
    transform(source, id) {
      if (id.endsWith('.request')) {
        return `
          const options = ${source}
          export default () => {
            let body
            const headers = new Headers()
            let method = 'GET'
            return {
              toRequest() {
                return new Request(new URL(Object.keys(options.paths).at(0), 'https://jsonplaceholder.typicode.com'), {body, headers, method})
              },
              formData(fd) {
                body = fd
                return this
              },
              body(payload) {
                body = payload
                return this
              },
              json(payload) {
                body = JSON.stringify(payload)
                return this
              },
              header(key, value) {
                headers.append(key, value)
                return this
              },
            }
          }
        `
      }
    }
  }
}
