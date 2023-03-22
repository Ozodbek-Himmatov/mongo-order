import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';

import * as bcrypt from "bcrypt"

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) { }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const { user_name, password } = createAdminDto
    const hashed_password = await bcrypt.hash(password, 7);
    const createdAdmin = new this.adminModel({
      user_name,
      hashed_password,
    })
    return createdAdmin.save()
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findOneByUsername(user_name: string) {
    return this.adminModel.findOne({ user_name }).exec()
  }

  async findOneById(id: string): Promise<Admin> {
    return this.adminModel.findById(id).exec();
  }

  async update(id: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Admin> {
    return this.adminModel.findByIdAndDelete(id).exec();
  }
}