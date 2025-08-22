import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Tutor } from '../../tutors/schemas/tutor.schema';

export type BookingDocument = Booking & Document;

export enum BookingStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Booking {
    @Prop({ required: true })
    bookingDate: Date;

    @Prop({
        type: String,
        enum: Object.values(BookingStatus),
        default: BookingStatus.PENDING,
    })
    status: BookingStatus;

    @Prop()
    notes: string;

    // Mối quan hệ: Lưu trữ ID của User và Tutor
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    student: User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tutor', required: true })
    tutor: Tutor;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);