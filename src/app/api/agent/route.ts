import { api } from '@/app/config/api'
import { NextRequest, NextResponse } from 'next/server'
import { Response } from '@/types/response.types'

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as { query: string; account: string }

    const { data }: { data: Response } = await api.post('/agent/query', payload, {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    })
    if (!data) {
      throw new Error('No data received from API')
    }
    return NextResponse.json({ response: data })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'API error'
    console.error('[/api/agent] error:', message)
    return NextResponse.json({ error: 'API error', message }, { status: 500 })
  }
}
