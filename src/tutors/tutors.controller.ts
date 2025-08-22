
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { AddAvailabilityDto } from './dto/add-availability.dto';

@Controller('tutors')
export class TutorsController {
  constructor(private readonly tutorsService: TutorsService) { }

  @Post()
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorsService.create(createTutorDto);
  }

  @Get()
  findAll() {
    return this.tutorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.tutorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {

    return this.tutorsService.update(id, updateTutorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {

    return this.tutorsService.remove(id);
  }

  @Post(':id/availability')
  addAvailability(
    @Param('id') id: string,
    @Body() addAvailabilityDto: AddAvailabilityDto,
  ) {
    return this.tutorsService.addAvailability(id, addAvailabilityDto);
  }

  @Get(':id/availability')
  getAvailability(@Param('id') id: string) {
    return this.tutorsService.getAvailableSlots(id);
  }
}