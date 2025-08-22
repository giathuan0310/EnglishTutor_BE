
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package, PackageDocument } from './schemas/package.schema';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<PackageDocument>,
  ) { }

  create(createPackageDto: CreatePackageDto) {
    const createdPackage = new this.packageModel(createPackageDto);
    return createdPackage.save();
  }

  findAll() {
    return this.packageModel.find().exec();
  }

  async findOne(id: string) {
    const pkg = await this.packageModel.findById(id).exec();
    if (!pkg) {
      throw new NotFoundException(`Package with ID "${id}" not found`);
    }
    return pkg;
  }

  async update(id: string, updatePackageDto: UpdatePackageDto) {
    const existingPackage = await this.packageModel
      .findByIdAndUpdate(id, updatePackageDto, { new: true })
      .exec();

    if (!existingPackage) {
      throw new NotFoundException(`Package with ID "${id}" not found`);
    }
    return existingPackage;
  }
  async deleteAll() {
    return this.packageModel.deleteMany({}).exec();
  }
}