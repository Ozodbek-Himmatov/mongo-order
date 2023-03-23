import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OperationDocument = HydratedDocument<Operation>;

@Schema()
export class Operation {
    @Prop()
    order_id: string;

    @Prop({ required: true })
    status_id: number;

    @Prop()
    operation_date: Date;

    @Prop()
    admin_id: number;

    @Prop()
    description: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);