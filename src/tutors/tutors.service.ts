

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { Tutor, TutorDocument, TimeSlotStatus } from './schemas/tutor.schema';
import { AddAvailabilityDto } from './dto/add-availability.dto';

@Injectable()
export class TutorsService {
  constructor(@InjectModel(Tutor.name) private tutorModel: Model<TutorDocument>) { }


  async create(createTutorDto: CreateTutorDto): Promise<TutorDocument> {
    const createdTutor = new this.tutorModel(createTutorDto);
    return createdTutor.save();
  }


  async findAll(): Promise<TutorDocument[]> {
    return this.tutorModel.find().exec();
  }


  async findOne(id: string): Promise<TutorDocument> {
    const tutor = await this.tutorModel.findById(id).exec();
    if (!tutor) {
      throw new NotFoundException(`Tutor with ID "${id}" not found`);
    }
    return tutor;
  }


  async update(id: string, updateTutorDto: UpdateTutorDto): Promise<TutorDocument> {
    const existingTutor = await this.tutorModel
      .findByIdAndUpdate(id, updateTutorDto, { new: true })
      .exec();
    if (!existingTutor) {
      throw new NotFoundException(`Tutor with ID "${id}" not found`);
    }
    return existingTutor;
  }


  async remove(id: string): Promise<TutorDocument> {
    const deletedTutor = await this.tutorModel.findByIdAndDelete(id).exec();
    if (!deletedTutor) {
      throw new NotFoundException(`Tutor with ID "${id}" not found`);
    }
    return deletedTutor;
  }


  async addAvailability(tutorId: string, addAvailabilityDto: AddAvailabilityDto): Promise<TutorDocument> {
    const tutor = await this.findOne(tutorId);
    const newTimeSlot = {
      startTime: new Date(addAvailabilityDto.startTime),
      endTime: new Date(addAvailabilityDto.endTime),
      status: TimeSlotStatus.AVAILABLE,
    };
    tutor.availability.push(newTimeSlot as any);
    return tutor.save();
  }

  async getAvailableSlots(tutorId: string): Promise<any[]> {
    const tutor = await this.findOne(tutorId);
    return tutor.availability.filter(
      (slot) => slot.status === TimeSlotStatus.AVAILABLE,
    );
  }
}