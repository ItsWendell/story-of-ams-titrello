import {
  Resolver,
  Args,
  Parent,
  Query,
  ResolveField,
  Mutation,
} from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { ProjectService } from 'src/project/project.service';
import { ListModel } from './list.model';
import { ProjectModel } from 'src/project/project.model';
import { CreateListDTO, UpdateListDTO } from './list.dto';
import { CardService } from 'src/card/card.service';
import { CardModel } from 'src/card/card.model';
import { AuthGuard } from 'src/auth.guard';

@Resolver(of => ListModel)
export class ListResolver {
  constructor(
    @Inject(ListService) private listService: ListService,
    @Inject(ProjectService) private projectService: ProjectService,
    @Inject(CardService) private cardService: CardService,
  ) {}

  @Query(returns => ListModel, { nullable: true })
  async list(@Args('id') id: string): Promise<ListModel> {
    return await this.listService.findOne(id);
  }

  @ResolveField(returns => ProjectModel)
  async project(@Parent() list) {
    const { projectId } = list;
    return this.projectService.findOne(projectId);
  }

  @ResolveField(returns => [CardModel])
  async cards(@Parent() list) {
    const { id } = list;
    return this.cardService.findByList(id);
  }

  @Query(returns => [ListModel])
  async lists(): Promise<ListModel[]> {
    return await this.listService.findAll();
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => ListModel)
  async createList(@Args('list') list: CreateListDTO): Promise<ListModel> {
    return await this.listService.create(list);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => CardModel, { nullable: true })
  updateList(
    @Args('id') id: string,
    @Args('list') list: UpdateListDTO,
  ): Promise<ListModel> {
    return this.listService.updateOne(id, list);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => ListModel, { nullable: true })
  async deleteList(@Args('id') id: string): Promise<ListModel> {
    const data = await this.listService.findOne(id);
    await this.listService.deleteOne(id);
    return data;
  }
}
