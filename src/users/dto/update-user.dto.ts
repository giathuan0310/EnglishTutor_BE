
import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from 'src/auth/dto/auth.dto';

export class UpdateUserDto extends PartialType(RegisterDto) { }