// src/tutors/dto/create-tutor.dto.ts

import {
    IsString,
    IsNotEmpty,
    IsArray,
    IsUrl,
    IsOptional,
    IsNumber,
    Min,
    MaxLength,
    ValidateNested,
    IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

// Đây là DTO cho đối tượng con "Certification"
class CertificationDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    issuingOrganization: string;

    @IsUrl()
    @IsOptional()
    verificationUrl?: string;
}

export class CreateTutorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUrl()
    @IsOptional() // Dấu '?' hoặc decorator @IsOptional() cho biết trường này không bắt buộc
    videoUrl?: string;

    @IsArray()
    @IsString({ each: true }) // 'each: true' đảm bảo mọi phần tử trong mảng là string
    @IsNotEmpty()
    specializations: string[];

    @IsNumber()
    @Min(0) // Kinh nghiệm không thể là số âm
    @IsNotEmpty()
    experienceYears: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000) // Giới hạn độ dài của bio
    bio: string;

    @IsArray()
    @ValidateNested({ each: true }) // Yêu cầu NestJS validate từng object trong mảng
    @Type(() => CertificationDto) // Cho NestJS biết kiểu của các object trong mảng
    @IsOptional()
    certifications?: CertificationDto[];

    @IsNumber()
    @IsPositive() // Giá tiền phải là số dương
    @IsNotEmpty()
    pricePerHour: number;

    @IsUrl()
    @IsNotEmpty()
    avatarUrl: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    languages?: string[];
}