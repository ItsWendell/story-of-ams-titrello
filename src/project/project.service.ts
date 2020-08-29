import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectModel } from './project.model';
import { Repository } from 'typeorm';
import { CreateProjectDTO } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectModel)
    private projectRepository: Repository<ProjectModel>,
  ) {}

  create(details: CreateProjectDTO): Promise<ProjectModel> {
    return this.projectRepository.save(details);
  }

  findAll(): Promise<ProjectModel[]> {
    return this.projectRepository.find();
  }

  findOne(id: string): Promise<ProjectModel> {
    return this.projectRepository.findOne(id);
  }
}
