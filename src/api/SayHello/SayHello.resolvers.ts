import { Query, Resolver } from "type-graphql";

@Resolver()
export class SayHelloResolver {
  @Query(() => String)
  sayHello() {
    return "Hello evreyone";
  }
}
