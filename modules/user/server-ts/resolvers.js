/*eslint-disable no-unused-vars*/
import { pick, isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';
import { UserInputError } from 'apollo-server-errors';

// eslint-disable-next-line import/no-named-default
import { USER_ROUTES } from '@gqlapp/user-client-react';
import { createTransaction } from '@gqlapp/database-server-ts';
import { log } from '@gqlapp/core-common';
import settings from '@gqlapp/config';

import OTPAPI from './helpers/OTPAPI';

const USERS_SUBSCRIPTION = 'users_subscription';
const {
  auth: { secret, certificate, password },
  app
} = settings;

const createPasswordHash = password => {
  return bcrypt.hash(password, 12) || false;
};

export default pubsub => ({
  Query: {
    users: withAuth(['user:view:all'], (obj, { orderBy, filter }, { User }) => {
      return User.getUsers(orderBy, filter);
    }),
    user(obj, { id }, { User, req: { identity, t } }) {
      if (id) {
        try {
          return { user: User.getUser(id) };
        } catch (e) {
          return { errors: e };
        }
      }
    },
    async currentUser(obj, args, { User, req: { identity } }) {
      if (identity) {
        const user = await User.getUser(identity.id);
        // console.log('user', user);
        return user;
      } else {
        return null;
      }
    },
    async userList(obj, { orderBy, filter, limit, after }, { User }) {
      const UserItemOutput = await User.getUserItems(limit, after, orderBy, filter);
      const { userItems, total } = UserItemOutput;
      const hasNextPage = total > after + limit;
      // console.log('User items', UserItemOutput);
      const edgesArray = [];
      userItems.map((UserItem, index) => {
        edgesArray.push({
          cursor: after + index,
          node: UserItem
        });
      });
      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
      return {
        totalCount: total,
        edges: edgesArray,
        pageInfo: {
          endCursor,
          hasNextPage
        }
      };
    }
  },
  // User: {
  //   profile(obj) {
  //     return obj;
  //   },
  //   auth(obj) {
  //     return obj;
  //   }
  // },
  // UserProfile: {
  //   firstName(obj) {
  //     return obj.firstName;
  //   },
  //   lastName(obj) {
  //     return obj.lastName;
  //   },
  //   fullName(obj) {
  //     if (obj.firstName && obj.lastName) {
  //       return `${obj.firstName} ${obj.lastName}`;
  //     } else {
  //       return null;
  //     }
  //   },
  //   avatar(obj) {
  //     return obj.avatar;
  //   }
  // },
  Mutation: {
    addUser: withAuth(
      (obj, { input }, { req: { identity } }) => {
        return identity.id !== input.id ? ['user:create'] : ['user:create:self'];
      },
      async (obj, { input }, { User, req: { universalCookies, t }, mailer, req }) => {
        const errors = {};

        const userExists = await User.getUserByUsername(input.username);
        if (userExists) {
          errors.username = t('user:usernameIsExisted');
        }

        const emailExists = await User.getUserByEmail(input.email);
        if (emailExists) {
          errors.email = t('user:emailIsExisted');
        }

        if (input.password.length < password.minLength) {
          errors.password = t('user:passwordLength', {
            length: password.minLength
          });
        }

        if (!isEmpty(errors)) throw new UserInputError('Failed to get events due to validation errors', { errors });

        const passwordHash = await createPasswordHash(input.password);

        const trx = await createTransaction();
        let createdUserId;
        try {
          const isActive = password.requireEmailConfirmation
            ? input.isActive || false
            : !password.requireEmailConfirmation;

          [createdUserId] = await User.register({ ...input, isActive }, passwordHash).transacting(trx);
          await User.editUserProfile({
            id: createdUserId,
            ...input
          }).transacting(trx);
          if (certificate.enabled)
            await User.editAuthCertificate({
              id: createdUserId,
              ...input
            }).transacting(trx);
          trx.commit();
        } catch (e) {
          trx.rollback();
        }

        try {
          const user = await User.getUser(createdUserId);

          if (mailer && password.requireEmailConfirmation && !emailExists) {
            // async email
            jwt.sign({ identity: pick(user, 'id') }, secret, { expiresIn: '1d' }, (err, emailToken) => {
              const encodedToken = Buffer.from(emailToken).toString('base64');
              const url = `${__WEBSITE_URL__}/confirmation/${encodedToken}`;
              mailer.sendMail({
                from: `${app.name} <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: 'Your account has been created',
                html: `<p>Hi, ${user.username}!</p>
                <p>Welcome to ${app.name}. Please click the following link to confirm your email:</p>
                <p><a href="${url}">${url}</a></p>
                <p>Below are your login information</p>
                <p>Your email is: ${user.email}</p>`
              });
              log.info(`Sent registration confirmation email to: ${user.email}`);
            });
          }

          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: 'CREATED',
              node: user
            }
          });
          return { user };
        } catch (e) {
          return e;
        }
      }
    ),
    editUser: withAuth(
      (obj, args, { req: { identity } }) => {
        return identity.id !== args.input.id ? ['user:update'] : ['user:update:self'];
      },
      async (obj, { input }, { User, req: { identity, t }, mailer }) => {
        const isAdmin = () => identity.role === 'admin';
        const isSelf = () => identity.id === input.id;

        const errors = {};

        const userExists = await User.getUserByUsername(input.username);
        if (userExists && userExists.id !== input.id) {
          errors.username = t('user:usernameIsExisted');
        }

        const emailExists = await User.getUserByEmail(input.email);
        if (emailExists && emailExists.id !== input.id) {
          errors.email = t('user:emailIsExisted');
        }

        if (input.password && input.password.length < password.minLength) {
          errors.password = t('user:passwordLength', {
            length: password.minLength
          });
        }

        if (!isEmpty(errors)) throw new UserInputError('Failed to get events due to validation errors', { errors });

        const userInfo = !isSelf() && isAdmin() ? input : pick(input, ['id', 'username', 'email', 'password']);

        const isProfileExists = await User.isUserProfileExists(input.id);
        const passwordHash = input.password && (await createPasswordHash(input.password));

        const trx = await createTransaction();
        try {
          await User.editUser(userInfo, passwordHash);
          // .transacting(trx);
          await User.editUserProfile(input, isProfileExists);
          // .transacting(trx);

          if (mailer && input.password && password.sendPasswordChangesEmail) {
            const url = `${__WEBSITE_URL__}${USER_ROUTES.profile}`;

            mailer.sendMail({
              from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
              to: input.email,
              subject: 'Your Password Has Been Updated',
              html: `<p>Your account password has been updated.</p>
                     <p>To view or edit your account settings, please visit the “Profile” page at</p>
                     <p><a href="${url}">${url}</a></p>`
            });
            log.info(`Sent password has been updated to: ${input.email}`);
          }
          trx.commit();
        } catch (e) {
          trx.rollback();
        }

        if (certificate.enabled) {
          await User.editAuthCertificate(input);
        }

        try {
          const user = await User.getUser(input.id);
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: 'UPDATED',
              node: user
            }
          });

          return { user };
        } catch (e) {
          throw e;
        }
      }
    ),
    deleteUser: withAuth(
      (obj, args, { req: { identity } }) => {
        return identity.id !== args.id ? ['user:delete'] : ['user:delete:self'];
      },
      async (obj, { id }, { User, req: { identity, t } }) => {
        const isAdmin = () => identity.role === 'admin';
        const isSelf = () => identity.id === id;

        const user = await User.getUser(id);
        if (!user) {
          throw new Error(t('user:userIsNotExisted'));
        }

        if (isSelf()) {
          throw new Error(t('user:userCannotDeleteYourself'));
        }

        const isDeleted = !isSelf() && isAdmin() ? await User.deleteUser(id) : false;

        if (isDeleted) {
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: 'DELETED',
              node: user
            }
          });
          return { user };
        } else {
          throw new Error(t('user:userCouldNotDeleted'));
        }
      }
    ),
    addUserMobile: withAuth(
      (obj, args, { req: { identity } }) => {
        if (typeof args.id !== 'undefined') {
          return identity.id !== args.input.id ? ['user:update'] : ['user:update:self'];
        } else {
          return ['user:update:self'];
        }
      },
      async (obj, { input }, { User, req: { identity, t } }) => {
        // To Do Check for user type and have validations for adding appropriately
        // const isAdmin = () => identity.role === 'admin';
        // const isSelf = () => identity.id === input.id;
        const user = await User.getUser(input.id || identity.id);

        // if user doesnt have the mobile call otp & save to database
        const mobile = {
          mobile: input.mobile
        };

        if (typeof input.otp === 'undefined') {
          // call otp api

          const otp = await OTPAPI(input.mobile);
          // const otp = 1212;
          console.log(otp);
          mobile.otpSent = otp && true;

          var mobile_db;
          console.log(user);
          console.log(user.mobile);

          if (user.mobile) {
            await User.updateUserMobile(user.mobile.id, { otp });
          } else {
            if (typeof input.id !== 'undefined') {
              mobile_db = await User.addUserMobile(input.id, {
                mobile: input.mobile,
                otp: otp
              });
            } else {
              mobile_db = await User.addUserMobile(identity.id, {
                mobile: input.mobile,
                otp: otp
              });
            }
          }
        } else {
          // check if otp is correct
          const user = await User.getUser(input.id || identity.id);
          const otp = user.mobile.otp;
          mobile.otpSent = otp && true;
          mobile.isVerified = input.otp === otp;
          if (mobile.isVerified) {
            await User.updateUserMobile(user.mobile.id, { is_verified: true });
            await User.updateUserVerification(user.id, {
              is_mobile_verified: true
            });

            // set as primary mobile
            const patched = await User.patchProfile(user.id, {
              mobile: mobile.mobile
            });
            console.log(patched);
          } else {
            mobile.error = 'Wrong OTP';
          }
        }
        // else check for otp and return value
        // save mobile to database

        try {
          const user_updated = await User.getUser(input.id || identity.id);
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: 'UPDATED',
              node: user_updated
            }
          });
          // console.log(user);
          return mobile;
        } catch (e) {
          throw e;
        }
      }
    )
  },
  Subscription: {
    usersUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USERS_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.usersUpdated;
          const {
            filter: { isActive, role, searchText }
          } = variables;

          const checkByFilter =
            !!node.isActive === isActive &&
            (!role || role === node.role) &&
            (!searchText ||
              node.username.toUpperCase().includes(searchText.toUpperCase()) ||
              node.email.toUpperCase().includes(searchText.toUpperCase()));

          switch (mutation) {
            case 'DELETED':
              return true;
            case 'CREATED':
              return checkByFilter;
            case 'UPDATED':
              return !checkByFilter;
          }
        }
      )
    }
  }
});
