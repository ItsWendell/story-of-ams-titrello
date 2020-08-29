import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateListDTO {
  @Field()
  projectId: string;

  @Field()
  title: string;

  @Field({
    nullable: true,
  })
  order?: number;
}

@InputType()
export class UpdateListDTO {
  @Field({ nullable: true })
  projectId?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({
    nullable: true,
  })
  order?: number;
}
