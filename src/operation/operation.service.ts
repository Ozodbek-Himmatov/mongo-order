import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from "bcrypt"
import { Operation, OperationDocument } from './schemas/operation.schema';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Operation.name) private operationModel: Model<OperationDocument>,
  ) { }

  async create(createOperationDto: CreateOperationDto): Promise<Operation> {
    const createdOperation = new this.operationModel(createOperationDto)
    return createdOperation.save()
  }

  async findAll(): Promise<Operation[]> {
    return this.operationModel.find().exec();
  }

  async findOneByUsername(user_name: string) {
    return this.operationModel.findOne({ user_name }).exec()
  }

  async findOneById(id: string): Promise<Operation> {
    return this.operationModel.findById(id).exec();
  }

  async update(id: string, updateOperationDto: UpdateOperationDto): Promise<Operation> {
    return this.operationModel.findByIdAndUpdate(id, updateOperationDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Operation> {
    return this.operationModel.findByIdAndDelete(id).exec();
  }
}