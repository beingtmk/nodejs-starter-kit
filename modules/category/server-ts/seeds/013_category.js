// /* eslint-disable import/prefer-default-export */
// import { returnId, truncateTables } from '@gqlapp/database-server-ts';
// import { camelizeKeys, decamelizeKeys } from 'humps';
// import { MODAL } from '@gqlapp/review-common';

// let CATEGORIES = {
//   title: `Category`,
//   description: `Category description`,
//   imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
//   isNavbar: true,
//   isLeaf: false

//   // subCategories: [
//   // {
//   //   title: `Category`,
//   //   description: `Category description`,
//   //   imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
//   // }
//   // ]
// };

// const LEAF_CATEGORY = {
//   title: `Category`,
//   description: `Category description`,
//   imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
//   isNavbar: true,
//   isLeaf: true
// };

// export async function seed(knex) {
//   await truncateTables(knex, Promise, ['category', 'modal_category']);
//   async function add(obj) {
//     const res = await returnId(knex('category')).insert(decamelizeKeys(obj));
//     await returnId(knex('modal_category')).insert(decamelizeKeys({ modalName: MODAL[1].value, categoryId: res[0] }));
//     return res;
//   }

//   async function addCategory(parentCategory, i) {
//     try {
//       const { title, description, imageUrl, isNavbar, subCategories, parentCategoryId, isLeaf } = parentCategory;
//       const parentId = camelizeKeys(
//         await add({
//           title: `${title}${i}`,
//           description: `${description}${i}`,
//           imageUrl: `${imageUrl}${i}`,
//           isNavbar,
//           parentCategoryId,
//           isLeaf
//         })
//       )[0];
//       subCategories &&
//         subCategories.length > 0 &&
//         subCategories.map(async (c, ci) => {
//           await addCategory(
//             {
//               title: c.title,
//               description: c.description,
//               imageUrl: c.imageUrl,
//               isNavbar,
//               subCategories: c.subCategories,
//               parentCategoryId: parentId,
//               isLeaf: c.isLeaf
//             },
//             `${i}.${ci + 1}`
//           );
//         });
//       return true;
//     } catch (e) {
//       throw Error(e);
//     }
//   }

//   await Promise.all(
//     [...Array(6).keys()].map(async i => {
//       CATEGORIES['subCategories'] = [...Array(Math.floor(Math.random() * (15 - 5 + 1) + 5)).keys()].map(
//         () => LEAF_CATEGORY
//       );
//       addCategory(CATEGORIES, i + 1);
//     })
//   );
// }

/* eslint-disable import/prefer-default-export */
import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { MODAL } from '@gqlapp/review-common';

let CATEGORIES = {
  title: `Category`,
  description: `Category description`,
  imageUrl: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1602334464/ptmv3x5mms7lqizjmflf.png',
  // imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
  isNavbar: true,
  isLeaf: false

  // subCategories: [
  // {
  //   title: `Category`,
  //   description: `Category description`,
  //   imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
  // }
  // ]
};

const LEAF_CATEGORY = {
  title: `Category`,
  description: `Category description`,
  imageUrl: 'http://res.cloudinary.com/nodejs-starter-kit/image/upload/v1607606932/zlj3vwpx898vwkfx7309.png',
  // imageUrl: `https://via.placeholder.com/90x90/141c1f?text=C`,
  isNavbar: true,
  isLeaf: true
};

export async function seed(knex) {
  await truncateTables(knex, Promise, ['category', 'modal_category']);
  async function add(obj) {
    const res = await returnId(knex('category')).insert(decamelizeKeys(obj));
    await returnId(knex('modal_category')).insert(decamelizeKeys({ modalName: MODAL[1].value, categoryId: res[0] }));
    return res;
  }

  async function addCategory(parentCategory, i) {
    try {
      const { title, description, imageUrl, isNavbar, subCategories, parentCategoryId, isLeaf } = parentCategory;
      const parentId = camelizeKeys(
        await add({
          title: `${title}${i}`,
          description: `${description}${i}`,
          // imageUrl: `${imageUrl}${i}`,
          imageUrl,
          isNavbar,
          parentCategoryId,
          isLeaf
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
              isNavbar,
              subCategories: c.subCategories,
              parentCategoryId: parentId,
              isLeaf: c.isLeaf
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
      CATEGORIES['subCategories'] = [...Array(Math.floor(Math.random() * (15 - 5 + 1) + 5)).keys()].map(
        () => LEAF_CATEGORY
      );
      addCategory(CATEGORIES, i + 1);
    })
  );
}
