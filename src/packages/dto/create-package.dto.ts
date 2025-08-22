
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional() 
  description: string;

  @IsNumber()
  @IsPositive({ message: 'Giá tiền phải là một số dương' })
  price: number;

  @IsNumber()
  @IsPositive({ message: 'Số buổi học phải là một số dương' })
  totalSessions: number;
}