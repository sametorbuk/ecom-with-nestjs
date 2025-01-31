import { Controller } from '@nestjs/common';
import { CardService } from '../service/card.service';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}
}
