"use client";

import { useState } from "react";
import ChannelComponent from "./channel";
import { useSelector } from "react-redux";
import CreateChannelModal from "~/app/components/modals/create-channel";
import type { Category } from "~/app/_types/category";
import { channelsSelector } from "~/stores/channels";

interface Props {
    category: Category;
}

export default function CategoryComponent({ category }: Props) {
    const [showChannels, setShowChannels] = useState(true);

    const channels = useSelector(channelsSelector).filter(
        (channel) => channel.categoryId === category.id,
    );

    return (
        <div className="flex select-none flex-col gap-2 pt-2">
            <div className="flex justify-between text-xs">
                <div
                    onClick={() => setShowChannels(!showChannels)}
                    className="cursor-pointer transition-all hover:text-stone-500"
                >
                    {category.name.toUpperCase()}
                </div>

                {isAdmin() && <CreateChannelModal category={category} />}
            </div>

            {showChannels &&
                channels.map((channel) => (
                    <ChannelComponent key={channel.id} channel={channel} />
                ))}
        </div>
    );
}
