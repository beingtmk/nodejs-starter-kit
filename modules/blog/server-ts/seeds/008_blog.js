import { returnId, truncateTables } from '@gqlapp/database-server-ts';
import { status } from '../constants';

export async function seed(knex) {
  await truncateTables(knex, Promise, ['model', 'blog']);

  await Promise.all(
    [...Array(10).keys()].map(async i => {
      return returnId(knex('model')).insert({
        name: `Model ${i + 1}`,
        desc: `Model description ${i + 1}`,
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yHrpo9HrvefMGkn6NSCwmVUDICnDMQYF79oFMl6Z316p-XwXAQ&s'
      });
    })
  );

  await Promise.all(
    [...Array(10).keys()].map(async i => {
      return returnId(knex('blog')).insert({
        title: `Blog ${i + 1}`,
        content:
          '<h2 class="md-block-header-two">What is Lorem Ipsum?</h2><p class="md-block-unstyled"><strong class="md-inline-bold">Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has <u class="md-inline-underline">been</u> the industry&#x27;s standard dummy text ever since the 1500s, <span class="md-inline-highlight">when</span> an unknown printer took a galle</p><ol class="md-block-ordered-list-item"><li>y of type <strong class="md-inline-bold"><em class="md-inline-italic">and</em></strong> scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem </li></ol><blockquote class="md-block-blockquote">Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</blockquote><h2 class="md-block-header-two">Why do we use it?</h2><ol class="md-block-ordered-list-item"><li>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &#x27;Content here, content here&#x27;, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</li></ol><div class="md-block-todo md-block-todo-unchecked"><input type=checkbox disabled /><p> for &#x27;lorem ipsum&#x27; will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div>',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yHrpo9HrvefMGkn6NSCwmVUDICnDMQYF79oFMl6Z316p-XwXAQ&s',
        model_id: Math.floor(Math.random() * 10) + 1,
        author_id: 1,
        status: status[Math.floor(Math.random() * 3)]
      });
    })
  );
}
