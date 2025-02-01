import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chatWithGPT(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      return response.choices[0].message.content || 'Yanıt alınamadı.';
    } catch (error) {
      if (error instanceof Error) {
        console.error('OpenAI Hatası:', error.message);
      } else {
        console.error('OpenAI Hatası:', 'An unknown error occurred');
      }
      throw error;
    }
  }
}
