'use client';

import { deleteMessageSchema } from '@lib/db/schema';
import { apiUrl } from '@lib/requests/api';

async function deleteMessage(formData: FormData, sessionId: string) {
    const { id } = deleteMessageSchema.parse({
        id: formData.get('messageId'),
    });

    try {
        await fetch(`${apiUrl}/event/message`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionId}`,
            },
            body: JSON.stringify({ id }),
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Message deletion failed' };
    }
}

export { deleteMessage };
