import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex } from '@gqlapp/database-server-ts';

Model.knex(knex);

export interface Identifier {
  id: number;
}

export interface CategoryInput {
  modalName: string;

  title: string;
  imageUrl: string;
  description: string;
  isNavbar: boolean;
  parentCategoryId: number;

  // subCategories: [CategoryInput] | undefined;
}

const eager = '[sub_categories, modal_category]';
// const eager = '[category]';

export default class CategoryDAO extends Model {
  private id: any;

  static get tableName() {
    return 'category';
  }

  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    return {
      sub_categories: {
        relation: Model.HasManyRelation,
        modelClass: CategoryDAO,
        join: {
          from: 'category.id',
          to: 'category.parent_category_id'
        }
      },
      modal_category: {
        relation: Model.HasOneRelation,
        modelClass: ModalCategory,
        join: {
          from: 'category.id',
          to: 'modal_category.category_id'
        }
      }
    };
  }

  public async categoriesPagination(limit: number, after: number, orderBy: any, filter: any, userId: number) {
    const queryBuilder = CategoryDAO.query()
      .eager(eager)
      .where('category.parent_category_id', null);

    if (orderBy && orderBy.column) {
      const column = orderBy.column;
      let order = 'asc';
      if (orderBy.order) {
        order = orderBy.order;
      }

      queryBuilder.orderBy(decamelize(column), order);
    } else {
      queryBuilder.orderBy('category.id', 'desc');
    }

    if (filter) {
      if (has(filter, 'isActive') && filter.isActive !== '') {
        queryBuilder.where(function() {
          this.where('category.is_active', filter.isActive);
        });
      }
      if (has(filter, 'isNavbar') && filter.isNavbar !== '') {
        queryBuilder.where(function() {
          this.where('category.is_navbar', filter.isNavbar);
        });
      }
      if (has(filter, 'modalName') && filter.modalName !== '') {
        queryBuilder.where(function() {
          this.where('modal_category.modal_name', filter.modalName);
        });
      }
      if (has(filter, 'searchText') && filter.searchText !== '') {
        queryBuilder.where(function() {
          this.where(raw('LOWER(??) LIKE LOWER(?)', ['category.title', `%${filter.searchText}%`]));
        });
      }
    }

    queryBuilder.from('category').leftJoin('modal_category', 'modal_category.category_id', 'category.id');

    const allcategories = camelizeKeys(await queryBuilder);
    const total = allcategories.length;
    const res = camelizeKeys(await queryBuilder.limit(limit).offset(after));
    // console.log(res);
    return {
      categories: res,
      total
    };
  }

  public async category(id: number) {
    const queryBuilder = CategoryDAO.query()
      .findById(id)
      .eager(eager)
      .orderBy('id', 'desc');

    const res = camelizeKeys(await queryBuilder);
    // console.log(res);
    return res;
  }

  public async addCategory(params: CategoryInput) {
    const res = camelizeKeys(
      await CategoryDAO.query().insertGraph(
        decamelizeKeys({
          title: params.title,
          description: params.description,
          imageUrl: params.imageUrl,
          parentCategoryId: params.parentCategoryId,
          isNavbar: params.isNavbar
        })
      )
    );
    await ModalCategory.query().insertGraph(decamelizeKeys({ modalName: params.modalName, categoryId: res.id }));
    return res;
  }

  // public async addCategories(parentCategory: CategoryInput) {
  //   const { title, description, isNavbar, imageUrl, subCategories, parentCategoryId } = parentCategory;
  //   const parentId = await this.addCategory({
  //     title,
  //     description,
  //     imageUrl,
  //     isNavbar,
  //     parentCategoryId
  //   });
  //   if (subCategories) {
  //     subCategories.map(async c => {
  //       await this.addCategories({
  //         title: c.title,
  //         description: c.description,
  //         imageUrl: c.imageUrl,
  //         isNavbar: c.isNavbar,
  //         subCategories: c.subCategories,
  //         parentCategoryId: parentId
  //       });
  //     });
  //   }
  //   return true;
  // }

  public async editCategory(params: CategoryInput & Identifier) {
    const res = camelizeKeys(
      await CategoryDAO.query().upsertGraph(
        decamelizeKeys({
          id: params.id,
          title: params.title,
          description: params.description,
          imageUrl: params.imageUrl,
          parentCategoryId: params.parentCategoryId,
          isNavbar: params.isNavbar
        })
      )
    );
    const modalCategory = camelizeKeys(await ModalCategory.query().where('category_id', res.id));
    if (modalCategory && modalCategory.length > 0) {
      await ModalCategory.query().upsertGraph(decamelizeKeys({ id: modalCategory[0].id, modalName: params.modalName }));
    } else {
      await ModalCategory.query().insertGraph(decamelizeKeys({ modalName: params.modalName, categoryId: res.id }));
    }
    return res.id;
  }

  public async deleteCategory(id: number) {
    return knex('category')
      .where('id', '=', id)
      .del();
  }
}

// ModalCategory model.
class ModalCategory extends Model {
  static get tableName() {
    return 'modal_category';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: CategoryDAO,
        join: {
          from: 'modal_category.category_id',
          to: 'category.id'
        }
      }
    };
  }
}
