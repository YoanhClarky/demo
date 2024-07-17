import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
  isNotEmpty,
  IsNumber,
  IsNumberString,
} from "class-validator";

export class CreateQuartierDto {

  @IsString()
  @IsNotEmpty()
  @Transform((obj) => String(obj.value).trim())
  nom: string;

  @IsNumber()
  arrondissement_id: number;
}

export class IdParamQuartierDto {
    @IsNumberString()
    id: number;
  }