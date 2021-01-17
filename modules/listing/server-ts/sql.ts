import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { ORDER_STATES } from '@gqlapp/order-common';
import { knex, returnId } from '@gqlapp/database-server-ts';
import { User } from '@gqlapp/user-server-ts/sql';
import OrderDAO, { OrderState } from '@gqlapp/order-server-ts/sql';
import CategoryDAO from '@gqlapp/category-server-ts/sql';
import Review from '@gqlapp/review-server-ts/sql';
import { MODAL } from '@gqlapp/review-common';

Model.knex(knex);

export interface Listing {
  user: object;
  title: string;
  description: string;
  listingMedias: ListingMedium[];
  listingCostArray: ListingCost[];
  isActive: boolean;
}

interface ListingMedium {
  listingId: number;
  url: string;
  isActive: boolean;
}

interface ListingCost {
  listingId: number;
  cost: number;
}

export interface Identifier {
  id: number;
}

const eager =
  '[user, category, listing_flags, listing_options, listing_detail, listing_media, listing_cost_array, listing_highlight]';

export default class ListingDAO extends Model {
  private id: any;

  static get tableName() {
    return 'listing';
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
          from: 'listing.user_id',
          to: 'user.id'
        }
      },
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoryDAO,
        join: {
          from: 'listing.category_id',
          to: 'category.id'
        }
      },
      listing_flags: {
        relation: Model.HasOneRelation,
        modelClass: ListingFlag,
        join: {
          from: 'listing.id',
          to: 'listing_flag.listing_id'
        }
      },
      listing_options: {
        relation: Model.HasOneRelation,
        modelClass: ListingOption,
        join: {
          from: 'listing.id',
          to: 'listing_option.listing_id'
        }
      },
      listing_detail: {
        relation: Model.HasOneRelation,
        modelClass: ListingDetail,
        join: {
          from: 'listing.id',
          to: 'listing_detail.listing_id'
        }
      },
      listing_media: {
        relation: Model.HasManyRelation,
        modelClass: ListingMedium,
        join: {
          from: 'listing.id',
          to: 'listing_medium.listing_id'
        }
      },
      listing_cost_array: {
        relation: Model.HasManyRelation,
        modelClass: ListingCost,
        join: {
          from: 'listing.id',
          to: 'listing_cost.listing_id'
        }
      },
      listing_bookmark: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingBookmark,
        join: {
          from: 'listing.id',
          to: 'listing_bookmark.listing_id'
        }
      },
      listing_highlight: {
        relation: Model.HasManyRelation,
        modelClass: ListingHighlight,
        join: {
          from: 'listing.id',
          to: 'listing_highlight.listing_id'
        }
      }
    };
  }

  public async listingsPagination(
    limit: number,
    after: number,
    orderBy: any,
    filter: any,
    userId: number,
    ids: number[] = []
  ) {
    const queryBuilder =
      ids && ids.length > 0
        ? ListingDAO.query()
            .eager(eager)
            .whereIn('listing.id', ids)
        : ListingDAO.query().eager(eager);

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
          this.where('listing.is_active', filter.isActive);
          // .andWhere('listing_cost.is_active', filter.isActive);
        });
      }
      if (has(filter, 'isFeatured') && filter.isFeatured !== '') {
        queryBuilder.where(function() {
          this.where('listing_flag.is_featured', filter.isFeatured);
        });
      }
      if (has(filter, 'isNew') && filter.isNew !== '') {
        queryBuilder.where(function() {
          this.where('listing_flag.is_new', filter.isNew);
        });
      }
      if (has(filter, 'isDiscount') && filter.isDiscount !== '') {
        queryBuilder.where(function() {
          this.where('listing_flag.is_discount', filter.isDiscount);
        });
      }
      if (has(filter, 'brand') && filter.brand.length > 0) {
        queryBuilder.where(function() {
          this.whereIn('listing.brand', filter.brand);
        });
      }
      if (has(filter, 'showOwned') && filter.showOwned !== false && userId) {
        queryBuilder.where(function() {
          this.whereNot('user.id', userId);
        });
      }

      if (has(filter, 'popularity') && filter.popularity !== 0) {
        queryBuilder.where(function() {
          this.where('average_rating.modal_name', MODAL[1].value).andWhere(
            'average_rating.rating',
            '>=',
            filter.popularity
          );
        });
      }

      if (has(filter, 'categoryFilter') && filter.categoryFilter.categoryId !== 0) {
        const category = camelizeKeys(
          await CategoryDAO.query()
            .eager('[sub_categories.^]')
            .findById(filter.categoryFilter.categoryId)
        );
        const listingids = [category.id];
        if (filter.categoryFilter.allSubCategory) {
          const addIdForArrayExpression = function addIdForArray(cat) {
            cat.subCategories.map(c => {
              listingids.push(c.id);
              if (c.subCategories.length > 0) {
                addIdForArray(c);
              }
            });
          };
          addIdForArrayExpression(category);
        }
        queryBuilder.where(function() {
          this.whereIn('listing.category_id', listingids);
        });
      }

      if (has(filter, 'userId') && filter.userId !== 0) {
        queryBuilder.where(function() {
          this.where('user.id', filter.userId);
        });
      }

      if (has(filter, 'discount') && filter.discount !== 0) {
        queryBuilder.where(function() {
          this.where('discount.discount_percent', '>=', filter.discount);
        });
      }

      if (has(filter, 'lowerCost') && filter.lowerCost !== 0) {
        queryBuilder.where(function() {
          this.where('listing_cost.cost', '>', filter.lowerCost);
        });
      }

      if (has(filter, 'upperCost') && filter.upperCost !== 0) {
        queryBuilder.where(function() {
          this.where('listing_cost.cost', '<', filter.upperCost);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
            .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
            .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['user.username', `%${filter.searchText}%`]));
          // .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['listing_cost.cost', `%${filter.searchText}%`]));
        });
      }
    }

    const rangeQueryBuilder = ListingDAO.query();

    const maxCost = camelizeKeys(
      await rangeQueryBuilder
        .from('listing')
        .leftJoin('listing_cost AS list_cost', 'list_cost.listing_id', 'listing.id')
        .max('list_cost.cost as var')
        .first()
    );

    const minCost = camelizeKeys(
      await rangeQueryBuilder
        .from('listing')
        .leftJoin('listing_cost AS list_cost1', 'list_cost1.listing_id', 'listing.id')
        .min('list_cost1.cost as var')
        .first()
    );

    queryBuilder
      .from('listing')
      .leftJoin('user', 'user.id', 'listing.user_id')
      .leftJoin('listing_option', 'listing_option.listing_id', 'listing.id')
      .leftJoin('listing_detail', 'listing_detail.listing_id', 'listing.id')
      .leftJoin('listing_flag', 'listing_flag.listing_id', 'listing.id')
      .leftJoin('listing_cost', 'listing_cost.listing_id', 'listing.id')
      .leftJoin('discount', 'discount.modal_id', 'listing.id')
      .leftJoin('average_rating', 'average_rating.modal_id', 'listing.id');
    // .groupBy('listing.id');

    const allListings = camelizeKeys(await queryBuilder);
    const total = allListings.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    // console.log(res);
    return {
      listings: res,
      total,
      rangeValues: {
        maxCost: maxCost.var,
        minCost: minCost.var
      }
    };
  }

  public async listing(id: number) {
    const res = camelizeKeys(
      await ListingDAO.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(res);
    return res;
  }

  public async getBrandList() {
    const res = knex('listing')
      .distinct()
      .pluck('brand');
    // console.log(res);
    return res;
  }

  public async addListing(params: Listing) {
    const res = camelizeKeys(await returnId(ListingDAO.query()).insertGraph(decamelizeKeys(params)));
    return res.id;
  }
  public async duplicateListing(id: number) {
    const listing = camelizeKeys(
      await ListingDAO.query()
        .eager(eager)
        .findById(id)
    );
    // console.log('sql, res', listing);

    // deleting ids
    listing.userId = listing.user.id;
    if (listing) {
      delete listing.id;
      delete listing.user;
      if (listing.listingFlags) {
        delete listing.listingFlags.id;
      }
      if (listing.listingOptions) {
        delete listing.listingOptions.id;
      }
      if (listing.listingDetail) {
        delete listing.listingDetail.id;
      }
      if (listing.listingMedia && listing.listingMedia.length > 0) {
        listing.listingMedia.map(lM => delete lM.id);
      }
      if (listing.listingHighlight && listing.listingHighlight.length > 0) {
        listing.listingHighlight.map(lM => delete lM.id);
      }
      if (listing.listingCostArray && listing.listingCostArray.length > 0) {
        listing.listingCostArray.map(lM => delete lM.id);
      }

      const res = camelizeKeys(await ListingDAO.query().insertGraph(decamelizeKeys(listing)));
      return res.id;
    }
    return false;
  }

  public async editListing(params: Listing & Identifier) {
    const res = await ListingDAO.query().upsertGraph(decamelizeKeys(params));
    return res.id;
  }

  public deleteListing(id: number) {
    return knex('listing')
      .where('id', '=', id)
      .del();
  }

  public async myListingBookmark(userId: number, limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = ListingBookmark.query()
      .where('listing_bookmark.user_id', userId)
      .eager('[listing.[user, listing_media, listing_cost_array]]');
    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else {
      queryBuilder.orderBy('listing.id', 'desc');
    }

    if (filter) {
      if (has(filter, 'isActive') && filter.isActive !== '') {
        queryBuilder.where(function() {
          this.where('listing.is_active', filter.isActive);
          // .andWhere('listing_cost.is_active', filter.isActive);
        });
      }
      if (has(filter, 'isFeatured') && filter.isFeatured !== '') {
        queryBuilder.where(function() {
          this.where('listing_flag.is_featured', filter.isFeatured);
        });
      }
      if (has(filter, 'isNew') && filter.isNew !== '') {
        queryBuilder.where(function() {
          this.where('listing_flag.is_new', filter.isNew);
        });
      }
      if (has(filter, 'isDiscount') && filter.isDiscount !== '') {
        queryBuilder.where(function() {
          this.where('listing_flag.is_discount', filter.isDiscount);
        });
      }
      if (has(filter, 'discount') && filter.discount !== 0) {
        queryBuilder.where(function() {
          this.where('discount.discount_percent', '>=', filter.discount);
        });
      }
      if (has(filter, 'showOwned') && filter.showOwned !== false && userId) {
        queryBuilder.where(function() {
          this.whereNot('user.id', userId);
        });
      }
      if (has(filter, 'popularity') && filter.popularity !== 0) {
        queryBuilder.where(function() {
          this.where('average_rating.modal_name', MODAL[1].value).andWhere(
            'average_rating.rating',
            '>=',
            filter.popularity
          );
        });
      }
      if (has(filter, 'categoryFilter') && filter.categoryFilter.categoryId !== 0) {
        const category = camelizeKeys(
          await CategoryDAO.query()
            .eager('[sub_categories.^]')
            .findById(filter.categoryFilter.categoryId)
        );
        const listingids = [category.id];
        if (filter.categoryFilter.allSubCategory) {
          const addIdForArrayExpression = function addIdForArray(cat) {
            cat.subCategories.map(c => {
              listingids.push(c.id);
              if (c.subCategories.length > 0) {
                addIdForArray(c);
              }
            });
          };
          addIdForArrayExpression(category);
        }
        queryBuilder.where(function() {
          this.whereIn('listing.category_id', listingids);
        });
      }

      if (has(filter, 'userId') && filter.userId !== 0) {
        queryBuilder.where(function() {
          this.where('user.id', filter.userId);
        });
      }

      if (has(filter, 'lowerCost') && filter.lowerCost !== 0) {
        queryBuilder.where(function() {
          this.where('listing_cost.cost', '>', filter.lowerCost);
        });
      }

      if (has(filter, 'upperCost') && filter.upperCost !== 0) {
        queryBuilder.where(function() {
          this.where('listing_cost.cost', '<', filter.upperCost);
        });
      }

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
            .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
            .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['user.username', `%${filter.searchText}%`]));
          // .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['listing_cost.cost', `%${filter.searchText}%`]));
        });
      }
    }

    const rangeQueryBuilder = ListingBookmark.query().where('user_id', userId);

    const maxCost = camelizeKeys(
      await rangeQueryBuilder
        .from('listing_bookmark')
        .leftJoin('listing_cost AS list_cost', 'list_cost.listing_id', 'listing_bookmark.listing_id')
        .max('list_cost.cost as var')
        .first()
    );

    const minCost = camelizeKeys(
      await rangeQueryBuilder
        .from('listing_bookmark')
        .leftJoin('listing_cost AS list_cost1', 'list_cost1.listing_id', 'listing_bookmark.listing_id')
        .min('list_cost1.cost as var')
        .first()
    );

    queryBuilder
      .from('listing_bookmark')
      .leftJoin('user', 'user.id', 'listing_bookmark.user_id')
      .leftJoin('listing', 'listing.id', 'listing_bookmark.listing_id')
      .leftJoin('listing_option', 'listing_option.listing_id', 'listing.id')
      .leftJoin('listing_detail', 'listing_detail.listing_id', 'listing.id')
      .leftJoin('listing_flag', 'listing_flag.listing_id', 'listing.id')
      .leftJoin('listing_cost', 'listing_cost.listing_id', 'listing.id')
      .leftJoin('discount', 'discount.modal_id', 'listing.id')
      .leftJoin('average_rating', 'average_rating.modal_id', 'listing.id');

    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));

    const allListings = res.map(item => {
      return item.listing;
    });

    const total = allListings.length;
    return {
      listings: allListings,
      total,
      rangeValues: {
        maxCost: maxCost.var,
        minCost: minCost.var
      }
    };
  }

  public async canUserReview(listingId: number, userId: number) {
    const orderState = camelizeKeys(await OrderState.query().where('state', '=', ORDER_STATES.STALE))[0];
    const orderQueryBuilder = OrderDAO.query()
      .eager('[order_details]')
      .where('order.consumer_id', '=', userId)
      .andWhere('order_detail.modal_id', '=', listingId);
    orderQueryBuilder.whereNot('order.order_state_id', orderState.id);

    orderQueryBuilder.from('order').leftJoin('order_detail', 'order_detail.order_id', 'order.id');

    const orders = camelizeKeys(await orderQueryBuilder);
    if (orders.length > 0) {
      const reviewQueryBuilder = Review.query()
        .where('review.user_id', userId)
        .andWhere('modal_review.modal_id', listingId)
        .andWhere('review.is_active', true);
      reviewQueryBuilder.from('review').leftJoin('modal_review', 'modal_review.review_id', 'review.id');
      const reviews = await reviewQueryBuilder;
      // console.log('order', reviews);
      return reviews.length === 0;
    } else {
      return false;
    }
  }

  public async listingBookmarkStatus(listingId: number, userId: number) {
    const count = camelizeKeys(
      await ListingBookmark.query()
        .where('user_id', userId)
        .where('listing_id', listingId)
    ).length;
    let wStatus = false;
    // console.log('count', count);
    if (count > 0) {
      wStatus = true;
    }
    return wStatus;
  }

  public async addOrRemoveListingBookmark(listingId: number, userId: number) {
    const status = await this.listingBookmarkStatus(listingId, userId);
    // console.log('status1', status);
    if (status) {
      await ListingBookmark.query()
        .where('listing_id', '=', listingId)
        .andWhere('user_id', '=', userId)
        .del();
      return false;
    } else {
      await ListingBookmark.query().insertGraph(decamelizeKeys({ listingId, userId }));
      return true;
    }
  }
}

// ListingFlag model.
class ListingFlag extends Model {
  static get tableName() {
    return 'listing_flag';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_flag.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}
// ListingOption model.
class ListingOption extends Model {
  static get tableName() {
    return 'listing_option';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_option.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}
// ListingDetail model.
class ListingDetail extends Model {
  static get tableName() {
    return 'listing_detail';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_detail.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}
// ListingMedium model.
class ListingMedium extends Model {
  static get tableName() {
    return 'listing_medium';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_medium.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}

// ListingCost model.
class ListingCost extends Model {
  static get tableName() {
    return 'listing_cost';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_cost.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}

// ListingBookmark model.
class ListingBookmark extends Model {
  static get tableName() {
    return 'listing_bookmark';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_bookmark.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}

// ListingHighlight model.
class ListingHighlight extends Model {
  static get tableName() {
    return 'listing_highlight';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      listing: {
        relation: Model.BelongsToOneRelation,
        modelClass: ListingDAO,
        join: {
          from: 'listing_highlight.listing_id',
          to: 'listing.id'
        }
      }
    };
  }
}
