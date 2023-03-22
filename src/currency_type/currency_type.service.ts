import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Currency_Type, Currency_TypeDocument } from './schemas/currency_type.schema';
import { CreateCurrency_TypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrency_TypeDto } from './dto/update-currency_type.dto';

@Injectable()
export class Currency_TypeService {
  constructor(
    @InjectModel(Currency_Type.name) private currency_typeModel: Model<Currency_TypeDocument>,
  ) { }

  async create(createCurrency_TypeDto: CreateCurrency_TypeDto): Promise<Currency_Type> {
    const createdCurrency_Type = new this.currency_typeModel(createCurrency_TypeDto)
    return createdCurrency_Type.save()
  }

  async findAll(): Promise<Currency_Type[]> {
    return this.currency_typeModel.find().exec();
  }

  async findOneById(id: string): Promise<Currency_Type> {
    return this.currency_typeModel.findById(id).exec();
  }

  async update(id: string, updateCurrency_TypeDto: UpdateCurrency_TypeDto): Promise<Currency_Type> {
    return this.currency_typeModel.findByIdAndUpdate(id, updateCurrency_TypeDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Currency_Type> {
    return this.currency_typeModel.findByIdAndDelete(id).exec();
  }
}