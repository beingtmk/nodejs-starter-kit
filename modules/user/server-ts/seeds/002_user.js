import bcrypt from 'bcryptjs';
import { returnId, truncateTables } from '@gqlapp/database-server-ts';

export async function seed(knex) {
  await truncateTables(knex, Promise, [
    'user',
    'user_profile',
    'auth_certificate',
    'auth_facebook',
    'auth_github',
    'auth_linkedin'
  ]);

  const id = await returnId(knex('user')).insert({
    username: 'admin',
    email: 'admin@example.com',
    password_hash: await bcrypt.hash('admin123', 12),
    role: 'admin',
    is_active: true
  });
  await returnId(knex('user_profile')).insert({
    first_name: 'admin',
    last_name: 'admin',
    avatar: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1601659766/ko7mcmro5mei5xbaco93.jpg',
    mobile: '9999988888',
    user_id: 1
  });
  await returnId(
    knex('auth_certificate').insert({
      serial: 'admin-123',
      user_id: id[0]
    })
  );

  await returnId(knex('user')).insert({
    username: 'user',
    email: 'user@example.com',
    password_hash: await bcrypt.hash('user1234', 12),
    role: 'user',
    is_active: true
  });
  await returnId(knex('user_profile')).insert({
    first_name: 'user',
    last_name: 'user',
    avatar: 'https://res.cloudinary.com/nodejs-starter-kit/image/upload/v1601659766/ko7mcmro5mei5xbaco93.jpg',
    mobile: '9999988888',
    user_id: 2
  });
}
