import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) { }

  @Post('create')
  create(@Body() createCreateCurrencyDto: CreateStatusDto) {
    return this.statusService.create(createCreateCurrencyDto);
  }

  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOneByUsername(@Param('id') id: string) {
    return this.statusService.findOneByUsername(id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.statusService.findOneById(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCreateCurrencyDto: UpdateStatusDto) {
    return this.statusService.update(id, updateCreateCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(id);
  }
}
