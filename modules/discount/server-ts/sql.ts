import { has } from 'lodash';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { Model, raw } from 'objection';

import { knex, returnId } from '@gqlapp/database-server-ts';
import { MODAL } from '@gqlapp/review-common';

Model.knex(knex);

export interface Identifier {
  id: number;
}

export interface Discount {
  modalId: number;
  modalName: string;
  discountPercent: number;
  isActive: boolean;
  discountDuration: DiscountDurations;
}

interface DiscountDurations {
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const eager = '[discount_duration]';

export default class DiscountDAO extends Model {
  private id: any;

  static get tableName() {
    return 'discount';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      discount_duration: {
        relation: Model.HasOneRelation,
        modelClass: DiscountDuration,
        join: {
          from: 'discount.id',
          to: 'discount_duration.discount_id'
        }
      }
    };
  }

  public async discountsPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = DiscountDAO.query().eager(eager);

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
          this.where('discount.is_active', filter.isActive);
          // .andWhere('discount_duration.is_active', filter.isActive);
        });
      }
      if (has(filter, 'modalName') && filter.modalName !== '') {
        queryBuilder.where(function() {
          this.where('discount.modal_name', filter.modalName);
          // .andWhere('discount_duration.is_active', filter.isActive);
        });
      }
      if (has(filter, 'isDiscount') && filter.isDiscount !== '') {
        queryBuilder.where(function() {
          if (filter.isDiscount) {
            this.where('discount.discount_percent', '>', 0);
          } else {
            this.where('discount.discount_percent', 0);
          }
        });
      }
      if (has(filter, 'onGoing') && filter.onGoing !== false) {
        const now = new Date().toISOString();
        queryBuilder.where(function() {
          this.where('discount_duration.start_date', '<=', now).andWhere('discount_duration.end_date', '>=', now);
        });
      }
      if (has(filter, 'upComing') && filter.upComing !== false) {
        const now = new Date().toISOString();
        queryBuilder.where(function() {
          this.where('discount_duration.start_date', '>=', now).andWhere('discount_duration.end_date', '>=', now);
        });
      }
      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where('discount.modal_name', MODAL[1].value).andWhere(
            raw('LOWER(??) LIKE LOWER(?)', ['listing.title', `%${filter.searchText}%`])
          );
        });
      }
    }

    queryBuilder
      .from('discount')
      .leftJoin('discount_duration', 'discount_duration.discount_id', 'discount.id')
      .leftJoin('listing', 'listing.id', 'discount.modal_id');

    const allDiscount = camelizeKeys(await queryBuilder);
    const total = allDiscount.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    // console.log(res);
    return {
      discounts: res,
      total
    };
  }

  public async discount(id: number) {
    const res = camelizeKeys(
      await DiscountDAO.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }

  public async modalDiscount(modalName: string, modalId: number) {
    const res = camelizeKeys(
      await DiscountDAO.query()
        .eager(eager)
        .where('modal_name', modalName)
        .andWhere('modal_id', modalId)
    )[0];
    // console.log(res);
    return res;
  }

  public async addDiscount(params: Discount) {
    return camelizeKeys(await returnId(DiscountDAO.query()).insertGraph(decamelizeKeys(params)));
  }
  public async editDiscount(params: Discount & Identifier) {
    if (params.id) {
      return camelizeKeys(await DiscountDAO.query().upsertGraph(decamelizeKeys(params)));
    } else {
      return camelizeKeys(await returnId(DiscountDAO.query()).insertGraph(decamelizeKeys(params)));
    }
  }
  public deleteDiscount(id: number) {
    return knex('discount')
      .where('id', '=', id)
      .del();
  }
}

// DiscountDuration model.
class DiscountDuration extends Model {
  static get tableName() {
    return 'discount_duration';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      discount: {
        relation: Model.BelongsToOneRelation,
        modelClass: DiscountDAO,
        join: {
          from: 'discount_duration.discount_id',
          to: 'discount.id'
        }
      }
    };
  }
}
