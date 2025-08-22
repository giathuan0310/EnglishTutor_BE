// src/users/users.service.ts (PHIÊN BẢN HOÀN CHỈNH)

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PurchasePackageDto } from './dto/purchase-package.dto';
import { PackagesService } from 'src/packages/packages.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly packagesService: PackagesService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const { password, ...updateData } = updateUserDto;
    const existingUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return existingUser;
  }

  async remove(id: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return deletedUser;
  }

  async purchasePackage(
    userId: string,
    purchasePackageDto: PurchasePackageDto,
  ): Promise<UserDocument> {
    const packageToPurchase = await this.packagesService.findOne(
      purchasePackageDto.packageId,
    );
    if (!packageToPurchase) {
      throw new NotFoundException('Package not found');
    }

    const user = await this.findOne(userId); // Giờ hàm này trả về UserDocument

    const newPurchasedPackage = {
      packageName: packageToPurchase.name,
      totalSessions: packageToPurchase.totalSessions,
      completedSessions: 0,
      purchaseDate: new Date(),
    };

    user.purchasedPackages.push(newPurchasedPackage);
    return user.save();
  }
}