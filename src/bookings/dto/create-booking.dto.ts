
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsMongoId({ message: 'Tutor ID không phải là một Mongo ID hợp lệ.' })
    @IsNotEmpty()
    tutorId: string;


    @IsMongoId({ message: 'Time Slot ID không phải là một Mongo ID hợp lệ.' })
    @IsNotEmpty()
    timeSlotId: string;


    @IsString()
    @IsOptional()
    notes?: string;
}