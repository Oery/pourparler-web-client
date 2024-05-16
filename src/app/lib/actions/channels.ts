"use server";

import { db } from "~/server/db";
import { channels } from "~/server/db/schema";

import isAdmin from "../admin";
import { eq } from "drizzle-orm";
import { z } from "zod";

const createChannelSchema = z.object({
    name: z.coerce.string(),
    type: z.enum(["text", "voice"]),
    serverId: z.coerce.string(),
    categoryId: z.coerce.string(),
});

export async function createChannel(formData: FormData) {
    const { serverId, name, type, categoryId } = createChannelSchema.parse({
        serverId: formData.get("serverId"),
        name: formData.get("name"),
        type: formData.get("type"),
        categoryId: formData.get("categoryId"),
    });

    console.log("Validating form data");

    if (!name || !serverId || !categoryId)
        return { message: "Missing arguments" };
    if (!(await isAdmin(serverId))) return { message: "You must be an admin" };

    // check if channel already exists or has same name

    console.log("Creating channel");

    const results = await db
        .insert(channels)
        .values({ name, type, serverId, categoryId })
        .returning({
            id: channels.id,
            name: channels.name,
            type: channels.type,
            serverId: channels.serverId,
            categoryId: channels.categoryId,
        });

    if (!results[0]) return { message: "Channel creation failed" };

    fetch("http://localhost:8000/event/channel/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WEBSOCKET_API_KEY}`,
        },
        body: JSON.stringify(results[0]),
    }).catch((error) => console.log(error));

    return { data: results[0] };
}

const deleteChannelSchema = z.object({
    channelId: z.coerce.string(),
    serverId: z.coerce.string(),
});

export async function deleteChannel(formData: FormData) {
    console.log("Deleting channel");

    const startTotalTime = Date.now();
    const startParseSchemaTime = Date.now();

    const { channelId, serverId } = deleteChannelSchema.parse({
        channelId: formData.get("channelId"),
        serverId: formData.get("serverId"),
    });

    const endParseSchemaTime = Date.now();
    console.log(
        `Schema parsed in ${endParseSchemaTime - startParseSchemaTime}ms`,
    );

    const startIsAdminTime = Date.now();
    console.log("Checking admin status");

    if (!(await isAdmin(serverId))) return { message: "You must be an admin" };

    const endIsAdminTime = Date.now();
    console.log(
        `Admin check completed in ${endIsAdminTime - startIsAdminTime}ms`,
    );

    try {
        console.log("Deleting channel");
        const startDbDeleteTime = Date.now();
        await db.delete(channels).where(eq(channels.id, channelId));
        const endDbDeleteTime = Date.now();
        console.log(
            `Channel deleted in ${endDbDeleteTime - startDbDeleteTime}ms`,
        );
    } catch (error) {
        console.log(error);
        return { message: "Channel deletion failed" };
    }

    console.log("Starting to send delete event");
    const startEventPostTime = Date.now();

    fetch("http://localhost:8000/event/channel/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.WEBSOCKET_API_KEY}`,
        },
        body: JSON.stringify({ channelId, serverId }),
    }).catch((error) => console.log(error));

    const endEventPostTime = Date.now();
    console.log(
        `Delete event posted in ${endEventPostTime - startEventPostTime}ms`,
    );

    const endTotalTime = Date.now();
    console.log(`Total time taken: ${endTotalTime - startTotalTime}ms`);
}
