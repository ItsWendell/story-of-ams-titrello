import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { ListModel } from 'src/list/list.model';

@ObjectType()
@Entity()
export class CardModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({
    type: 'int',
    default: 0,
  })
  order: number;

  @Field(type => ListModel, { nullable: true })
  @ManyToOne(
    type => ListModel,
    list => list.cards,
  )
  list: ListModel;

  @Field({ nullable: true })
  @Column({ nullable: true })
  listId: string;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
