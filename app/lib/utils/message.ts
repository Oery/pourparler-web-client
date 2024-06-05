'use client';

import type { Message, SerializedMessage } from '@lib/types/message';

export function removeUselessNewlines(message: string) {
    return message.replace(/^\n+|\n+$/g, '');
}

export function serializeMessage(message: Message): SerializedMessage {
    return {
        ...message,
        sendAt:
            typeof message.sendAt == 'string'
                ? message.sendAt
                : message.sendAt.toISOString(),
    };
}
