import { IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto{
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @Max(50)
  @Min(0)
  limit: number;

  
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  offset: number;
}