import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Post('trial')
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
  
    console.log('--- BÊN TRONG CONTROLLER ---');
    console.log('Object req.user được giải mã từ token:', req.user);

    const studentId = req.user._id;
    console.log('ID của sinh viên được lấy ra:', studentId); 

    return this.bookingsService.createTrial(createBookingDto, studentId);
  }

  @Get('my-bookings')
  findMyBookings(@Request() req) {
    const studentId = req.user._id;
    return this.bookingsService.findByStudent(studentId);
  }
}