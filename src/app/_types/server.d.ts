import type { ChannelWithMessages } from "./channel";

export interface Server {
    id: number;
    name: string;
}

interface ServerWithChannels extends Server {
    channels: ChannelWithMessages[];
}
