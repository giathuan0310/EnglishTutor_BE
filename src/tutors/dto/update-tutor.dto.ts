// src/tutors/dto/update-tutor.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorDto } from './create-tutor.dto';

export class UpdateTutorDto extends PartialType(CreateTutorDto) { }