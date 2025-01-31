import { IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  cardNo: string;

  @IsString()
  nameOnCard: string;

  @IsString()
  expireMonth: string;

  @IsString()
  expireYear: string;

  @IsString()
  cvv: string;
}
