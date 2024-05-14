"use client";
import { useState } from "react";
import { createChannel } from "~/app/lib/actions/channels";

interface Props {
    serverId: string;
}

export default function ChannelInput({ serverId }: Props) {
    const [name, setName] = useState("");

    return (
        <form action={createChannel}>
            Channel Input
            <input type="hidden" name="type" value="text" />
            <input type="hidden" name="serverId" value={serverId} />
            <input
                type="hidden"
                name="categoryId"
                value="900a6f02-448d-42ca-89b0-65472dabb677"
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
    );
}
