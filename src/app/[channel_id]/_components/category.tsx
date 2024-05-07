import { useState } from "react";
import Channel from "./channel";
import { type Category } from "./definitions";

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
                    <Channel key={channel.id} channel={channel} />
                ))}
        </div>
    );
}
