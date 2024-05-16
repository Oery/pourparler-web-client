import { type User } from "./user";

interface Message {
    id: string;
    content: string;
    sendAt: Date;
    wasEdited?: boolean;
    channelId: string;
}

interface MessageWithAuthor extends Message {
    author: User;
}

interface MessageEdit {
    id: string;
    content: string;
    editAt: string;
}

interface SerializedMessage extends Message {
    // createdAt: string;
    sendAt: string;
    // editAt?: string;
}

interface SerializedMessageWithAuthor extends SerializedMessage {
    author: User;
}
