import { type User } from "./user";

export interface Message {
    id: number;
    content: string;
    createdAt: Date;
    sendAt: Date;
}

interface MessageWithAuthor extends Message {
    author: User;
}
