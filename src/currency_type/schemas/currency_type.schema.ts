import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type Currency_TypeDocument = HydratedDocument<Currency_Type>;

@Schema()
export class Currency_Type {
    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const Currency_TypeSchema = SchemaFactory.createForClass(Currency_Type);