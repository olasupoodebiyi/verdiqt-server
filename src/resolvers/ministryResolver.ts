import { UpdateMinistryInput } from "../inputs/UpdateMinistryInput";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Ministry } from "../entity/Ministry";
import { CreateMinistryInput } from "../inputs/CreateMinistryInput";

@Resolver()
export class MinistryResolver {
  @Query(() => [Ministry])
  getAllMinistries() {
    return Ministry.find();
  }

  @Query(() => Ministry)
  findMinistryByID(@Arg("id") id: string) {
    return Ministry.findOne({ where: { id } });
  }

  @Mutation(() => Ministry)
  async createMinistry(@Arg("data") data: CreateMinistryInput) {
    const ministry = Ministry.create(data);
    await ministry.save();
    return ministry;
  }

  @Mutation(() => Ministry)
  async updateMinistry(
    @Arg("id") id: string,
    @Arg("data") data: UpdateMinistryInput
  ) {
    const ministry = await Ministry.findOne({ where: { id } });
    if (!ministry) throw new Error("Ministry not found!");
    Object.assign(ministry, data);
    await ministry.save();
    return ministry;
  }

  @Mutation(() => Boolean)
  async deleteMinistry(@Arg("id") id: string) {
    const ministry = await Ministry.findOne({ where: { id } });
    if (!ministry) throw new Error("Ministry not found!");
    await ministry.remove();
    return true;
  }
}
