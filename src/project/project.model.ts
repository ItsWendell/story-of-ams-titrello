import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { ListModel } from 'src/list/list.model';
// import { InvoiceModel } from '../invoice/invoice.model';

@ObjectType()
@Entity()
export class ProjectModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field(type => [ListModel], { nullable: true })
  @OneToMany(
    type => ListModel,
    list => list.project,
  )
  lists: ListModel[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
