import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { Model, raw } from 'objection';

import { knex } from '@gqlapp/database-server-ts';

Model.knex(knex);

export interface Platform {
  id: number;
  logo: string;
  type: string;
  isActive: boolean;
  platformInfo: PlatformInfos;
  platformSocial: PlatformSocial;
}

interface PlatformInfos {
  id: number;
  mobile: string;
  email: string;
  address: string;
  isActive: boolean;
}
interface PlatformSocial {
  id: number;
  youtube: string;
  facebook: string;
  instagram: string;
  linkedIn: string;
  twitter: string;
}

export interface Identifier {
  id: number;
}

const eager = '[platform_info, platform_social]';

export default class Setting extends Model {
  private id: any;

  static get tableName() {
    return 'platform';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      platform_info: {
        relation: Model.HasOneRelation,
        modelClass: PlatformInfo,
        join: {
          from: 'platform.id',
          to: 'platform_info.platform_id'
        }
      },
      platform_social: {
        relation: Model.HasOneRelation,
        modelClass: PlatformSocial,
        join: {
          from: 'platform.id',
          to: 'platform_social.platform_id'
        }
      }
    };
  }

  public settings() {
    return knex.select();
  }

  public async platform(id: number) {
    const res = camelizeKeys(
      await Setting.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }
  public async editPlatform(params: Platform & Identifier) {
    const res = await Setting.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }
}

// PlatformInfo model.
class PlatformInfo extends Model {
  static get tableName() {
    return 'platform_info';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      platform: {
        relation: Model.BelongsToOneRelation,
        modelClass: Setting,
        join: {
          from: 'platform_info.platform_id',
          to: 'platform.id'
        }
      }
    };
  }
}
// PlatformSocial model.
class PlatformSocial extends Model {
  static get tableName() {
    return 'platform_social';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      platform: {
        relation: Model.BelongsToOneRelation,
        modelClass: Setting,
        join: {
          from: 'platform_social.platform_id',
          to: 'platform.id'
        }
      }
    };
  }
}
