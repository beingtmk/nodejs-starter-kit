import { has } from 'lodash';
import { Model, raw } from 'objection';
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';

import { knex } from '@gqlapp/database-server-ts';
import { clientStorage } from '../../../packages/common/utils';

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
  isLeaf: boolean;
  isActive: boolean;
  // subCategories: [CategoryInput] | undefined;
}

const eager = '[sub_categories, modal_category]';
const allEager = '[sub_categories.^, modal_category]';
const noneEager = '[modal_category]';
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

  public async categoriesPagination(
    limit: number,
    after: number,
    orderBy: any,
    filter: any,
    childNode: string = 'single'
  ) {
    const queryBuilder = CategoryDAO.query()
      .eager(childNode === 'all' ? allEager : childNode === 'none' ? noneEager : eager)
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

  public async category(id: number, childNode: string = 'single') {
    const queryBuilder = CategoryDAO.query()
      .findById(id)
      .eager(childNode === 'all' ? allEager : childNode === 'none' ? noneEager : eager)
      .orderBy('id', 'desc');

    const res = camelizeKeys(await queryBuilder);
    // console.log(res);
    return res;
  }

  public async addCategory(params: CategoryInput) {
    const isLeaf = true;
    if (params.parentCategoryId !== null) {
      await CategoryDAO.query().upsertGraph(decamelizeKeys({ id: params.parentCategoryId, isLeaf: false }));
    }
    const res = camelizeKeys(
      await CategoryDAO.query().insertGraph(
        decamelizeKeys({
          title: params.title,
          description: params.description,
          imageUrl: params.imageUrl,
          parentCategoryId: params.parentCategoryId,
          isNavbar: params.isNavbar,
          isLeaf
        })
      )
    );
    await ModalCategory.query().insertGraph(decamelizeKeys({ modalName: params.modalName, categoryId: res.id }));
    return res.id;
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

  // if pid is nt same as prev -> pId = null, nt-null
  // if pid is same
  public async editCategory(params: CategoryInput & Identifier) {
    const prevCategory = camelizeKeys(
      await CategoryDAO.query()
        .findById(params.id)
        .eager(eager)
    );
    if (params.parentCategoryId !== prevCategory.parentCategoryId) {
      // before edit, parentCategory if nt-null to isLeaf to true if has only 1 leaf
      if (prevCategory.parentCategoryId !== null) {
        const parentCategory = camelizeKeys(
          await CategoryDAO.query()
            .findById(prevCategory.parentCategoryId)
            .eager(eager)
        );
        if (parentCategory.subCategories.length === 1) {
          await CategoryDAO.query().upsertGraph(decamelizeKeys({ id: parentCategory.id, isLeaf: true }));
        }
      }
      // after edit, parentCategory to isLeaf to false since adding a leaf to it
      if (params.parentCategoryId !== null) {
        await CategoryDAO.query().upsertGraph(decamelizeKeys({ id: params.parentCategoryId, isLeaf: false }));
      }
    }
    const res = camelizeKeys(
      await CategoryDAO.query().upsertGraph(
        decamelizeKeys({
          id: params.id,
          title: params.title,
          description: params.description,
          imageUrl: params.imageUrl,
          parentCategoryId: params.parentCategoryId,
          isNavbar: params.isNavbar,
          isActive: params.isActive
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
    const category = camelizeKeys(
      await CategoryDAO.query()
        .findById(id)
        .eager(eager)
    );
    if (category.parentCategoryId !== null) {
      const parentCategory = camelizeKeys(
        await CategoryDAO.query()
          .findById(category.parentCategoryId)
          .eager(eager)
      );
      if (parentCategory.subCategories.length === 1) {
        await CategoryDAO.query().upsertGraph(decamelizeKeys({ id: parentCategory.id, isLeaf: true }));
      }
    }
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
