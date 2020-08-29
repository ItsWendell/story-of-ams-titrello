import {
  Resolver,
  Args,
  Parent,
  Query,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';
import { ProjectModel } from 'src/project/project.model';
import { CardModel } from './card.model';
import { CreateCardDTO, UpdateCardDTO } from './card.dto';
import { CardService } from './card.service';
import { ListService } from 'src/list/list.service';
import { AuthGuard } from 'src/auth.guard';

@Resolver(of => CardModel)
export class CardResolver {
  constructor(
    @Inject(CardService) private cardService: CardService,
    @Inject(ProjectService) private projectService: ProjectService,
    @Inject(ListService) private listService: ListService,
  ) {}

  @Query(returns => CardModel)
  async card(@Args('id') id: string): Promise<CardModel> {
    return await this.cardService.findOne(id);
  }

  @ResolveField(returns => ProjectModel)
  async list(@Parent() card) {
    console.log('GETTING LIST based on PARENT card', card);
    const { listId } = card;
    return this.listService.findOne(listId);
  }

  @Query(returns => [CardModel])
  async cards(): Promise<CardModel[]> {
    return await this.cardService.findAll();
  }

  @Mutation(returns => CardModel)
  createCard(@Args('card') card: CreateCardDTO): Promise<CardModel> {
    return this.cardService.create(card);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => CardModel)
  updateCard(
    @Args('id') id: string,
    @Args('card') card: UpdateCardDTO,
  ): Promise<CardModel> {
    return this.cardService.updateOne(id, card);
  }
}
