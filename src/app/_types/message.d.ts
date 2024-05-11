import { type User } from "./user";

export interface Message {
    id: number;
    content: string;
    createdAt: Date;
    sendAt: Date;
    wasEdited?: boolean;
    editAt?: Date;
    channelId: number;
}

interface MessageWithAuthor extends Message {
    author: User;
}

export interface MessageEdit {
    id: number;
    content: string;
    editAt: Date;
}
