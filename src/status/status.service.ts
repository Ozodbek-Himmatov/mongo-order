import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Status, StatusDocument } from './schemas/status.schema';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status.name) private statusModel: Model<StatusDocument>,
  ) { }

  async create(createStatusDto: CreateStatusDto): Promise<Status> {
    const createdStatus = new this.statusModel(createStatusDto)
    return createdStatus.save()
  }

  async findAll(): Promise<Status[]> {
    return this.statusModel.find().exec();
  }

  async findOneById(id: string): Promise<Status> {
    return this.statusModel.findById(id).exec();
  }

  async update(id: string, updateStatusDto: UpdateStatusDto): Promise<Status> {
    return this.statusModel.findByIdAndUpdate(id, updateStatusDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Status> {
    return this.statusModel.findByIdAndDelete(id).exec();
  }
}