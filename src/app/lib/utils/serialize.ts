import type { Message, SerializedMessage } from "~/app/_types/message";

export function serializeMessage(message: Message): SerializedMessage {
    return {
        ...message,
        sendAt:
            typeof message.sendAt == "string"
                ? message.sendAt
                : message.sendAt.toISOString(),
    };
}
