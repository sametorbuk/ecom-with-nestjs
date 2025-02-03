import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');

    if (!apiKey) {
      throw new Error(
        'OpenAI API key is missing. Please check your .env file.',
      );
    }

    this.openai = new OpenAI({ apiKey });
  }

  async chatWithGPT(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5',
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
