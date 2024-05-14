// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
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

export const servers = createTable(
    "server",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        ownerId: varchar("owner_id", { length: 256 }),
    },
    (example) => ({
        nameIndex: index("server_idx").on(example.name),
    }),
);

export const serversRelations = relations(servers, ({ one, many }) => ({
    channels: many(channels),
    owner: one(users, {
        fields: [servers.ownerId],
        references: [users.id],
    }),
}));

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
        serverId: serial("server_id"),
    },
    (example) => ({
        nameIndex: index("channel_idx").on(example.name),
    }),
);

export const channelsRelations = relations(channels, ({ one, many }) => ({
    server: one(servers, {
        fields: [channels.serverId],
        references: [servers.id],
    }),
    messages: many(messages),
}));

export const messages = createTable(
    "message",
    {
        id: serial("id").primaryKey(),
        channelId: serial("channel_id").notNull(),
        content: varchar("content", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true }),
        sendAt: timestamp("send_at", { withTimezone: true }).notNull(),
        authorId: varchar("author_id", { length: 256 }).notNull(),
    },
    (example) => ({
        channelIdIndex: index("message_idx").on(example.channelId),
    }),
);

export const messagesRelations = relations(messages, ({ one }) => ({
    author: one(users, {
        fields: [messages.authorId],
        references: [users.id],
    }),
    channel: one(channels, {
        fields: [messages.channelId],
        references: [channels.id],
    }),
}));

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
        id: varchar("id", { length: 256 }).primaryKey().unique(),
        name: varchar("name", { length: 256 }).notNull(),
        avatarUrl: varchar("avatar_url", { length: 256 }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        discordId: varchar("discord_id", { length: 256 }).notNull(),
    },
    (example) => ({
        nameIndex: index("user_idx").on(example.name),
    }),
);
