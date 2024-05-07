export interface Channel {
    id: number;
    name: string;
    type: "text" | "voice";
}

export interface Category {
    name: string;
    channels: Channel[];
}
