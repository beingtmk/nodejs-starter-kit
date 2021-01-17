import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';

Model.knex(knex);

interface FilterDynamicCarousel {
  searchText: string;
  label: string;
  isActive: boolean;
}
interface OrderByDynamicCarousel {
  column: string;
  order: string;
}
export interface FilterDynamicCarouselInput {
  limit: number;
  after: number;
  orderBy: OrderByDynamicCarousel;
  filter: FilterDynamicCarousel;
}

export interface Identifier {
  id: number;
}
export interface DynamicCarousels {
  label: string;
  link: string;
  image: string;
}

export interface DynamicCarouselInput {
  input: DynamicCarousels & Identifier;
}

export default class Home extends Model {
  private id: any;

  public homes() {
    return knex.select();
  }

  public async dynamicCarousels(
    limit: number,
    after: number,
    orderBy: OrderByDynamicCarousel,
    filter: FilterDynamicCarousel
  ) {
    const queryBuilder = DynamicCarousel.query();
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
      if (has(filter, 'isActive') && filter.isActive !== '') {
        queryBuilder.where(function() {
          this.where('is_active', filter.isActive);
        });
      }

      if (has(filter, 'label') && filter.label !== '') {
        queryBuilder.where(function() {
          this.where('label', filter.label);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['link', `%${filter.searchText}%`]));
        });
      }
    }
    const AllDynamicCarousels = camelizeKeys(await queryBuilder);
    const total = AllDynamicCarousels.length;
    const dynamicCarousels = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return { dynamicCarousels, total };
  }
  public async dynamicCarousel(id: number) {
    return camelizeKeys(await DynamicCarousel.query().findById(id));
  }

  public async addDynamicCarousel(input: DynamicCarousels) {
    return camelizeKeys(await DynamicCarousel.query().insertGraph(decamelizeKeys(input)));
  }

  public async editDynamicCarousel(input: DynamicCarousels) {
    return camelizeKeys(await DynamicCarousel.query().upsertGraph(decamelizeKeys(input)));
  }

  public deleteDynamicCarousel(id: number) {
    return knex('dynamic_carousel')
      .where('id', '=', id)
      .del();
  }
}

// DynamicCarousel model.
class DynamicCarousel extends Model {
  static get tableName() {
    return 'dynamic_carousel';
  }

  static get idColumn() {
    return 'id';
  }

  // static get relationMappings() {
  //   return {
  //     banner: {
  //       relation: Model.,
  //       modelClass: ,
  //       join: {
  //         from: "",
  //         to: "",
  //       },
  //     },
  //   };
  // }
}
