import {fetchGraphQL} from '@/lib/functions'
import {Log} from '@/lib/types'

export async function getAllLogs() {
  const query = `
    query GetAllLogs {
      logs(where: {status: PUBLISH}) {
        nodes {
          date
          databaseId
          title(format: RENDERED)
          content(format: RENDERED)
        }
      }
    }
  `
  const response = await fetchGraphQL(query)

  return response.data.logs.nodes as Log[]
}
