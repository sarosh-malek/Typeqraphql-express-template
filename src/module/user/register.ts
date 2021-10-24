import { User } from "../../entity/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";
import { getRepository } from "typeorm";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return "Hello world";
  }

  @Mutation(() => User)
  async register(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("role") role: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const userRepository = getRepository(User);
    const user = await userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    await userRepository.save(user);
    return user;
  }
}
