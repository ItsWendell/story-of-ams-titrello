import { Injectable } from '@nestjs/common';
import { CreateListDTO, UpdateListDTO } from './list.dto';
import { ListModel } from './list.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(ListModel)
    private listRepository: Repository<ListModel>,
    private projectService: ProjectService,
  ) {}

  async create(list: CreateListDTO): Promise<ListModel> {
    return this.listRepository.save({
      ...list,
      project: list.projectId,
    } as any);
  }

  findAll(): Promise<ListModel[]> {
    return this.listRepository.find();
  }

  findByProject(id: string): Promise<ListModel[]> {
    return this.listRepository
      .createQueryBuilder('list')
      .where('list.project = :id', { id })
      .orderBy('list.order', 'ASC')
      .getMany();
  }

  async findOne(id: string): Promise<ListModel> {
    const data = await this.listRepository.findOne(id);
    return data;
  }

  async updateOne(id: string, list: UpdateListDTO): Promise<ListModel> {
    await this.listRepository.save({
      id: id,
      ...list,
    });

    return await this.findOne(id);
  }

  deleteOne(id: string): Promise<DeleteResult> {
    return this.listRepository.delete({
      id: id,
    });
  }
}
