import type {
    MessageWithAuthor,
    SerializedMessageWithAuthor,
} from "~/app/_types/message";

export function serializeMessage(
    message: MessageWithAuthor,
): SerializedMessageWithAuthor {
    return {
        ...message,
        sendAt:
            typeof message.sendAt == "string"
                ? message.sendAt
                : message.sendAt.toISOString(),
    };
}
