import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCardDTO {
  @Field()
  listId: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({
    nullable: true,
  })
  order?: number;
}

@InputType()
export class UpdateCardDTO {
  @Field({ nullable: true })
  listId?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({
    nullable: true,
  })
  order?: number;
}
