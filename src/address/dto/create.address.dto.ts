import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  neighborhood: string;

  @IsString()
  title: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  phone: string;
}
