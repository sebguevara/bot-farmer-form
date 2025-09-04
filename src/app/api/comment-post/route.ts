import { api } from '@/config/api'
import { NextRequest, NextResponse } from 'next/server'
import { Response } from '@/types/response.types'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json() as { post_id: string; message: string; username: string; }
  
    const { data }: { data: Response } = await api.post(
      '/comment_post',
      payload
    )

    if (!data) {
      throw new Error('No data received from API')
    }

    return NextResponse.json(data)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'API error'
    console.error('[/api/comment-post] error:', message)
    return NextResponse.json({ error: 'API error', message }, { status: 500 })
  }
}
