import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex } from '@gqlapp/database-server-ts';

// Give the knex object to objection.
Model.knex(knex);

interface ResourceFiles {
  resourceUrl: string;
}

export interface Resource {
  //  Resource module;
  userId: number;
  title: string;
  uploadedBy: string;
  tags: string;
  description: string;
  resource: ResourceFiles[];
  createdAt: string;
  updatedAt: string;
}

export interface Identifier {
  id: number;
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
        modelClass: ResourceFile,
        join: {
          from: 'resources.id',
          to: 'resource.resource_id'
        }
      }
    };
  }

  public async resourcesPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = Resources.query().eager(eager);
    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else {
      queryBuilder.orderBy('id', 'desc');
    }

    if (filter) {
      // if (has(filter, 'title') && filter.title !== '') {
      //   queryBuilder.where(function() {
      //     this.where('title', filter.title);
      //   });
      // }

      // if (has(filter, 'uploadedBy') && filter.uploadedBy !== '') {
      //   queryBuilder.where(function() {
      //     this.where('uploaded_by', filter.uploadedBy);
      //   });
      // }

      if (has(filter, 'tags') && filter.tags !== '') {
        queryBuilder.where(function() {
          this.where('tags', filter.tags);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder
          .from('resources')
          .leftJoin('resources AS ld', 'ld.resources_id', 'resource.id')
          .where(function() {
            this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
              .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
              .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['uploaded_by', `%${filter.searchText}%`]));
          });
      }
    }
    const allresources = camelizeKeys(await queryBuilder);
    const total = allresources.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return { resources: res, total };
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

  public async resources(id: number) {
    const res = camelizeKeys(
      await Resources.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async addResource(params: Resource) {
    const res = await Resources.query().insertGraph(decamelizeKeys(params));
    // console.log('res', res);

    return res.id;
  }

  public deleteResource(id: number) {
    return knex('resources')
      .where('id', '=', id)
      .del();
  }

  public async editResource(params: Resource & Identifier) {
    const res = await Resources.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }
}

class ResourceFile extends Model {
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
