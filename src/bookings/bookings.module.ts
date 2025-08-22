// src/bookings/bookings.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { TutorsModule } from 'src/tutors/tutors.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
    TutorsModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule { }
