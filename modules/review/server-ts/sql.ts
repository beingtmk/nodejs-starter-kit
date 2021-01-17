import { Model } from 'objection';
import { has } from 'lodash';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import _ from 'lodash';

import { knex } from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';

Model.knex(knex);

export interface Reviews {
  userId: number;
  feedback: string;
  rating: number;
  helpful: number;
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

const eager = '[user.[profile], review_media, modal_review]';

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
      },
      review_media: {
        relation: Model.HasManyRelation,
        modelClass: ReviewMedium,
        join: {
          from: 'review.id',
          to: 'review_medium.review_id'
        }
      },
      modal_review: {
        relation: Model.HasOneRelation,
        modelClass: ModalReview,
        join: {
          from: 'review.id',
          to: 'modal_review.review_id'
        }
      },
      review_helpful_user: {
        relation: Model.BelongsToOneRelation,
        modelClass: ReviewHelpfulUser,
        join: {
          from: 'review.id',
          to: 'review_helpful_user.review_id'
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
      if (has(filter, 'modalName') && filter.modalName !== '') {
        queryBuilder.where(function() {
          this.where('modal_review.modal_name', filter.modalName);
        });
      }
      if (has(filter, 'modalId') && filter.modalId !== '') {
        queryBuilder.where(function() {
          this.where('modal_review.modal_id', filter.modalId);
        });
      }
      if (has(filter, 'userId') && filter.userId !== '') {
        queryBuilder.where(function() {
          this.where('review.user_id', filter.userId);
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
    // console.log(res);
    return res;
  }

  public async addReview({ modalName, modalId, review }: ModalReview) {
    const res = camelizeKeys(await Review.query().insertGraph(decamelizeKeys(review)));
    if (res.id) {
      // const res1 =
      await knex('modal_review').insert(decamelizeKeys({ modalName, modalId, reviewId: res.id }));
      // console.log('res for modalName table', res1);
    }
    if (res.rating) {
      await this.addRating({ modalName, modalId, review: res });
    }
    // console.log('res for review', res);
    return res.id;
  }

  public async editReview(input: Reviews & Identifier) {
    // console.log('bleh')
    const review = camelizeKeys(
      await ModalReview.query()
        .eager('[review]')
        .where('review_id', '=', input.id)
    )[0];
    if (input.rating) {
      await this.deleteRating(review);
    }
    const res = camelizeKeys(await Review.query().upsertGraph(decamelizeKeys(input)));
    if (input.rating) {
      await this.addRating({ modalName: review.modalName, modalId: review.modalId, review: input });
    }
    // if (res.id) {
    //   // const res1 =
    //   await knex('modal_review')
    //     .where({ id: modalId })
    //     .update(decamelizeKeys({ id: modalId, moduleId, reviewId: res.id }));
    //   // console.log('res for modalName table', res1);
    // }
    return res.id;
  }

  public async deleteReview(id: number) {
    try {
      await Review.query().upsertGraph(decamelizeKeys({ id, isActive: false }));
      const res = camelizeKeys(await ModalReview.query().where('review_id', '=', id))[0];
      await ModalReview.query().upsertGraph(decamelizeKeys({ id: res.id, isActive: false }));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Rating
  public async ratingAverage(modalName: string, modalId: number) {
    return camelizeKeys(
      await Rating.query()
        .where('modal_name', '=', modalName)
        .where('modal_id', '=', modalId)
    )[0];
  }

  public async addRating(modal: ModalReview) {
    // console.log('modal', modal);
    const rating = camelizeKeys(
      await Rating.query()
        .where('modal_name', '=', modal.modalName)
        .where('modal_id', '=', modal.modalId)
    )[0];
    const rate = parseInt(modal.review.rating);
    const input = {
      id: rating && rating.id,
      modalName: modal.modalName,
      modalId: modal.modalId
    };
    switch (rate) {
      case 5:
        input.five = rating && rating.five ? rating.five + 1 : 1;
        break;
      case 4:
        input.four = rating && rating.four ? rating.four + 1 : 1;
        break;
      case 3:
        input.three = rating && rating.three ? rating.three + 1 : 1;
        break;
      case 2:
        input.two = rating && rating.two ? rating.two + 1 : 1;
        break;
      default:
        input.one = rating && rating.one ? rating.one + 1 : 1;
    }
    // console.log('input', input);
    await Rating.query().upsertGraph(decamelizeKeys(input));
  }
  public async deleteRating(modal: ModalReview) {
    // console.log('modal', modal);
    const rating = decamelizeKeys(
      await Rating.query()
        .where('modal_name', '=', modal.modalName)
        .where('modal_id', '=', modal.modalId)
    )[0];
    const rate = parseInt(modal.review.rating);
    const input = {
      id: rating && rating.id,
      modalName: modal.modalName,
      modalId: modal.modalId
    };
    switch (rate) {
      case 5:
        input.five = rating && rating.five ? rating.five - 1 : 0;
        break;
      case 4:
        input.four = rating && rating.four ? rating.four - 1 : 0;
        break;
      case 3:
        input.three = rating && rating.three ? rating.three - 1 : 0;
        break;
      case 2:
        input.two = rating && rating.two ? rating.two - 1 : 0;
        break;
      default:
        input.one = rating && rating.one ? rating.one - 1 : 0;
    }
    // console.log('input', input);
    await Rating.query().upsertGraph(decamelizeKeys(input));
  }

  public async refresh() {
    // await knex('average_rating').where('id', '=', 5).del();
    const modal = camelizeKeys(await ModalReview.query().eager('[review]'));
    // await this.addRating(modal[0]);
    // const rating = decamelizeKeys(await Rating.query()
    //   .where('modal_name', '=', modal[0].modalName)
    //   .where('modal_id', '=', modal[0].modalId))[0];
    // console.log('average_rating', rating && rating.id);
    modal.map(mod => this.addRating(mod));
    // // const modalName = new Set(modal.map(m => m.modalName));
    // // const modalId = new Set(modal.map(m => m.modalId));
    // // const ar = _.uniqBy(modal, 'modalId');
    // // console.log('modalName', modalName, 'ar', ar);
    // console.log('modal');

    return true;
  }
  public async reviewHelpfulStatus(reviewId: number, userId: number) {
    const count = camelizeKeys(
      await ReviewHelpfulUser.query()
        .where('user_id', userId)
        .where('review_id', reviewId)
    ).length;
    let wStatus = false;
    if (count > 0) {
      wStatus = true;
    }
    return wStatus;
  }
  public async addOrRemoveReviewHelpful(reviewId: number, userId: number) {
    const status = await this.reviewHelpfulStatus(reviewId, userId);
    // console.log('status1', status);
    const review = await this.review(reviewId);
    if (status) {
      await ReviewHelpfulUser.query()
        .where('review_id', '=', reviewId)
        .andWhere('user_id', '=', userId)
        .del();
      await this.editReview({ id: review.id, helpful: review.helpful - 1 });
      return false;
    } else {
      await ReviewHelpfulUser.query().insertGraph(decamelizeKeys({ reviewId, userId }));
      await this.editReview({ id: review.id, helpful: review.helpful + 1 });

      return true;
    }
  }
}

export class ModalReview extends Model {
  static get tableName() {
    return 'modal_review';
  }

  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: 'modal_review.review_id',
          to: 'review.id'
        }
      }
    };
  }
}

export class Rating extends Model {
  static get tableName() {
    return 'average_rating';
  }

  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: 'average_rating.review_id',
          to: 'review.id'
        }
      }
    };
  }
}

// ReviewMedium model.
class ReviewMedium extends Model {
  static get tableName() {
    return 'review_medium';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: 'review_medium.review_id',
          to: 'review.id'
        }
      }
    };
  }
}

class ReviewHelpfulUser extends Model {
  static get tableName() {
    return 'review_helpful_user';
  }
  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: 'review_helpful_user.review_id',
          to: 'review.id'
        }
      }
    };
  }
}
