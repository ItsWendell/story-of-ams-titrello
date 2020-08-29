import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardModel } from './card.model';
import { Repository, UpdateResult } from 'typeorm';
import { ProjectService } from 'src/project/project.service';
import { CreateCardDTO, UpdateCardDTO } from './card.dto';
import { ListService } from 'src/list/list.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardModel)
    private cardRepository: Repository<CardModel>,
    private projectService: ProjectService,
    private listService: ListService,
  ) {}

  async create(card: CreateCardDTO): Promise<CardModel> {
    console.log('CREATING CARD', card);
    return this.cardRepository.save({
      ...card,
      list: card.listId,
      listId: card.listId,
    } as any);
  }

  findAll(): Promise<CardModel[]> {
    return this.cardRepository.find();
  }

  findByList(id: string): Promise<CardModel[]> {
    return this.cardRepository
      .createQueryBuilder('card')
      .where('card.list = :id', { id })
      .orderBy('order', 'ASC')
      .getMany();
  }

  findOne(id: string): Promise<CardModel> {
    return this.cardRepository.findOne(id);
  }

  async updateOne(id: string, card: UpdateCardDTO): Promise<CardModel> {
    await this.cardRepository.save({
      id: id,
      ...card,
    });

    return await this.findOne(id);
  }
}
