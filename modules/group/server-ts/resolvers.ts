import { PubSub, withFilter } from "graphql-subscriptions";
import withAuth from "graphql-auth";
import {
  GroupInput,
  GroupMemberInput,
  Identifier,
  EmailIdentifier,
  FilterInput,
} from "./sql";
import settings from "@gqlapp/config";
import { log } from "@gqlapp/core-common";
import { MemberType, MemberStatus } from "@gqlapp/group-common";
const GROUPS_SUBSCRIPTION = "groups_subscription";
const GROUP_SUBSCRIPTION = "group_subscription";
// // const GMEMBER_SUBSCRIPTION = "groupMembers_subscription";

interface AddGroup {
  input: GroupInput;
}

interface EditGroup {
  input: GroupInput & Identifier;
}

interface EditGroupMember {
  input: GroupMemberInput & Identifier;
}

interface AddGroupMember {
  input: GroupMemberInput;
}

interface GroupFilter {
  filter: FilterInput;
  limit: number;
  after: number;
  groupId: number;
}

export default (pubsub: PubSub) => ({
  Query: {
    async allGroupMembers(obj: any, args: any, context: any) {
      return context.GroupMember.allGroupMembers();
    },
    async groupMembers(obj: any, { id }: Identifier, { GroupMember }: any) {
      return GroupMember.groupMembers(id);
    },
    async groupMember(obj: any, { id }: Identifier, context: any) {
      return context.GroupMember.groupMember(id);
    },

    async groups(
      obj: any,
      { filter, limit, after, groupId }: GroupFilter,
      context: any
    ) {
      console.log("GorupsResol", groupId);
      // return context.Group.groups();
      const GroupOutput = await context.Group.groups(
        filter,
        limit,
        after,
        groupId
      );
      const { groups, total } = GroupOutput;

      const hasNextPage = total > after + limit;

      const edgesArray: any = [];
      groups.map((item: any, i: number) => {
        edgesArray.push({
          cursor: after + i,
          node: item,
        });
      });

      const endCursor =
        edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage,
        },
      };
    },

    async userGroups(
      obj: any,
      { userId }: EmailIdentifier,
      { Group, User, req: { identity } }: any
    ) {
      var email;
      if (userId) {
        const user = await User.getUser(userId);
        email = user.email;
      }
      return Group.userGroups(email || identity.email);
    },
    async group(obj: any, { id }: Identifier, context: any) {
      return context.Group.group(id);
    },
  },
  Mutation: {
    addGroup: withAuth(
      async (obj: any, { input }: AddGroup, { Group, mailer, User }: any) => {
        try {
          const id = await Group.addGroup(input);
          const data = await Group.group(id);

          const url1 = `${__WEBSITE_URL__}/register`;
          const url2 = `${__WEBSITE_URL__}/group/${id}`;

          let user;
          (await input.members) &&
            input.members.map(async (item) => {
              user = await User.getUserByEmail(item.email);
              if (mailer) {
                const sent = await mailer.sendMail({
                  from: `${settings.app.name} <${process.env.EMAIL_SENDER ||
                    process.env.EMAIL_USER}>`,
                  to: item.email,
                  subject: `${settings.app.name} Registration`,
                  html: user
                    ? `<p>You have been added to <strong>${input.title}</strong> in ${settings.app.name}<p>
                <p>Group Link - <a href="${url2}">${url2}</a></p>`
                    : `<p>You have been added to <strong>${input.title}</strong> in ${settings.app.name}<p>
                <p>Register - <a href="${url1}">${url1}</a></p>`,
                });
                log.info(`Sent mail to: ${item.email}`);
                if (!sent) {
                  throw new Error("Email couldn't be sent");
                } else {
                  return true;
                }
              }
            });

          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "CREATED",
              parentGroupId: data.groupId,
              node: data,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),
    updateGroup: withAuth(
      async (obj: any, { input }: EditGroup, { Group, mailer, User }: any) => {
        try {
          await Group.updateGroup(input);
          const data = await Group.group(input.id);

          const url1 = `${__WEBSITE_URL__}/register`;
          const url2 = `${__WEBSITE_URL__}/group/${input.id}`;

          let user;
          // await input.members.map(async (item) => {
          //   if (!item.id && mailer) {
          //     user = await User.getUserByEmail(item.email);
          //     const sent = await mailer.sendMail({
          //       from: `${settings.app.name} <${process.env.EMAIL_SENDER ||
          //         process.env.EMAIL_USER}>`,
          //       to: item.email,
          //       subject: `${settings.app.name} Registration`,
          //       html: user
          //         ? `<p>You have been added to <strong>${input.title}</strong> in ${settings.app.name}.<p>
          //       <p>Group Link - <a href="${url2}">${url2}</a></p>`
          //         : `<p>You have been added to <strong>${input.title}</strong> in ${settings.app.name}.<p>
          //       <p>Register - <a href="${url1}">${url1}</a></p>`,
          //     });
          //     log.info(`Sent mail to: ${item.email}`);
          //     if (!sent) {
          //       throw new Error("Email couldn't be sent");
          //     } else {
          //       return true;
          //     }
          //   }
          // });

          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "UPDATED",
              parentGroupId: data.groupId,
              node: data,
            },
          });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "UPDATED",
              id: data.id,
              node: data,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),
    adminEditGroup: withAuth(
      async (obj: any, { input }: EditGroup, { Group, mailer, User }: any) => {
        try {
          await Group.upsertGroup(input);
          const data = await Group.group(input.id);

          const url1 = `${__WEBSITE_URL__}/register`;
          const url2 = `${__WEBSITE_URL__}/group/${input.id}`;

          let user;
          await input.members.map(async (item) => {
            if (!item.id && mailer) {
              user = await User.getUserByEmail(item.email);
              const sent = await mailer.sendMail({
                from: `${settings.app.name} <${process.env.EMAIL_SENDER ||
                  process.env.EMAIL_USER}>`,
                to: item.email,
                subject: `${settings.app.name} Registration`,
                html: user
                  ? `<p>You have been added to <strong>${input.title}</strong> in ${settings.app.name}.<p>
                <p>Group Link - <a href="${url2}">${url2}</a></p>`
                  : `<p>You have been added to <strong>${input.title}</strong> in ${settings.app.name}.<p>
                <p>Register - <a href="${url1}">${url1}</a></p>`,
              });
              log.info(`Sent mail to: ${item.email}`);
              if (!sent) {
                throw new Error("Email couldn't be sent");
              } else {
                return true;
              }
            }
          });

          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "UPDATED",
              parentGroupId: data.groupId,
              node: data,
            },
          });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "UPDATED",
              id: data.id,
              node: data,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),
    upsertGroup: withAuth(
      async (
        obj: any,
        { input }: EditGroup,
        { Group, mailer, User, GroupMember }: any
      ) => {
        try {
          await Group.upsertGroup(input);
          const data = await Group.group(input.id);

          const url1 = `${__WEBSITE_URL__}/register`;
          const url2 = `${__WEBSITE_URL__}/group/${input.id}`;

          let user;
          const addMemberToParentGroup = async (groupId, parentGroupId) => {
            const currentGroup = await Group.group(groupId);
            const parentGroup = await Group.group(parentGroupId);
            const comparer = (otherArray) => {
              return function(current) {
                return (
                  otherArray.filter(function(other) {
                    return other.email == current.email;
                  }).length == 0
                );
              };
            };
            var onlyInCurrentGroup = currentGroup.members.filter(
              comparer(parentGroup.members)
            );
            onlyInCurrentGroup.map(async (ii) => {
              var addMemberInput = ii;
              delete addMemberInput.id;
              delete addMemberInput.createdAt;
              delete addMemberInput.updatedAt;
              delete addMemberInput.member;
              addMemberInput.groupId = parentGroupId;
              addMemberInput.type = MemberType.MEMBER;
              addMemberInput.status = MemberStatus.ADDED;
              await GroupMember.addGroupMember(addMemberInput);
            });
            if (parentGroup.groupId) {
              addMemberToParentGroup(parentGroup.id, parentGroup.groupId);
            }
          };
          if (data.groupId) {
            addMemberToParentGroup(data.id, data.groupId);
          }
          // await input.members.map(async (item) => {
          //   if (!item.id && mailer) {
          //     user = await User.getUserByEmail(item.email);
          //     const sent = await mailer.sendMail({
          //       from: `${settings.app.name} <${process.env.EMAIL_SENDER ||
          //         process.env.EMAIL_USER}>`,
          //       to: item.email,
          //       subject: `${settings.app.name} Registration`,
          //       html: user
          //         ? `<p>You have been added to <strong>${data.title}</strong> in ${settings.app.name}.<p>
          //       <p>Group Link - <a href="${url2}">${url2}</a></p>`
          //         : `<p>You have been added to <strong>${data.title}</strong> in ${settings.app.name}.<p>
          //       <p>Register - <a href="${url1}">${url1}</a></p>`,
          //     });
          //     log.info(`Sent mail to: ${item.email}`);
          //     if (!sent) {
          //       throw new Error("Email couldn't be sent");
          //     } else {
          //       return true;
          //     }
          //   }
          // });

          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "UPDATED",
              parentGroupId: data.groupId,
              node: data,
            },
          });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "UPDATED",
              id: data.id,
              node: data,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),

    addGroupMemberInvite: withAuth(
      async (
        obj: any,
        { input }: any,
        { Group, GroupMember, mailer, User }: any
      ) => {
        try {
          var modifiedInput = input;
          modifiedInput.email = input.userEmail;
          delete modifiedInput.userEmail;
          const groupMemberId = await GroupMember.addGroupMember(modifiedInput);
          const data = await Group.group(input.groupId);
          const dataGroupMember = await GroupMember.groupMember(groupMemberId);

          const url1 = `${__WEBSITE_URL__}/register`;
          const url2 = `${__WEBSITE_URL__}/group/${input.groupId}`;

          const currentGroup =
            data && data.members.find((meM) => meM.id === groupMemberId);

          let user;

          user = await User.getUserByEmail(currentGroup.email);
          const sent = await mailer.sendMail({
            from: `${settings.app.name} <${process.env.EMAIL_SENDER ||
              process.env.EMAIL_USER}>`,
            to: currentGroup.email,
            subject: `${settings.app.name} Registration`,
            html: user
              ? `<p>You have been added to <strong>${data.title}</strong> in ${settings.app.name}.<p>
                <p>Group Link - <a href="${url2}">${url2}</a></p>`
              : `<p>You have been added to <strong>${data.title}</strong> in ${settings.app.name}.<p>
                <p>Register - <a href="${url1}">${url1}</a></p>`,
          });
          log.info(`Sent mail to: ${currentGroup.email}`);

          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "UPDATED",
              parentGroupId: data.groupId,
              node: data,
            },
          });
          // pubsub.publish(GMEMBER_SUBSCRIPTION, {
          //   groupMembersUpdated: {
          //     mutation: "CREATED",
          //     groupId: dataGroupMember.groupId,
          //     node: dataGroupMember,
          //   },
          // });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "UPDATED",
              id: data.id,
              node: data,
            },
          });
          return true;
        } catch (e) {
          return e;
        }
      }
    ),

    deleteGroup: withAuth(
      async (obj: any, { id }: Identifier, { Group }: any) => {
        try {
          const data = await Group.group(id);
          await Group.deleteGroup(id);
          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "DELETED",
              parentGroupId: data.groupId,
              node: data,
            },
          });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "DELETED",
              id: data.id,
              node: data,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),
    addGroupMember: withAuth(
      async (
        obj: any,
        { input }: AddGroupMember,
        { Group, GroupMember }: any
      ) => {
        try {
          const id = await GroupMember.addGroupMember(input);
          const data = await GroupMember.groupMember(id);
          // pubsub.publish(GMEMBER_SUBSCRIPTION, {
          //   groupMembersUpdated: {
          //     mutation: "CREATED",
          //     groupId: data.groupId,
          //     node: data,
          //   },
          // });
          const item = await Group.group(data.groupId);
          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "UPDATED",
              parentGroupId: item.groupId,
              node: item,
            },
          });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "UPDATED",
              id: item.id,
              node: item,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),
    editGroupMember: withAuth(
      async (
        obj: any,
        { input }: EditGroupMember,
        { GroupMember, Group }: any
      ) => {
        try {
          const inputId = await GroupMember.editGroupMember(input);
          const data = await GroupMember.groupMember(inputId);
          // pubsub.publish(GMEMBER_SUBSCRIPTION, {
          //   groupMembersUpdated: {
          //     mutation: "UPDATED",
          //     groupId: data.groupId,
          //     node: data,
          //   },
          // });
          const item = await Group.group(data.groupId);
          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "UPDATED",
              parentGroupId: item.groupId,
              node: item,
            },
          });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "UPDATED",
              id: item.id,
              node: item,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),
    changeGroupMemberType: withAuth(
      async (obj: any, { input }: any, { GroupMember, Group }: any) => {
        try {
          console.log("changeGroupMemberType", input);
          const updated = await GroupMember.changeGroupMemberType(input);

          const data = await GroupMember.groupMember(input.id);
          // pubsub.publish(GMEMBER_SUBSCRIPTION, {
          //   groupMembersUpdated: {
          //     mutation: "UPDATED",
          //     groupId: data.groupId,
          //     node: data,
          //   },
          // });
          const item = await Group.group(data.groupId);
          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "UPDATED",
              parentGroupId: item.groupId,
              node: item,
            },
          });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "UPDATED",
              id: item.id,
              node: item,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),
    deleteGroupMember: withAuth(
      async (obj: any, { id }: Identifier, { GroupMember, Group }: any) => {
        try {
          const data = await GroupMember.groupMember(id);
          await GroupMember.deleteGroupMember(id);
          // pubsub.publish(GMEMBER_SUBSCRIPTION, {
          //   groupMembersUpdated: {
          //     mutation: "DELETED",
          //     groupId: data.groupId,
          //     node: data,
          //   },
          // });
          const item = await Group.group(data.groupId);
          pubsub.publish(GROUPS_SUBSCRIPTION, {
            groupsUpdated: {
              mutation: "UPDATED",
              parentGroupId: item.groupId,
              node: item,
            },
          });
          pubsub.publish(GROUP_SUBSCRIPTION, {
            groupItemUpdated: {
              mutation: "UPDATED",
              id: item.id,
              node: item,
            },
          });
          return data;
        } catch (e) {
          return e;
        }
      }
    ),
  },
  Subscription: {
    groupsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(GROUPS_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.groupsUpdated;
          const {
            endCursor,
            parentGroupId,
            filter: { searchText },
          } = variables;
          console.log("variablesSubs", variables);
          console.log("payloadSUbs", payload);
          console.log(payload, endCursor);
          const checkByFilter =
            !searchText ||
            node.title.toUpperCase().includes(searchText.toUpperCase()) ||
            node.description.toUpperCase().includes(searchText.toUpperCase()) ||
            node.groupType.toUpperCase().includes(searchText.toUpperCase()) ||
            node.members.some(
              (item: any) =>
                item.member &&
                (item.member.email
                  .toUpperCase()
                  .includes(searchText.toUpperCase()) ||
                  item.member.username
                    .toUpperCase()
                    .includes(searchText.toUpperCase()))
            );

          switch (mutation) {
            case "UPDATED":
              return (
                !checkByFilter &&
                (parentGroupId
                  ? parentGroupId === payload.groupsUpdated.parentGroupId
                  : true) &&
                endCursor <= node.id
              );
            case "CREATED":
              return (
                checkByFilter &&
                (parentGroupId
                  ? parentGroupId === payload.groupsUpdated.parentGroupId
                  : true) &&
                endCursor <= node.id
              );
            default:
              return (
                (parentGroupId
                  ? parentGroupId === payload.groupsUpdated.parentGroupId
                  : true) && endCursor <= node.id
              );
          }
        }
      ),
    },
    // groupMembersUpdated: {
    //   subscribe: withFilter(
    // //     () => pubsub.asyncIterator(GMEMBER_SUBSCRIPTION),
    // //     (payload, variables) => {
    // //       return payload.groupMembersUpdated.groupId === variables.groupId;
    // //     }
    // //   ),
    // // },
    groupItemUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(GROUP_SUBSCRIPTION),
        (payload, variables) => {
          console.log("groupItemSubsRes", payload, variables);
          return (
            payload.groupItemUpdated &&
            payload.groupItemUpdated.node &&
            payload.groupItemUpdated.node.id === variables.id
          );
        }
      ),
    },
  },
});
