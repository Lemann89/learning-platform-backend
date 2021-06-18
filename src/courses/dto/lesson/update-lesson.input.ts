import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateLessonInput {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  content: string;

  @Field((type) => Int, { nullable: true })
  order?: number;
}
