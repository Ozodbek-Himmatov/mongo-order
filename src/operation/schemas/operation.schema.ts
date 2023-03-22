import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OperationDocument = HydratedDocument<Operation>;

@Schema()
export class Operation {
    @Prop()
    order_id: number;

    @Prop({ required: true })
    status_id: number;

    @Prop({ required: true })
    hashed_password: string;

    @Prop()
    phone_number: string;

    @Prop()
    email: string;

    @Prop()
    tg_link: string;

    @Prop()
    hashed_token: string;

    @Prop()
    is_creator: boolean;

    @Prop()
    is_active: boolean;

    @Prop()
    description: string;
}

export const OperationSchema = SchemaFactory.createForClass(Operation);