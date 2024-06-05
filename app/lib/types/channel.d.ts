import type { MessageWithAuthor, Message } from "@lib/types/message";

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

export interface VoiceChannel extends Channel {
    users: string[];
}

export interface VoiceChannelEvent {
    userId: string;
    channelId: string;
}
