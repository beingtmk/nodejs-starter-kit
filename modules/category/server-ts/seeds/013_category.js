/* eslint-disable import/prefer-default-export */
import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { camelizeKeys, decamelizeKeys } from 'humps';

const CATEGORY = {
  title: `Category`,
  description: `Category description`,
  imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C`,

  subCategories: [
    {
      title: `Category`,
      description: `Category description`,
      imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C`,

      subCategories: [
        {
          title: `Category`,
          description: `Category description`,
          imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C`,

          subCategories: [
            {
              title: `Category`,
              description: `Category description`,
              imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C`
            },
            {
              title: `Category.2`,
              description: `Category description.2`,
              imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C`
            }
          ]
        },
        {
          title: `Category.2`,
          description: `Category description.2`,
          imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C`,

          subCategories: [
            {
              title: `Category`,
              description: `Category description`,
              imageUrl: `https://via.placeholder.com/300x300/141c1f?text=C`
            }
          ]
        }
      ]
    }
  ]
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
    [...Array(12).keys()].map(async i => {
      addCategory(CATEGORY, i + 1);
    })
  );
}
