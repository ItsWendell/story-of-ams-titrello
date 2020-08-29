import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProjectModel } from 'src/project/project.model';
import { CardModel } from 'src/card/card.model';

@ObjectType()
@Entity()
export class ListModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  title: string;

  @Field()
  @Column({
    type: 'int',
    default: 0,
  })
  order: number;

  @Field(type => ProjectModel, { nullable: true })
  @ManyToOne(
    type => ProjectModel,
    project => project.lists,
  )
  project: ProjectModel;

  @Field({ nullable: true })
  @Column({ nullable: true })
  projectId: string;

  @Field(type => [CardModel])
  @OneToMany(
    type => CardModel,
    card => card.list,
  )
  cards: CardModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
