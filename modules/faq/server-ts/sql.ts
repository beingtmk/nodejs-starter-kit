import { Model, raw } from "objection";
import { camelizeKeys, decamelizeKeys, decamelize } from "humps";
import { knex, returnId, orderedFor } from "@gqlapp/database-server-ts";
import { has } from "lodash";

// Give the knex object to objection.
Model.knex(knex);

export default class Faq extends Model {
  static get tableName() {
    return "faq";
  }

  static get idColumn() {
    return "id";
  }
  // Query functions

  public async faqs(limit: number, after: any, orderBy: any, filter: any) {
    const queryBuilder = Faq.query();
    if (orderBy && orderBy.column) {
      let column = orderBy.column;
      let order = "asc";
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(`faq.${column}`), order);
    }



    if (filter) {
      if (has(filter, "isFeatured") && filter.isFeatured !== false) {
        queryBuilder.where(function() {
          this.where("faq.is_featured", filter.isFeatured);
        });
      }
      if (has(filter, "searchText") && filter.searchText !== "") {
        queryBuilder
          // .from('events')
          // .leftJoin('listing_content AS ld', 'ld.listing_id', 'listing.id')
          .groupBy("faq.id")
          .where(function() {
            this.where(
              raw("LOWER(??) LIKE LOWER(?)", [
                "faq.question",
                `%${filter.searchText}%`,
              ])
            ).orWhere(
              raw("LOWER(??) LIKE LOWER(?)", [
                "faq.answer",
                `%${filter.searchText}%`,
              ])
            );
          });
      }
    }

    const allFaqItems = camelizeKeys(await queryBuilder);
    const total = allFaqItems.length;
    let res = {};

    if (limit && after) {
      res = camelizeKeys(
        await queryBuilder
          .limit(limit)
          .offset(after)
          .groupBy("faq.id")
      );
    } else if (limit && !after) {
      res = camelizeKeys(await queryBuilder.limit(limit).groupBy("faq.id"));
    } else if (!limit && after) {
      res = camelizeKeys(await queryBuilder.offset(after).groupBy("faq.id"));
    } else {
      res = camelizeKeys(await queryBuilder.groupBy("faq.id"));
    }
    return { faqItems: res, total: total };
  }

  public async faq(id: number) {
    // const res =
    return camelizeKeys(
      await Faq.query()
        .findById(id)

        .orderBy("id", "desc")
    );
  }

  // Mutation functions

  public async addFaq(params: any) {
    const res = await Faq.query().insertGraph(decamelizeKeys(params));
    // console.log('res', res);

    return res;
  }

  public async editFaq(params: any) {
    const res = await Faq.query().upsertGraph(decamelizeKeys(params));
    return res;
  }

  public deleteFaq(id: number) {
    return knex("faq")
      .where("id", "=", id)
      .del();
  }

  public async changeFeaturedStatus(id: number, status: boolean) {
    const isUpdated = await knex("faq")
      .where({ id })
      .update({ is_featured: status });
    return isUpdated;
  }
}
