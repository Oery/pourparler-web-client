import { type MessageWithAuthor } from "./message";

interface Channel {
    id: string;
    name: string;
    type: "text" | "voice";
    categoryId?: string;
    serverId: string;
    messages?: Message[];
}

interface ChannelDelete {
    channelId: string;
    serverId: string;
}

interface ChannelWithMessages extends Channel {
    messages: MessageWithAuthor[];
}
