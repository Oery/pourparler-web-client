"use client";

import { createChannel } from "~/app/lib/actions/channels";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addChannel } from "~/stores/servers";
import { useRouter } from "next/navigation";
import { Category } from "~/app/_types/category";

interface Props {
    category: Category;
}

export default function CreateChannelModal({ category }: Props) {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await createChannel(formData);
        if (!result) return;
        const { message, data } = result;
        if (message ?? !data) {
            console.error(message);
            return;
        }
        dispatch(addChannel(data));
        router.push(`/${category.serverId}/${data.id}`);
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
