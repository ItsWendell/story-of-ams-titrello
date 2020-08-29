import { Module, forwardRef } from '@nestjs/common';
import { ListService } from './list.service';
import { ListResolver } from './list.resolver';
import { ListModel } from './list.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'src/project/project.module';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [
    forwardRef(() => ProjectModule),
    forwardRef(() => CardModule),
    TypeOrmModule.forFeature([ListModel]),
  ],
  providers: [ListService, ListResolver],
  exports: [ListService],
})
export class ListModule {}
