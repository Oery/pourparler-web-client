import type { Category } from "./category";

export interface Server {
    id: string;
    name: string;
    categories: Category[];
    ownerId: string;
}

export interface ServerEdit {
    id: string;
    name?: string;
}
