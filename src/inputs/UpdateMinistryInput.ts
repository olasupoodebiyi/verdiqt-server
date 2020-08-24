import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateMinistryInput {
  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  nickname?: string;
}
