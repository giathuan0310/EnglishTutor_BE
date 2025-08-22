// src/tutors/dto/add-availability.dto.ts
import { IsDateString, IsNotEmpty } from 'class-validator';

export class AddAvailabilityDto {
  @IsDateString({}, { message: 'startTime phải là một chuỗi ngày tháng hợp lệ (ISO 8601)'})
  @IsNotEmpty()
  startTime: string;

  @IsDateString({}, { message: 'endTime phải là một chuỗi ngày tháng hợp lệ (ISO 8601)'})
  @IsNotEmpty()
  endTime: string;
}