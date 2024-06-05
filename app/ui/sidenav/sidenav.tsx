"use client";

import type { Category } from "@lib/types/category";
import { appStateSelector } from "@stores/app-state";
import { channelsSelector } from "@stores/channels";
import { serversSelector } from "@stores/servers";
import SideNavContextMenu from "@ui/context-menus/sidenav-cm";
import CategoryComponent from "@ui/sidenav/category";
import TextChannel from "@ui/sidenav/channel-text";
import VoiceChannel from "@ui/sidenav/channel-voice";
import { useSelector } from "react-redux";

export default function SideNav({ serverId }: { serverId: string }) {
    const server = useSelector(serversSelector).find(
        (server) => server.id === serverId,
    )!;

    const channels = useSelector(channelsSelector);
    const { user } = useSelector(appStateSelector);

    const channelsByCategory = server.categories.map((category: Category) => {
        const thisCategoryChannels = channels.filter(
            (channel) => channel.categoryId === category.id,
        );

        thisCategoryChannels.sort((a, b) => a.id.localeCompare(b.id));
        return { ...category, channels: thisCategoryChannels };
    });

    // Add a "No category" category
    const uncategorizedChannels = channels.filter(
        (channel) =>
            channel.categoryId === "00000000-0000-0000-0000-000000000000",
    );

    // TEMP FIX TO SORT CATEGORIES
    channelsByCategory.sort((a, b) => a.id.localeCompare(b.id));

    // TODO: Add Open/Close feature

    const isAdmin = user?.id === server.ownerId;

    return (
        <SideNavContextMenu serverId={serverId} isAdmin={isAdmin}>
            <div className="flex h-screen w-52 flex-col gap-4 bg-stone-300 p-4">
                <div>
                    <h2 className="truncate">{server.name}</h2>
                    {uncategorizedChannels.map((channel) =>
                        channel.type === "voice" ? (
                            <VoiceChannel
                                key={channel.id}
                                channel={channel}
                                isAdmin={isAdmin}
                            />
                        ) : (
                            <TextChannel
                                key={channel.id}
                                channel={channel}
                                isAdmin={isAdmin}
                            />
                        ),
                    )}
                    {channelsByCategory.map((category) => (
                        <CategoryComponent
                            category={category}
                            key={category.id}
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            </div>
        </SideNavContextMenu>
    );
}
