import { useState } from "react";
import { type Category } from "./definitions";
import ChannelComponent from "./channel";

interface Props {
    category: Category;
}

export default function CategoryComponent({ category }: Props) {
    const [showChannels, setShowChannels] = useState(false);

    return (
        <div className="flex select-none flex-col gap-2 pt-2">
            <div
                onClick={() => setShowChannels(!showChannels)}
                className="cursor-pointer text-xs transition-all hover:text-stone-500"
            >
                {category.name.toUpperCase()}
            </div>

            {showChannels &&
                category.channels.map((channel) => (
                    <ChannelComponent key={channel.id} channel={channel} />
                ))}
        </div>
    );
}
