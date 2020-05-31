import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex, returnId } from '@gqlapp/database-server-ts';
// import { User } from '@gqlapp/user-server-ts/sql';

Model.knex(knex);

export interface Listing {
  userId: number;
  title: string;
  description: string;
  isActive: boolean;
  listingImages: ListingImage[];
  listingCost: ListingCost;
}

interface ListingImage {
  listingId: number;
  imageUrl: string;
  description: string;
}

interface ListingCost {
  listingId: number;
  cost: number;
}

export interface Identifier {
  id: number;
}

const eager = '[listing_images, listing_cost]';

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
      // user: {
      //   relation: Model.BelongsToOneRelation,
      //   modelClass: User,
      //   join: {
      //     from: 'listing.user_id',
      //     to: 'user.id'
      //   }
      // },
      listing_images: {
        relation: Model.HasManyRelation,
        modelClass: ListingImage,
        join: {
          from: 'listing.id',
          to: 'listing_image.listing_id'
        }
      },
      listing_cost: {
        relation: Model.HasOneRelation,
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
      }
    };
  }

  public async listingsPagination(limit: number, after: number, orderBy: any, filter: any) {
    const queryBuilder = ListingDAO.query().eager(eager);

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

      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder
          .from('listing')
          .leftJoin('listing_cost AS ld', 'ld.listing_id', 'listing.id')
          .where(function() {
            this.where(raw('LOWER(??) LIKE LOWER(?)', ['description', `%${filter.searchText}%`]))
              .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['title', `%${filter.searchText}%`]))
              .orWhere(raw('LOWER(??) LIKE LOWER(?)', ['ld.cost', `%${filter.searchText}%`]));
          });
      }
    }

    const allListings = camelizeKeys(await queryBuilder);
    const total = allListings.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    console.log(res);
    return { listings: res, total };
  }

  public async listing(id: number) {
    const res = camelizeKeys(
      await ListingDAO.query()
        .findById(id)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(query[0]);
    return res;
  }

  public async addListing(params: Listing) {
    const res = await ListingDAO.query().insertGraph(decamelizeKeys(params));
    return res.id;
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

  public async toggleListingIsActive(id: number, isActive: any) {
    return returnId(
      knex('listing')
        .where({ id })
        .update({ is_active: isActive })
    );
  }

  public async userListings(userId: number) {
    const res = camelizeKeys(
      await ListingDAO.query()
        .where('user_id', userId)
        .eager(eager)
        .orderBy('id', 'desc')
    );
    // console.log(query[0]);
    return res;
  }

  public async myListingBookmark(userId: number, limit: number, after: number) {
    const res = camelizeKeys(
      await ListingBookmark.query()
        .where('user_id', userId)
        .eager('[listing.[listing_images, listing_cost]]')
        .orderBy('id', 'desc')
        .limit(limit)
        .offset(after)
    );
    const allListings = res.map(item => {
      return item.listing;
    });
    const total = allListings.length;
    // console.log(res);
    return { listings: allListings, total };
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
    console.log('status1', status);
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

// ListingImage model.
class ListingImage extends Model {
  static get tableName() {
    return 'listing_image';
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
          from: 'listing_image.listing_id',
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
