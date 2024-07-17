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

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty()
  @Transform((obj) => String(obj.value).trim())
  nom: string;

  @IsString()
  @IsNotEmpty()
  @Transform((obj) => String(obj.value).trim())
  prenom: string;

  @IsNumber()
  quartier_id: number;
}

export class IdParamUserDto {
  @IsNumberString()
  id: number;
}