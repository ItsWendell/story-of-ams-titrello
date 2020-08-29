import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectModel } from './project.model';
import { Repository, DeleteResult } from 'typeorm';
import { CreateProjectDTO } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectModel)
    private projectRepository: Repository<ProjectModel>,
  ) {}

  create(project: CreateProjectDTO): Promise<ProjectModel> {
    return this.projectRepository.save({
      ...project,
    });
  }

  findAll(): Promise<ProjectModel[]> {
    return this.projectRepository.find();
  }

  findOne(id: string): Promise<ProjectModel> {
    return this.projectRepository.findOne(id);
  }

  deleteOne(id: string): Promise<DeleteResult> {
    return this.projectRepository.delete({
      id: id,
    });
  }
}
