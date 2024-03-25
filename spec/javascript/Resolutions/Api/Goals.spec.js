import { Index, Create } from '../../../../app/javascript/bundles/Resolutions/Api/goals'
import humps from 'humps'
import {jest} from '@jest/globals'

describe('Goals Api', () => {
  global.fetch = jest.fn()

  beforeEach(() => {
    fetch.mockClear()
  })

  it('Index function fetches goals', async () => {
    const mockData = [{ id: 1, title: 'Test Goal' }]
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const data = await Index()
    expect(data).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith('/goals')
  })

  it('Index function throws an error for non-OK responses', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      url: '/goals',
      statusText: 'Not Found',
    })

    await expect(Index()).rejects.toThrow('404 Error, route: /goals, details: Not Found')
  })

  it('Create function sends a POST request with decamelized data', async () => {
    const inputData = { testData: 'value' }
    const mockResponse = { message: 'Goal created' }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const response = await Create(inputData)
    expect(response).toEqual(mockResponse)
    expect(fetch).toHaveBeenCalledWith('/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(humps.decamelizeKeys(inputData)),
    })
  })
})
