const {graphql, HttpResponse} = require('msw')
const {setupServer} = require('msw/node')

const handlers = [
  graphql.mutation('test', () => {
    return HttpResponse.json({data: {test: true}})
  })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())

it('should be able to exit after running tests when using formData', async () => {
  const query = `
    mutation test {
      test
    }
  `
  const operations = `{
     "query": "${query.replace(/\n/g, ' ')}",
     "variables": "{}"
   }`

  const formData = new FormData()
  formData.append('operations', operations)

  await fetch('http://localhost/graphql', { body: formData, method: 'POST' })

  expect(true).toBe(true)
})
