import ky from 'ky'

export const apiClient = ky.create({
  timeout: 10_000,
  retry: {
    limit: 2,
    methods: ['get'],
  },
  hooks: {
    beforeError: [
      (error) => {
        const { response } = error
        if (response) {
          console.warn(`[API] ${response.status} ${response.url}`)
        }
        return error
      },
    ],
  },
})
