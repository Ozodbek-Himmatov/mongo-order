import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency_TypeController } from './currency_type.controller';
import { Currency_TypeService } from './currency_type.service';
import { Currency_Type, Currency_TypeSchema } from './schemas/currency_type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Currency_Type.name, schema: Currency_TypeSchema }])],
  controllers: [Currency_TypeController],
  providers: [Currency_TypeService]
})
export class CurrencyTypeModule { }
