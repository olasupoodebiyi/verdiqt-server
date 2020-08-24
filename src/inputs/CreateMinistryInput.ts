import { Field, InputType } from "type-graphql";

@InputType()
export class CreateMinistryInput {
  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  nickname: string;
}
