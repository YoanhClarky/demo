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
import exp = require("constants");


export class CreateArrondissementDto {

  @IsString()
  @IsNotEmpty()
  @Transform((obj) => String(obj.value).trim())
  nom: string;

  @IsNumber()
  ville_id: number;
}

export class IdParamArrondissementDto {
    @IsNumberString()
    id: number;
  }