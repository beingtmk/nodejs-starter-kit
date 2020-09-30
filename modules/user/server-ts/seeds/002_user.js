import bcrypt from "bcryptjs";
import { returnId, truncateTables } from "@gqlapp/database-server-ts";

export async function seed(knex) {
  await truncateTables(knex, Promise, [
    "user",
    "user_profile",
    "auth_certificate",
    "auth_facebook",
    "auth_github",
    "auth_linkedin",
  ]);

  const id = await returnId(knex("user")).insert({
    username: "admin",
    email: "admin@example.com",
    password_hash: await bcrypt.hash("admin123", 12),
    role: "admin",
    is_active: true,
  });

  await returnId(knex("user_profile")).insert({
    user_id: id[0],
    first_name: "admin-firstname",
    last_name: "admin-lastname",
    avatar: "https://picsum.photos/id/1005/300/300",
  });

  await returnId(
    knex("auth_certificate").insert({
      serial: "admin-123",
      user_id: id[0],
    })
  );

  const uId = await returnId(knex("user")).insert({
    username: "user",
    email: "user@example.com",
    password_hash: await bcrypt.hash("user1234", 12),
    role: "user",
    is_active: true,
  });

  await returnId(knex("user_profile")).insert({
    user_id: uId[0],
    first_name: `user-firstname`,
    last_name: `user-lastname`,
    avatar: "https://picsum.photos/id/1005/300/300",
  });

  await Promise.all(
    [...Array(10).keys()].map(async (i) => {
      const id1 = await returnId(knex("user")).insert({
        username: `user${i + 1}`,
        email: `user${i + 1}@example.com`,
        password_hash: await bcrypt.hash("user1234", 12),
        role: "user",
        is_active: true,
      });
      await returnId(knex("user_profile")).insert({
        user_id: id1[0],
        first_name: `user${i + 1}-firstname`,
        last_name: `user${i + 1}-lastname`,
        avatar: "https://picsum.photos/id/1005/300/300",
      });
    })
  );
}