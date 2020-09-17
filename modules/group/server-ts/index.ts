import ServerModule from "@gqlapp/module-server-ts";

import schema from "./schema.graphql";
import createResolvers from "./resolvers";
import Group, { GroupMember, GroupQuiz } from "./sql";

export default new ServerModule({
  schema: [schema],
  createResolversFunc: [createResolvers],
  createContextFunc: [
    () => ({
      Group: new Group(),
      GroupMember: new GroupMember(),
      GroupQuiz: new GroupQuiz(),
    }),
  ],
});
