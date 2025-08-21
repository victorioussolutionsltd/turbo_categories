// Update the import path to the correct relative location
import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  parent_id: number;
}
