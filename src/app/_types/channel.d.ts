import type { MessageWithAuthor, Message } from "./message";

export interface Channel {
    id: string;
    name: string;
    type: "text" | "voice";
    categoryId?: string;
    serverId: string;
    messages?: Message[];
    users?: string[];
}

export interface ChannelDelete {
    channelId: string;
}

export interface ChannelWithMessages extends Channel {
    messages: MessageWithAuthor[];
}
