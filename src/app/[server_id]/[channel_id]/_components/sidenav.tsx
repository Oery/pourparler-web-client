"use client";

import CategoryComponent from "./category";
import { useSelector } from "react-redux";
import { serversSelector } from "~/stores/servers";
import SideNavContextMenu from "~/app/components/context-menus/sidenav-cm";
import ChannelComponent from "./channel";

export default function SideNav({ serverId }: { serverId: string }) {
    const { categories, channels } = useSelector(serversSelector).find(
        (server) => server.id === serverId,
    )!;

    const channelsByCategory = categories.map((category: Category) => {
        const categoryChannels = channels.filter(
            (channel) => channel.categoryId === category.id,
        );

        categoryChannels.sort((a, b) => a.id.localeCompare(b.id));

        return {
            ...category,
            channels: categoryChannels,
        };
    });

    // Add a "No category" category
    const uncategorizedChannels = channels.filter(
        (channel) =>
            channel.categoryId === "00000000-0000-0000-0000-000000000000",
    );

    // TEMP FIX TO SORT CATEGORIES
    channelsByCategory.sort((a, b) => a.id.localeCompare(b.id));

    // TODO: Add Open/Close feature

    return (
        <SideNavContextMenu serverId={serverId}>
            <div className="flex h-screen w-52 flex-col gap-4 bg-stone-300 p-4">
                <div>
                    <h2 className="truncate">Château d&apos;Oery</h2>
                    {uncategorizedChannels.map((channel) => (
                        <ChannelComponent key={channel.id} channel={channel} />
                    ))}
                    {channelsByCategory.map((category) => (
                        <CategoryComponent
                            category={category}
                            key={category.id}
                        />
                    ))}
                </div>
            </div>
        </SideNavContextMenu>
    );
}
