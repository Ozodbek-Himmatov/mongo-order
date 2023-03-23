import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OperationController } from './operation.controller';
import { OperationService } from './operation.service';
import { Operation, OperationSchema } from './schemas/operation.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Operation.name, schema: OperationSchema }])],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule { }
