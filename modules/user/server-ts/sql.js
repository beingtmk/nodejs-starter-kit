// Helpers
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { has } from 'lodash';
import bcrypt from 'bcryptjs';
import { knex, returnId } from '@gqlapp/database-server-ts';

import { Model } from 'objection';

// Give the knex object to objection.
Model.knex(knex);

// Actual query fetching and transformation in DB
const user_eager = `[
  verification,
  mobile,
  auth_linkedin, auth_github, auth_google, auth_facebook, auth_certificate,
  profile
]`;

// Actual query fetching and transformation in DB
export class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      profile: {
        relation: Model.HasOneRelation,
        modelClass: UserProfile,
        join: {
          from: 'user.id',
          to: 'user_profile.user_id'
        }
      },
      auth_certificate: {
        relation: Model.HasOneRelation,
        modelClass: AuthCertificate,
        join: {
          from: 'user.id',
          to: 'auth_certificate.user_id'
        }
      },
      auth_facebook: {
        relation: Model.HasOneRelation,
        modelClass: AuthFacebook,
        join: {
          from: 'user.id',
          to: 'auth_facebook.user_id'
        }
      },
      auth_google: {
        relation: Model.HasOneRelation,
        modelClass: AuthGoogle,
        join: {
          from: 'user.id',
          to: 'auth_google.user_id'
        }
      },
      auth_github: {
        relation: Model.HasOneRelation,
        modelClass: AuthGithub,
        join: {
          from: 'user.id',
          to: 'auth_github.user_id'
        }
      },
      auth_linkedin: {
        relation: Model.HasOneRelation,
        modelClass: AuthLinkedin,
        join: {
          from: 'user.id',
          to: 'auth_linkedin.user_id'
        }
      },
      verification: {
        relation: Model.HasOneRelation,
        modelClass: UserVerification,
        join: {
          from: 'user.id',
          to: 'user_verification.user_id'
        }
      },
      mobile: {
        relation: Model.HasOneRelation,
        modelClass: UserMobile,
        join: {
          from: 'user.id',
          to: 'user_mobile.user_id'
        }
      }
    };
  }

  async getUsers(orderBy, filter) {
    const queryBuilder = User.query().eager(user_eager);

    // add order by
    if (orderBy && orderBy.column) {
      let column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    }

    // add filter conditions
    if (filter) {
      if (has(filter, 'role') && filter.role !== '') {
        queryBuilder.where(function() {
          this.where('role', filter.role);
        });
      }

      if (has(filter, 'isActive') && filter.isActive !== null) {
        queryBuilder.where(function() {
          this.where('is_active', filter.isActive);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(knex.raw('LOWER(??) LIKE LOWER(?)', ['u.username', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['u.email', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['up.first_name', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['up.last_name', `%${filter.searchText}%`]));
        });
      }
    }

    queryBuilder.from('user as u').leftJoin('user_profile AS up', 'up.user_id', 'u.id');

    return camelizeKeys(await queryBuilder);
  }

  async getUser(id) {
    // console.log('id', id);
    const queryBuilder = User.query()
      .findById(id)
      .eager(user_eager);
    const res = camelizeKeys(await queryBuilder);
    return res;
  }

  async getUserWithPassword(id) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.password_hash',
          'u.role',
          'u.is_active',
          'u.email',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .where('u.id', '=', id)
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .first()
    );
  }

  async getUserWithSerial(serial) {
    // return camelizeKeys(
    //   await knex
    //     .select('u.id', 'u.username', 'u.role', 'u.is_active', 'ca.serial', 'up.first_name', 'up.last_name')
    //     .from('user AS u')
    //     .leftJoin('auth_certificate AS ca', 'ca.user_id', 'u.id')
    //     .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
    //     .where('ca.serial', '=', serial)
    //     .first()
    // );

    // confirm this To Do
    const queryBuilder = User.query()
      .where('user.id', '=', AuthCertificate.query().where('serial', serial)[0].user_id)
      .eager(user_eager);
    const res = camelizeKeys(await queryBuilder);
    // console.log(res);
    return res;
  }

  async register(params, passwordHash) {
    // return knex('user').insert(decamelizeKeys({ username, email, role, passwordHash, isActive }));
    delete params.password;
    if (passwordHash) {
      params.passwordHash = passwordHash;
    }
    const res = await User.query()
      .eager(user_eager)
      .insertGraph(decamelizeKeys(params));
    // console.log(res);
    // Add Profile
    await returnId(knex('user_profile')).insert({
      user_id: res.id
    });
    // console.log(profile_id);
    return res.id;
  }

  createFacebookAuth({ id, displayName, userId }) {
    return returnId(knex('auth_facebook')).insert({
      fb_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  createGithubAuth({ id, displayName, userId }) {
    return returnId(knex('auth_github')).insert({
      gh_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  createGoogleOAuth({ id, displayName, userId }) {
    return returnId(knex('auth_google')).insert({
      google_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  createLinkedInAuth({ id, displayName, userId }) {
    return returnId(knex('auth_linkedin')).insert({
      ln_id: id,
      display_name: displayName,
      user_id: userId
    });
  }

  async editUser(params, passwordHash) {
    // const localAuthInput = passwordHash ? { email, passwordHash } : { email };
    // return knex('user')
    //   .update(decamelizeKeys({ username, role, isActive, ...localAuthInput }))
    //   .where({ id });
    if (passwordHash) {
      delete params.password;
      params.passwordHash = passwordHash;
    }
    const userId = params.profile ? params.profile.referredId : null;
    const res = await User.query().upsertGraph(decamelizeKeys(params));
    if (userId)
      await returnId(
        knex('user_profile')
          .where('user_id', '=', res.id)
          .update('referrer_id', userId)
      );
    return res.id;
  }

  async isUserProfileExists(userId) {
    return !!(
      await knex('user_profile')
        .count('id as count')
        .where(decamelizeKeys({ userId }))
        .first()
    ).count;
  }

  editUserProfile({ id, profile }, isExists) {
    if (isExists) {
      return knex('user_profile')
        .update(decamelizeKeys(profile))
        .where({ user_id: id });
    } else {
      return returnId(knex('user_profile')).insert({
        ...decamelizeKeys(profile),
        user_id: id
      });
    }
  }

  async patchProfile(id, params) {
    const user = await User.query().findById(id);
    const profile = await user.$relatedQuery('profile').patch(params);
    if (!profile) {
      await user.$relatedQuery('profile').insert(params);
    }
    return camelizeKeys(profile);
  }

  async addUserMobile(id, params) {
    const user = await User.query().findById(id);
    const mobile = await user.$relatedQuery('mobile').insert(params);
    return camelizeKeys(mobile);
  }

  async updateUserMobile(id, params) {
    const mobile = await UserMobile.query().patchAndFetchById(id, params);
    return camelizeKeys(mobile);
  }

  async updateUserVerification(id, params) {
    const user = await User.query().findById(id);

    let verification = await user.$relatedQuery('verification').patch(params);
    if (!verification) {
      verification = await user.$relatedQuery('verification').insert(params);
    }

    return camelizeKeys(verification);
  }

  async editAuthCertificate({
    id,
    auth: {
      certificate: { serial }
    }
  }) {
    const userProfile = await knex
      .select('id')
      .from('auth_certificate')
      .where({ user_id: id })
      .first();

    if (userProfile) {
      return knex('auth_certificate')
        .update({ serial })
        .where({ user_id: id });
    } else {
      return returnId(knex('auth_certificate')).insert({ serial, user_id: id });
    }
  }

  deleteUser(id) {
    return knex('user')
      .where('id', '=', id)
      .del();
  }

  async updatePassword(id, newPassword) {
    const passwordHash = await bcrypt.hash(newPassword, 12);

    return knex('user')
      .update({ password_hash: passwordHash })
      .where({ id });
  }

  updateActive(id, isActive) {
    return knex('user')
      .update({ is_active: isActive })
      .where({ id });
  }

  async getUserByEmail(email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.password_hash',
          'u.role',
          'u.is_active',
          'u.email',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where({ email })
        .first()
    );
  }

  async getUserByFbIdOrEmail(id, email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.role',
          'u.is_active',
          'fa.fb_id',
          'u.email',
          'u.password_hash',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('fa.fb_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  async getUserByLnInIdOrEmail(id, email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.role',
          'u.is_active',
          'lna.ln_id',
          'u.email',
          'u.password_hash',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('lna.ln_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  async getUserByGHIdOrEmail(id, email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.role',
          'u.is_active',
          'gha.gh_id',
          'u.email',
          'u.password_hash',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('gha.gh_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  async getUserByGoogleIdOrEmail(id, email) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.role',
          'u.is_active',
          'ga.google_id',
          'u.email',
          'u.password_hash',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .where('ga.google_id', '=', id)
        .orWhere('u.email', '=', email)
        .first()
    );
  }

  async getUserByUsername(username) {
    return camelizeKeys(
      await knex
        .select('u.id', 'u.username', 'u.role', 'u.is_active', 'u.email', 'up.first_name', 'up.last_name')
        .from('user AS u')
        .where('u.username', '=', username)
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .first()
    );
  }

  async getUserByUsernameOrEmail(usernameOrEmail) {
    return camelizeKeys(
      await knex
        .select(
          'u.id',
          'u.username',
          'u.password_hash',
          'u.role',
          'u.is_active',
          'u.email',
          'up.first_name',
          'up.last_name'
        )
        .from('user AS u')
        .where('u.username', '=', usernameOrEmail)
        .orWhere('u.email', '=', usernameOrEmail)
        .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
        .first()
    );
  }

  async getUserItems(limit, after, orderBy, filter) {
    const queryBuilder = knex
      .select(
        'u.id as id',
        'u.username as username',
        'u.role',
        'u.is_active',
        'u.email as email',
        'up.first_name as first_name',
        'up.last_name as last_name',
        'ca.serial',
        'fa.fb_id',
        'fa.display_name AS fbDisplayName',
        'lna.ln_id',
        'lna.display_name AS lnDisplayName',
        'gha.gh_id',
        'gha.display_name AS ghDisplayName',
        'ga.google_id',
        'ga.display_name AS googleDisplayName'
      )
      .from('user AS u')
      .leftJoin('user_profile AS up', 'up.user_id', 'u.id')
      .leftJoin('auth_certificate AS ca', 'ca.user_id', 'u.id')
      .leftJoin('auth_facebook AS fa', 'fa.user_id', 'u.id')
      .leftJoin('auth_google AS ga', 'ga.user_id', 'u.id')
      .leftJoin('auth_github AS gha', 'gha.user_id', 'u.id')
      .leftJoin('auth_linkedin AS lna', 'lna.user_id', 'u.id');

    console.log('sql filters', filter);

    // add filter conditions
    if (filter) {
      if (has(filter, 'role') && filter.role !== '') {
        queryBuilder.where(function() {
          this.where('u.role', filter.role);
        });
      }

      if (has(filter, 'isActive') && filter.isActive !== null) {
        queryBuilder.where(function() {
          this.where('u.is_active', filter.isActive);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(knex.raw('LOWER(??) LIKE LOWER(?)', ['username', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['email', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['first_name', `%${filter.searchText}%`]))
            .orWhere(knex.raw('LOWER(??) LIKE LOWER(?)', ['last_name', `%${filter.searchText}%`]));
        });
      }
    }

    const allUserItems = camelizeKeys(await queryBuilder);
    const total = allUserItems.length;
    var res = {};

    if (limit && after) {
      res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    } else if (limit && !after) {
      res = camelizeKeys(await queryBuilder.limit(limit));
    } else if (!limit && after) {
      res = camelizeKeys(await queryBuilder.offset(after));
    } else {
      res = camelizeKeys(await queryBuilder);
    }
    console.log('sql userList', res);
    return {
      userItems: res,
      total: total
    };
  }
}
const userDAO = new User();

export default userDAO;

// UserProfile model.
export class UserProfile extends Model {
  static get tableName() {
    return 'user_profile';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_profile.user_id',
          to: 'user.id'
        }
      },
      referred_by: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'user_profile.referrer_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserVerification model.
class UserVerification extends Model {
  static get tableName() {
    return 'user_verification';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_verification.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// UserMobile model.
class UserMobile extends Model {
  static get tableName() {
    return 'user_mobile';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_mobile.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthLinkedin model.
class AuthLinkedin extends Model {
  static get tableName() {
    return 'auth_linkedin';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'auth_linkedin.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthGithub model.
class AuthGithub extends Model {
  static get tableName() {
    return 'auth_github';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'auth_github.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthGoogle model.
class AuthGoogle extends Model {
  static get tableName() {
    return 'auth_google';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'auth_google.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthFacebook model.
class AuthFacebook extends Model {
  static get tableName() {
    return 'auth_facebook';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'auth_facebook.user_id',
          to: 'user.id'
        }
      }
    };
  }
}

// AuthCertificate model.
class AuthCertificate extends Model {
  static get tableName() {
    return 'auth_certificate';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'auth_certificate.user_id',
          to: 'user.id'
        }
      }
    };
  }
}
