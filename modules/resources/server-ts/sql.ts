import { knex } from '@gqlapp/database-server-ts';
import { Model } from 'objection';
import { camelizeKeys, decamelizeKeys } from 'humps';

// Give the knex object to objection.
Model.knex(knex);

interface ResourceFiles {
  resourceUrl: string;
}

export interface Resource {
  id: number;

  //  Resource module;
  userId: number;
  title: string;
  uploadedBy: string;
  tags: string;
  description: string;
  resource: ResourceFiles;
  createdAt: string;
  updatedAt: string;
}

const eager = '[resource]';
export default class Resources extends Model {
  private id: any;

  static get tableName() {
    return 'resources';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      resource: {
        relation: Model.HasManyRelation,
        modelClass: ResourceDAO,
        join: {
          from: 'resources.id',
          to: 'resource.resource_id'
        }
      }
    };
  }

  public async resource(id: number) {
    const res = camelizeKeys(
      await Resources.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log('res', res);
    return res;
  }

  public resources() {
    return knex.select();
  }

  public async addResource(params: Resource) {
    const res = await Resources.query().insertGraph(decamelizeKeys(params));
    // console.log('res', res);

    return res.id;
  }
}

class ResourceDAO extends Model {
  static get tableName() {
    return 'resource';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      resources: {
        relation: Model.BelongsToOneRelation,
        modelClass: Resources,
        join: {
          from: 'resource.resource_id',
          to: 'resources.id'
        }
      }
    };
  }
}
