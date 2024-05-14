import type { ChannelWithMessages } from "./channel";

export interface Server {
    id: string;
    name: string;
}

interface ServerWithChannels extends Server {
    channels: ChannelWithMessages[];
}
