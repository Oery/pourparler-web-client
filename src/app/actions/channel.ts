"use client";

import {
    createChannelSchema,
    deleteChannelSchema,
} from "../../server/db/schema";

async function createChannel(formData: FormData, sessionId: string) {
    const { serverId, name, type, categoryId } = createChannelSchema.parse({
        serverId: formData.get("serverId"),
        name: formData.get("name"),
        type: formData.get("type"),
        categoryId: formData.get("categoryId"),
    });

    try {
        const response = await fetch("http://localhost:8000/event/channel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionId}`,
            },
            body: JSON.stringify({ serverId, name, type, categoryId }),
        });
        return { data: await response.json() };
    } catch (error) {
        console.error(error);
        return { error: "Channel creation failed" };
    }
}

async function deleteChannel(formData: FormData, sessionId: string) {
    const { id } = deleteChannelSchema.parse({
        id: formData.get("channelId"),
    });

    try {
        await fetch("http://localhost:8000/event/channel", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionId}`,
            },
            body: JSON.stringify({ id }),
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Channel deletion failed" };
    }
}

export { createChannel, deleteChannel };
