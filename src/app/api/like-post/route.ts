import { api } from '@/config/api'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json() as { post_id: string; group_id: string; }
    const { data } = await api.post(
      '/like_post',
      payload
    )

    if (!data) {
      throw new Error('No data received from API')
    }

    return NextResponse.json(data)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'API error'
    console.error('[/api/like-post] error:', message)
    return NextResponse.json({ error: 'API error', message }, { status: 500 })
  }
}
