"use client";

import { createChannel } from "@lib/requests/channel";
import type { Category } from "@lib/types/category";
import { appStateSelector } from "@stores/app-state";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@ui/shadcn/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
    category: Category;
}

export default function CreateChannelModal({ category }: Props) {
    const [name, setName] = useState("");
    const { session } = useSelector(appStateSelector);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session) return;
        const formData = new FormData(e.currentTarget);
        const { data, error } = await createChannel(formData, session.id);
        if (error ?? !data) return;
        router.push(`/${category.serverId}/${data.channelId}`);
    };

    return (
        <Dialog>
            <DialogTrigger className="cursor-pointer text-xs transition-all hover:text-stone-500">
                +
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Channel</DialogTitle>
                    <DialogDescription>
                        The new channel will be created in {category.name}
                    </DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input type="hidden" name="type" value="text" />
                    <input
                        type="hidden"
                        name="serverId"
                        value={category.serverId}
                    />
                    <input
                        type="hidden"
                        name="categoryId"
                        value={category.id}
                    />
                    <input
                        type="text"
                        placeholder="Channel name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit">Create</button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
