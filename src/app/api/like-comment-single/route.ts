import { api } from '@/app/config/api'
import { NextRequest, NextResponse } from 'next/server'
import { Response } from '@/types/response.types'

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json() as { post_id: string; comment_username: string; username: string; }
  
    const { data }: { data: Response } = await api.post(
      '/like_post_comment_single',
      payload
    )

    if (!data) {
      throw new Error('No data received from API')
    }

    return NextResponse.json(data)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'API error'
    console.error('[/api/like-comment-single] error:', message)
    return NextResponse.json({ error: 'API error', message }, { status: 500 })
  }
}
