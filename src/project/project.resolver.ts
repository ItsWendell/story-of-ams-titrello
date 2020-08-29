import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { ProjectModel } from './project.model';
import { ProjectService } from './project.service';
import { Inject, UseGuards } from '@nestjs/common';
import { ListModel } from 'src/list/list.model';
import { ListService } from 'src/list/list.service';
import { AuthGuard } from 'src/auth.guard';

@Resolver(of => ProjectModel)
export class ProjectResolver {
  constructor(
    @Inject(ProjectService) private projectService: ProjectService,
    @Inject(ListService) private listService: ListService,
  ) {}

  @Query(returns => ProjectModel, { nullable: true })
  async project(@Args('id') id: string): Promise<ProjectModel> {
    return await this.projectService.findOne(id);
  }

  @ResolveField(returns => [ListModel])
  async lists(@Parent() project) {
    const { id } = project;
    console.log(project, this.listService.findByProject); // TODO: Remove
    return this.listService.findByProject(id);
  }

  @Query(returns => [ProjectModel])
  async projects(): Promise<ProjectModel[]> {
    return await this.projectService.findAll();
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => ProjectModel)
  async createProject(@Args('name') name: string): Promise<ProjectModel> {
    return await this.projectService.create({ name });
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => ProjectModel, { nullable: true })
  async deleteList(@Args('id') id: string): Promise<ProjectModel> {
    const data = await this.projectService.findOne(id);
    await this.projectService.deleteOne(id);
    return data;
  }
}
