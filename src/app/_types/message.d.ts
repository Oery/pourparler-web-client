import { type User } from "./user";

export interface Message {
    id: string;
    content: string;
    sendAt: Date;
    wasEdited?: boolean;
    channelId: string;
}

interface MessageWithAuthor extends Message {
    author: User;
}

export interface MessageEdit {
    id: string;
    content: string;
    editAt: string;
}

export interface SerializedMessage extends Message {
    // createdAt: string;
    sendAt: string;
    // editAt?: string;
}

interface SerializedMessageWithAuthor extends SerializedMessage {
    author: User;
}
