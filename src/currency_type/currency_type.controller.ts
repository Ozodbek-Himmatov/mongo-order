import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Currency_TypeService } from './currency_type.service';
import { CreateCurrency_TypeDto } from './dto/create-currency_type.dto';
import { UpdateCurrency_TypeDto } from './dto/update-currency_type.dto';

@Controller('currency_type')
export class Currency_TypeController {
  constructor(private readonly currency_typeService: Currency_TypeService) { }

  @Post('create')
  create(@Body() createCreateCurrencyDto: CreateCurrency_TypeDto) {
    return this.currency_typeService.create(createCreateCurrencyDto);
  }

  @Get()
  findAll() {
    return this.currency_typeService.findAll();
  }

  @Get(':id')
  findOneByUsername(@Param('id') id: string) {
    return this.currency_typeService.findOneByUsername(id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.currency_typeService.findOneById(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCreateCurrencyDto: UpdateCurrency_TypeDto) {
    return this.currency_typeService.update(id, updateCreateCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currency_typeService.remove(id);
  }
}
