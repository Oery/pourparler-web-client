import { type User } from "./user";

export interface Message {
    id: number;
    content: string;
    sendAt: Date;
    wasEdited?: boolean;
    channelId: number;
}

interface MessageWithAuthor extends Message {
    author: User;
}

export interface MessageEdit {
    id: number;
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
