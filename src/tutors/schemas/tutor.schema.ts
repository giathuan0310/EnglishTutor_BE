import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TutorDocument = Tutor & Document;
// Định nghĩa các trạng thái có thể có của một khung giờ
export enum TimeSlotStatus {
    AVAILABLE = 'available', // Còn trống
    BOOKED = 'booked',       // Đã được đặt
}

// Định nghĩa cấu trúc cho một Khung giờ (TimeSlot)
@Schema({ _id: true, timestamps: true }) // Bật _id để có thể chọn chính xác slot khi booking
class TimeSlot {
    
    _id: Types.ObjectId; 
    
    @Prop({ required: true })
    startTime: Date; // Thời gian bắt đầu

    @Prop({ required: true })
    endTime: Date; // Thời gian kết thúc

    @Prop({ type: String, enum: TimeSlotStatus, default: TimeSlotStatus.AVAILABLE })
    status: TimeSlotStatus; // Trạng thái mặc định là 'available'
}

// Tạo Mongoose Schema cho TimeSlot để có thể sử dụng
export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);

// Định nghĩa cấu trúc cho một Bằng cấp
@Schema({ _id: false }) // _id: false để không tự tạo ID cho sub-document
class Certification {
    @Prop({ required: true })
    name: string; // Ví dụ: "IELTS 8.5" hoặc "TESOL Certificate"

    @Prop()
    issuingOrganization: string; // Ví dụ: "British Council"

    @Prop()
    verificationUrl?: string; // Đường link để xác thực bằng cấp (nếu có)
}

@Schema({ timestamps: true })
export class Tutor {
    @Prop({ required: true })
    name: string;

    // TRƯỜNG MỚI: Video giới thiệu (URL từ YouTube, Vimeo, etc.)
    @Prop()
    videoUrl?: string;

    // CẬP NHẬT: Chuyên ngành giờ là một mảng các chuỗi
    @Prop({ type: [String], required: true })
    specializations: string[]; // Ví dụ: ['Business English', 'IELTS Preparation']

    @Prop({ required: true })
    experienceYears: number;

    @Prop({ required: true, maxlength: 1000 })
    bio: string;

    // TRƯỜNG MỚI: Danh sách bằng cấp
    @Prop({ type: [Certification] })
    certifications: Certification[];

    @Prop({ required: true })
    pricePerHour: number;

    @Prop({ required: true })
    avatarUrl: string;

    @Prop({ default: 0 })
    rating: number;

    // Thêm các trường khác nếu cần
    // Ví dụ: Ngôn ngữ giáo viên có thể nói
    @Prop({ type: [String], default: ['English'] })
    languages: string[];

    @Prop({ type: [TimeSlotSchema], default: [] })
    availability: TimeSlot[]; // Một mảng chứa các khung giờ rảnh
}

export const TutorSchema = SchemaFactory.createForClass(Tutor);