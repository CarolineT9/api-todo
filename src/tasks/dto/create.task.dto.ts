/*
  DTO = DATA TRANSFER OCBJECT  (Objeto de transferencia de dados)
  > Validar dados, transformar dados
*/

import { IsNotEmpty, isNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateTaskDto{
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string; 

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number
}