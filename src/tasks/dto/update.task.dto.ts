import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateTaskDto } from './create.task.dto';
/*
  DTO = DATA TRANSFER OCBJECT  (Objeto de transferencia de dados)
  > Validar dados, transformar dados
*/


export class UpdateTaskDto extends PartialType(CreateTaskDto) { //Partial reaproveitas as propriedades do create e torna opcional
  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}
