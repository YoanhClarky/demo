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

export class CreateVilleDto {

  @IsString()
  @IsNotEmpty()
  @Transform((obj) => String(obj.value).trim())
  nom: string;
}

export class IdParamVilleDto {
    @IsNumberString()
    id: number;
  }