import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = await new this.orderModel(createOrderDto).save()

    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      String(createdOrder._id),
      { order_unique_id: String(createdOrder._id) },
      { new: true }
    )
      .populate('currency_type_id');

    return updatedOrder
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async findOneByUsername(user_name: string) {
    return this.orderModel.findOne({ user_name }).exec()
  }

  async findOneById(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}