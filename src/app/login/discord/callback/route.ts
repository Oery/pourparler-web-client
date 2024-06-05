import { discord, lucia } from "~/app/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const storedState = cookies().get("discord_oauth_state")?.value ?? null;

    console.log("CODE", code);
    console.log("STATE", state);
    console.log("STORED STATE", storedState);

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, { status: 400 });
    }

    try {
        const tokens = await discord.validateAuthorizationCode(code);
        const discordUserResponse = await fetch(
            "https://discord.com/api/users/@me",
            { headers: { Authorization: `Bearer ${tokens.accessToken}` } },
        );

        const discordUser = (await discordUserResponse.json()) as DiscordUser;
        console.log("DISCORD USER", discordUser);
        const existingUser = await db.query.users.findFirst({
            where: (users, { eq }) =>
                eq(users.discordId, discordUser.id.toString()),
        });

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );
            return new Response(null, {
                status: 302,
                headers: { Location: "/" },
            });
        }

        const [user] = await db
            .insert(users)
            .values({
                discordId: discordUser.id.toString(),
                username: discordUser.username,
                displayName: discordUser.global_name,
                avatarUrl: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp?size=128`,
            })
            .returning({ id: users.id });

        if (!user) throw new Error("User was not created");

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return new Response(null, { status: 302, headers: { Location: "/" } });
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            return new Response(null, { status: 400 });
        }

        console.error(e);

        return new Response(null, { status: 500 });
    }
}

interface DiscordUser {
    id: number;
    username: string;
    global_name: string;
    avatar: string;
}
