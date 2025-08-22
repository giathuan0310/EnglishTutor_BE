import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

// Định nghĩa cấu trúc cho một gói học đã mua
@Schema({ _id: false })
class PurchasedPackage {
  @Prop({ required: true })
  packageName: string; // Ví dụ: "Gói 20 buổi giao tiếp"

  @Prop({ required: true })
  totalSessions: number;

  @Prop({ required: true, default: 0 })
  completedSessions: number;

  @Prop({ required: true })
  purchaseDate: Date;

  @Prop()
  expiryDate?: Date;
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true, select: false }) // select: false để không trả về password trong các câu query find()
  password: string;

  @Prop({ required: true })
  phone: string;

  // TRƯỜNG MỚI: Mục tiêu học tập
  @Prop({ type: [String] })
  learningGoals?: string[]; // Ví dụ: ["Tự tin thuyết trình", "Luyện thi IELTS 7.0"]

  // TRƯỜNG MỚI: Trình độ hiện tại
  @Prop()
  currentLevel?: string; // Ví dụ: "A2 - Elementary"

  // TRƯỜNG MỚI: Lưu thông tin các gói học đã mua
  @Prop({ type: [PurchasedPackage], default: [] })
  purchasedPackages: PurchasedPackage[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});