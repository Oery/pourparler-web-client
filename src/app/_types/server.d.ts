import type { Channel } from "./channel";
import type { Category } from "./category";

export interface Server {
    id: string;
    name: string;
    channels: Channel[];
    categories: Category[];
    ownerId: string;
}

export interface ServerEdit {
    id: string;
    name?: string;
}
