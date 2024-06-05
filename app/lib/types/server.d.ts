import type { Category } from "@lib/types/category";

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
