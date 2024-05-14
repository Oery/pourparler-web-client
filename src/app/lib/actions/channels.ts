"use server";

import { db } from "~/server/db";
import { channels } from "~/server/db/schema";

import isAdmin from "../admin";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { redirect } from "next/navigation";

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
        .returning({ id: channels.id });

    if (!results[0]) return { message: "Channel creation failed" };

    console.log("Channel created");
    console.log(results[0].id);

    // revalidatePath(`/${serverId}/`);
    redirect(`/${serverId}/${results[0].id}`);
}

const deleteChannelSchema = z.object({
    id: z.coerce.string(),
    serverId: z.coerce.string(),
});

export async function deleteChannel(formData: FormData) {
    console.log("Deleting channel");

    const { id, serverId } = deleteChannelSchema.parse({
        id: formData.get("id"),
        serverId: formData.get("serverId"),
    });

    if (!(await isAdmin(serverId))) return { message: "You must be an admin" };

    try {
        console.log("Deleting channel");
        await db.delete(channels).where(eq(channels.id, id));
        console.log("Channel deleted");
    } catch (error) {
        console.log(error);
        return { message: "Channel deletion failed" };
    }

    revalidatePath(`/${serverId}/`);
    redirect(`/${serverId}/`);
}
