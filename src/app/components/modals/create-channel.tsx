"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Category } from "~/app/_types/category";
import { createChannel } from "~/app/actions/channel";
import { useSession } from "@clerk/nextjs";

interface Props {
    category: Category;
}

export default function CreateChannelModal({ category }: Props) {
    const [name, setName] = useState("");
    const { session } = useSession();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session) return;
        const formData = new FormData(e.currentTarget);
        const { data, error } = await createChannel(formData, session.id);
        if (error) return;
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
