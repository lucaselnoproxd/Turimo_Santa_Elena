import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Itinerary } from './itinerary.entity';
import { ItineraryDay } from './itinerary-day.entity';
import { ItineraryItem } from './itinerary-item.entity';

export interface ItemInput {
  startTime?: string | null;
  endTime?: string | null;
  text: string;
  location?: string | null;
}

const relations = { days: { items: true } };

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectRepository(Itinerary)
    private readonly itineraries: Repository<Itinerary>,
    @InjectRepository(ItineraryDay)
    private readonly days: Repository<ItineraryDay>,
    @InjectRepository(ItineraryItem)
    private readonly items: Repository<ItineraryItem>,
    private readonly dataSource: DataSource,
  ) {}

  private sortDays(itinerary: Itinerary): Itinerary {
    if (!itinerary.days) return itinerary;
    itinerary.days.sort((a, b) => a.dayIndex - b.dayIndex);
    for (const day of itinerary.days) {
      if (day.items) day.items.sort((a, b) => a.sort - b.sort);
    }
    return itinerary;
  }

  async create(
    userId: string,
    input: { title: string; color: string },
  ): Promise<Itinerary> {
    const itinerary = this.itineraries.create({
      userId,
      title: input.title || 'Mi cronograma',
      color: input.color || '#00b4d8',
      days: Array.from({ length: 7 }, (_, i) =>
        this.days.create({ dayIndex: i, items: [] }),
      ),
    });
    const saved = await this.itineraries.save(itinerary);
    return this.sortDays(
      await this.itineraries.findOneOrFail({
        where: { id: saved.id },
        relations,
      }),
    );
  }

  async findAllForUser(userId: string): Promise<Itinerary[]> {
    const list = await this.itineraries.find({
      where: { userId },
      relations,
      order: { updatedAt: 'DESC' },
    });
    return list.map((it) => this.sortDays(it));
  }

  private async findOwned(id: string, userId: string): Promise<Itinerary> {
    const itinerary = await this.itineraries.findOne({
      where: { id },
      relations,
    });
    if (!itinerary) {
      throw new NotFoundException('Cronograma no encontrado');
    }
    if (itinerary.userId !== userId) {
      throw new ForbiddenException('No tienes acceso a este cronograma');
    }
    return this.sortDays(itinerary);
  }

  async findOne(id: string, userId: string): Promise<Itinerary> {
    return this.findOwned(id, userId);
  }

  async update(
    id: string,
    userId: string,
    input: { title?: string; color?: string },
  ): Promise<Itinerary> {
    const itinerary = await this.findOwned(id, userId);
    if (input.title !== undefined) itinerary.title = input.title.trim();
    if (input.color !== undefined) itinerary.color = input.color;
    await this.itineraries.save(itinerary);
    return this.sortDays(
      await this.itineraries.findOneOrFail({
        where: { id },
        relations,
      }),
    );
  }

  async remove(id: string, userId: string): Promise<void> {
    const itinerary = await this.findOwned(id, userId);
    await this.itineraries.remove(itinerary);
  }

  async replaceDay(
    itineraryId: string,
    userId: string,
    dayId: string,
    items: ItemInput[],
  ): Promise<Itinerary> {
    return this.dataSource.transaction(async (manager) => {
      const itinerary = await manager.findOne(Itinerary, {
        where: { id: itineraryId },
        relations,
      });
      if (!itinerary) {
        throw new NotFoundException('Cronograma no encontrado');
      }
      if (itinerary.userId !== userId) {
        throw new ForbiddenException('No tienes acceso a este cronograma');
      }
      const day = itinerary.days.find((d) => d.id === dayId);
      if (!day) {
        throw new NotFoundException('Día no encontrado en el cronograma');
      }

      await manager.delete(ItineraryItem, { dayId });

      if (items.length) {
        const next = items.map((item, index) =>
          manager.create(ItineraryItem, {
            id: randomUUID(),
            dayId,
            startTime: item.startTime || null,
            endTime: item.endTime || null,
            text: item.text,
            location: item.location || null,
            sort: index,
          }),
        );
        await manager.save(ItineraryItem, next);
      }

      return manager.findOneOrFail(Itinerary, {
        where: { id: itineraryId },
        relations,
      });
    });
  }

  async share(id: string, userId: string): Promise<{ shareId: string }> {
    const itinerary = await this.findOwned(id, userId);
    if (!itinerary.shareId) {
      itinerary.shareId = randomUUID();
      await this.itineraries.save(itinerary);
    }
    return { shareId: itinerary.shareId };
  }

  async unshare(id: string, userId: string): Promise<Itinerary> {
    const itinerary = await this.findOwned(id, userId);
    if (itinerary.shareId) {
      itinerary.shareId = null;
      await this.itineraries.save(itinerary);
    }
    return this.findOwned(id, userId);
  }

  async findByShareId(shareId: string): Promise<Itinerary> {
    const itinerary = await this.itineraries.findOne({
      where: { shareId },
      relations,
    });
    if (!itinerary) {
      throw new NotFoundException('Enlace de cronograma no encontrado');
    }
    return this.sortDays(itinerary);
  }
}
