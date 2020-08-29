import { Module, forwardRef } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { ListModule } from 'src/list/list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModel } from './card.model';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    forwardRef(() => ListModule),
    forwardRef(() => ProjectModule),
    TypeOrmModule.forFeature([CardModel]),
  ],
  providers: [CardService, CardResolver],
  exports: [CardService],
})
export class CardModule {}
