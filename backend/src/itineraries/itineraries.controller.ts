import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItinerariesService, ItemInput } from './itineraries.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('itineraries')
export class ItinerariesController {
  constructor(private readonly itineraries: ItinerariesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @CurrentUser() user: { userId: string },
    @Body() body: { title?: string; color?: string },
  ) {
    return this.itineraries.create(user.userId, {
      title: body.title ?? 'Mi cronograma',
      color: body.color ?? '#00b4d8',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  mine(@CurrentUser() user: { userId: string }) {
    return this.itineraries.findAllForUser(user.userId);
  }

  @Get('shared/:shareId')
  shared(@Param('shareId') shareId: string) {
    return this.itineraries.findByShareId(shareId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  one(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.itineraries.findOne(id, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string },
    @Body() body: { title?: string; color?: string },
  ) {
    return this.itineraries.update(id, user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.itineraries.remove(id, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/days/:dayId')
  replaceDay(
    @Param('id') id: string,
    @Param('dayId') dayId: string,
    @CurrentUser() user: { userId: string },
    @Body() body: { items: ItemInput[] },
  ) {
    return this.itineraries.replaceDay(
      id,
      user.userId,
      dayId,
      body.items ?? [],
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/share')
  share(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.itineraries.share(id, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/share')
  unshare(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
    return this.itineraries.unshare(id, user.userId);
  }
}
