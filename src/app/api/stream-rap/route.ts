import { NextResponse } from 'next/server'
import { OpenAI } from 'langchain/llms/openai'

export const GET = async (req: Request) => {
  return NextResponse.json({ data: 'OK' })
}

export const POST = async (req: Request) => {
  try {
    const { input } = await req.json()

    if (!input) {
      return new Response(null, {
        status: 500,
        statusText: 'Body payload missing',
      })
    }

    return NextResponse.json({ data: 'OK' })
  } catch (error) {
    const msg: string =
      error instanceof Error ? error.message : (error as any).ToString()

    return new Response(null, {
      status: 500,
      statusText: msg,
    })
  }
}
