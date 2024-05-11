export interface User {
    id: number;
    name: string;
    avatarUrl: string;
}

export interface Channel {
    id: number;
    name: string;
    type: "text" | "voice";
}

export interface Category {
    name: string;
    channels: Channel[];
}

export interface Message {
    id: number;
    content: string;
    createdAt: Date;
    sendAt: Date;
}

interface MessageWithAuthor extends Message {
    author: User;
}

interface ChannelWithMessages extends Channel {
    messages: MessageWithAuthor[];
}
