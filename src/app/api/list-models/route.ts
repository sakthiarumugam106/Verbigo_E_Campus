
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY environment variable not set.' }, { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const models = await genAI.listModels();

    const availableModels = models.models.map((m) => m.name);

    return NextResponse.json({ availableModels });

  } catch (error: any) {
    console.error('Error listing models:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
