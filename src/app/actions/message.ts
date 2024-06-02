"use client";

import { deleteMessageSchema } from "~/server/db/schema";

async function deleteMessage(formData: FormData, sessionId: string) {
    const { id } = deleteMessageSchema.parse({
        id: formData.get("messageId"),
    });

    try {
        await fetch("http://localhost:8000/event/message", {
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
        return { error: "Message deletion failed" };
    }
}

export { deleteMessage };
