import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    order_unique_id?: string;
    full_name?: string;
    phone_number?: string;
    email?: string;
    product_link?: string;
    summa?: number;
    currency_type_id?: string;
    truck?: string;
    description?: string;
}