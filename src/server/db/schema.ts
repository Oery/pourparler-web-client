// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
    index,
    pgEnum,
    pgTableCreator,
    serial,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `pourparler_${name}`);

export const channelsTypes = pgEnum("CHANNEL_TYPES", ["text", "voice"]);

export const channels = createTable(
    "channel",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        type: channelsTypes("type").notNull(),
        categoryId: serial("category_id"),
    },
    (example) => ({
        nameIndex: index("channel_idx").on(example.name),
    }),
);

export const messages = createTable(
    "message",
    {
        id: serial("id").primaryKey(),
        channelId: serial("channel_id").notNull(),
        content: varchar("content", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updatedAt", { withTimezone: true }),
        authorId: serial("author_id").notNull(),
    },
    (example) => ({
        channelIdIndex: index("message_idx").on(example.channelId),
    }),
);

export const categories = createTable(
    "category",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    },
    (example) => ({
        nameIndex: index("category_idx").on(example.name),
    }),
);

export const users = createTable(
    "user",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 256 }).notNull(),
        avatar_url: varchar("avatar_url", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    },
    (example) => ({
        nameIndex: index("user_idx").on(example.name),
    }),
);
