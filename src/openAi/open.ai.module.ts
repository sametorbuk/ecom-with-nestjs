import { Module } from '@nestjs/common';
import { OpenAiController } from './open.ai.controller';
import { OpenAIService } from './open.ai.service';

@Module({
  controllers: [OpenAiController],
  providers: [OpenAIService],
})
export class OpenAiModule {}
