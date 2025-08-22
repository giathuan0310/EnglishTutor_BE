// src/packages/schemas/package.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackageDocument = Package & Document;

@Schema({ timestamps: true }) // Tự động thêm createdAt, updatedAt
export class Package {
  @Prop({ required: true, unique: true })
  name: string; // Ví dụ: "Gói Phổ Biến - 20 Buổi"

  @Prop()
  description: string; // Mô tả chi tiết về gói học

  @Prop({ required: true })
  price: number; // Giá tiền của gói

  @Prop({ required: true })
  totalSessions: number; // Tổng số buổi học có trong gói
}

export const PackageSchema = SchemaFactory.createForClass(Package);