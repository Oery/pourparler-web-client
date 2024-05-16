import type { Channel } from "./channel";
import type { Category } from "./category";

interface Server {
    id: string;
    name: string;
    channels: Channel[];
    categories: Category[];
    ownerId: string;
}

interface ServerEdit {
    id: string;
    name?: string;
}
