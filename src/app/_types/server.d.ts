import type { ChannelWithMessages } from "./channel";

export interface Server {
    id: number;
    name: string;
    createdAt: Date;
}

interface ServerWithChannels extends Server {
    channels: ChannelWithMessages[];
}
