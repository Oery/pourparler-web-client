import { type MessageWithAuthor } from "./message";

export interface Channel {
    id: string;
    name: string;
    type: "text" | "voice";
}

interface ChannelWithMessages extends Channel {
    messages: MessageWithAuthor[];
}
