import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { TutorsService } from 'src/tutors/tutors.service';
import { TimeSlotStatus } from 'src/tutors/schemas/tutor.schema';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,

    private tutorsService: TutorsService
  ) { }

  async createTrial(createBookingDto: CreateBookingDto, studentId: string): Promise<Booking> {
    const { tutorId, timeSlotId } = createBookingDto;


    const tutor = await this.tutorsService.findOne(tutorId);


    const timeSlot = tutor.availability.find(
      (slot) => slot._id.toString() === timeSlotId,
    );


    if (!timeSlot) {
      throw new NotFoundException('Khung giờ này không tồn tại hoặc không hợp lệ.');
    }
    if (timeSlot.status === TimeSlotStatus.BOOKED) {
      throw new ConflictException('Rất tiếc, khung giờ này vừa có người khác đặt.');
    }

    // 4. CẬP NHẬT TRẠNG THÁI: Đánh dấu khung giờ là đã được đặt
    timeSlot.status = TimeSlotStatus.BOOKED;
    // Lưu lại sự thay đổi trạng thái của giáo viên vào database
    await tutor.save();

    // 5. TẠO BOOKING MỚI: Bây giờ mới tạo bản ghi booking
    const newBooking = new this.bookingModel({
      tutor: tutorId,
      student: studentId,
      // Lấy thời gian bắt đầu từ khung giờ đã chọn để lưu vào bookingDate
      bookingDate: timeSlot.startTime,
      notes: createBookingDto.notes,
    });

    return newBooking.save();
  }


  // Thêm các hàm tìm kiếm booking của user sau này
  async findByStudent(studentId: string): Promise<Booking[]> {
    return this.bookingModel.find({ student: studentId }).populate('tutor').exec();
  }
}