import { Module, forwardRef } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { ListModule } from 'src/list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModel } from './project.model';

@Module({
  imports: [
    forwardRef(() => ListModule),
    TypeOrmModule.forFeature([ProjectModel]),
  ],
  providers: [ProjectService, ProjectResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
