import { Response } from "@/types/response.types";

export const postAgent = async (query: string): Promise<Response> => {
  const account = 'user'

  console.log(query);
  

  const data = await fetch('/api/agent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, account }),
  })

  const { response }: { response: Response } = await data.json()
  return response
}
