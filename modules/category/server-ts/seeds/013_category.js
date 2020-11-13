/* eslint-disable import/prefer-default-export */
import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { camelizeKeys, decamelizeKeys } from 'humps';

let CATEGORIES = {
  title: `Category`,
  description: `Category description`,
  imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
  isNavbar: true

  // subCategories: [
  // {
  //   title: `Category`,
  //   description: `Category description`,
  //   imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
  // }
  // ]
};

const CATEGORY = {
  title: `Category`,
  description: `Category description`,
  imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
  isNavbar: true
};

export async function seed(knex) {
  await truncateTables(knex, Promise, ['category', 'modal_category']);
  async function add(obj) {
    return await returnId(knex('category')).insert(decamelizeKeys(obj));
  }

  async function addCategory(parentCategory, i) {
    try {
      const { title, description, imageUrl, subCategories, parentCategoryId } = parentCategory;
      const parentId = camelizeKeys(
        await add({
          title: `${title}${i}`,
          description: `${description}${i}`,
          imageUrl: `${imageUrl}${i}`,
          parentCategoryId
        })
      )[0];
      subCategories &&
        subCategories.length > 0 &&
        subCategories.map(async (c, ci) => {
          await addCategory(
            {
              title: c.title,
              description: c.description,
              imageUrl: c.imageUrl,
              subCategories: c.subCategories,
              parentCategoryId: parentId
            },
            `${i}.${ci + 1}`
          );
        });
      return true;
    } catch (e) {
      throw Error(e);
    }
  }

  await Promise.all(
    [...Array(6).keys()].map(async i => {
      CATEGORIES['subCategories'] = [...Array(Math.floor(Math.random() * (15 - 5 + 1) + 5)).keys()].map(() => CATEGORY);
      addCategory(CATEGORIES, i + 1);
    })
  );
}
