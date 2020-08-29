import { Model } from 'objection';
import { has } from 'lodash';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';

Model.knex(knex);

export interface Reviews {
  userId: number;
  feedback: string;
  rating: number;
  listingId: number;
  // reviewImages: ReviewImage[];
}
export interface Identifier {
  id: number;
}

export interface ModalReview {
  modalName: string;
  modalId: number;
  moduleId: number;
  review: Reviews & Identifier;
}
export interface DeleteModalReview {
  modalId: number;
  reviewId: number;
  modalName: string;
}
const eager = '[user.[profile]]';

export default class Review extends Model {
  private id: any;

  static get tableName() {
    return 'review';
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
          from: 'review.user_id',
          to: 'user.id'
        }
      }
    };
  }

  public async reviews(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = Review.query().eager(eager);

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
          this.where('review.is_active', filter.isActive);
        });
      }
      if (has(filter, 'modalId') && filter.modalId !== '') {
        queryBuilder.where(function() {
          this.where('modal_review.modal_id', filter.modalId);
        });
      }
      if (has(filter, 'modalName') && filter.modalName !== '') {
        queryBuilder.where(function() {
          this.where('modal_review.modal_name', filter.modalName);
        });
      }
      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(knex.raw('LOWER(??) LIKE LOWER(?)', ['user.username', `%${filter.searchText}%`]));
          //   .orWhere(
          //   knex.raw('LOWER(??) LIKE LOWER(?)', ['u.up.last_name', `%${filter.searchText}%`])
          // );
        });
      }
    }

    queryBuilder
      .from('review')
      .leftJoin('user', 'user.id', 'review.user_id')
      .leftJoin('modal_review', 'modal_review.review_id', 'review.id');

    const allReviews = camelizeKeys(await queryBuilder);
    const total = allReviews.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    return { reviews: res, total };
  }

  public async review(id: number) {
    const res = camelizeKeys(
      await Review.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    return res;
  }

  public async addReview({ modalName, modalId, review }: ModalReview) {
    const res = await Review.query().insert(decamelizeKeys(review));
    if (res.id) {
      // const res1 =
      await knex('modal_review').insert(decamelizeKeys({ modalName, modalId, reviewId: res.id }));
      // console.log('res for modalName table', res1);
    }
    // console.log('res for review', res);
    return res.id;
  }

  public async editReview(input: Reviews & Identifier) {
    const res = await Review.query().upsertGraph(decamelizeKeys(input));
    // if (res.id) {
    //   // const res1 =
    //   await knex('modal_review')
    //     .where({ id: modalId })
    //     .update(decamelizeKeys({ id: modalId, moduleId, reviewId: res.id }));
    //   // console.log('res for modalName table', res1);
    // }
    // console.log('res for review', res);
    return res.id;
  }

  public async deleteReview({ modalId, reviewId, modalName }: DeleteModalReview) {
    await knex(modalName)
      .where('id', '=', modalId)
      .update(decamelizeKeys({ isActive: false }));
    return knex('review')
      .where('id', '=', reviewId)
      .update(decamelizeKeys({ isActive: false }));
  }
}
