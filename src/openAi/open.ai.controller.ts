import { Controller, Get, Query } from '@nestjs/common';
import { OpenAIService } from './open.ai.service';

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAIService) {}

  @Get('chat')
  async createChat(@Query('message') message: string) {
    return { response: await this.openAiService.chatWithGPT(message) };
  }
}
