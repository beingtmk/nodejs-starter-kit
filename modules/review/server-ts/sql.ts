import { Model } from 'objection';
import { camelizeKeys, decamelizeKeys } from 'humps';

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
  modal: string;
  modalId: number;
  moduleId: number;
  review: Reviews & Identifier;
}
export interface DeleteModalReview {
  modalId: number;
  reviewId: number;
  modal: string;
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
    const queryBuilder = Review.query()
      .orderBy('id', 'desc')
      .eager(eager);
    // if (orderBy && orderBy.column) {
    //   const column = orderBy.column;
    //   let order = 'asc';
    //   if (orderBy.order) {
    //     order = orderBy.order;
    //   }

    //   queryBuilder.orderBy(decamelize(column), order);
    // } else {
    //   queryBuilder.orderBy('id', 'desc');
    // }

    if (filter) {
      // if (has(filter, 'isActive') && filter.isActive !== '') {
      //   queryBuilder.where(function() {
      //     this.where('is_active', filter.isActive);
      //   });
      // }
      // if (has(filter, 'searchText') && filter.searchText !== '') {
      //   queryBuilder
      //     .from('listing')
      //     .leftJoin('listing_cost AS ld', 'ld.listing_id', 'listing.id')
      //     .where(function() {
      //       this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
      //         .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
      //         .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.cost', `%${filter.searchText}%`]));
      //     });
      // }
    }

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

  public async addReview({ modal, moduleId, review }: ModalReview) {
    const res = await Review.query().insert(decamelizeKeys(review));
    if (res.id) {
      // const res1 =
      await knex(modal).insert(decamelizeKeys({ moduleId, reviewId: res.id }));
      // console.log('res for modal table', res1);
    }
    // console.log('res for review', res);
    return res.id;
  }

  public async editReview({ modal, modalId, moduleId, review }: ModalReview) {
    const res = await Review.query().upsertGraph(decamelizeKeys(review));
    if (res.id) {
      // const res1 =
      await knex(modal)
        .where({ id: modalId })
        .update(decamelizeKeys({ id: modalId, moduleId, reviewId: res.id }));
      // console.log('res for modal table', res1);
    }
    // console.log('res for review', res);
    return res.id;
  }

  public async deleteReview({ modalId, reviewId, modal }: DeleteModalReview) {
    await knex(modal)
      .where('id', '=', modalId)
      .update(decamelizeKeys({ isActive: false }));
    return knex('review')
      .where('id', '=', reviewId)
      .update(decamelizeKeys({ isActive: false }));
  }
}
