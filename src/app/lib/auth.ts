import { Lucia, type Session } from "lucia";

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "~/server/db";
import { sessions, users } from "~/server/db/schema";

import { Discord } from "arctic";
import { cache } from "react";
import { cookies } from "next/headers";
import type { User } from "../_types/user";

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: { secure: process.env.NODE_ENV === "production" },
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
    }
}

export const discord = new Discord(
    process.env.DISCORD_CLIENT_ID!,
    process.env.DISCORD_CLIENT_SECRET!,
    "http://localhost:3000/login/discord/callback",
);

export const validateRequest = cache(
    async (): Promise<
        { user: User; session: Session } | { user: null; session: null }
    > => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) return { user: null, session: null };

        const result = (await lucia.validateSession(sessionId)) as {
            user: User;
            session: Session;
        };

        try {
            if (result.session?.fresh) {
                const sessionCookie = lucia.createSessionCookie(
                    result.session.id,
                );
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes,
                );
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(
                    sessionCookie.name,
                    sessionCookie.value,
                    sessionCookie.attributes,
                );
            }
            if (result.session) {
                const ppUser = await db.query.users.findFirst({
                    where: (users, { eq }) => eq(users.id, result.user.id),
                    columns: { createdAt: false },
                });
                result.user = { ...result.user, ...ppUser };
            }
        } catch (e) {
            console.error(e);
        }

        return result;
    },
);
