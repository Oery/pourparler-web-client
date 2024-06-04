"use client";

import CategoryComponent from "./category";
import { useSelector } from "react-redux";
import { serversSelector } from "~/stores/servers";
import SideNavContextMenu from "~/app/components/context-menus/sidenav-cm";
import type { Category } from "~/app/_types/category";
import type { Server } from "~/app/_types/server";
import { useAuth } from "@clerk/nextjs";
import type { RootState } from "~/stores/_store";
import TextChannel from "./channel-text";
import VoiceChannel from "./channel-voice";

export default function SideNav({ serverId }: { serverId: string }) {
    const server = useSelector<RootState, Server[]>(serversSelector).find(
        (server) => server.id === serverId,
    )!;

    const channelsByCategory = server.categories.map((category: Category) => {
        const thisCategoryChannels = server.channels.filter(
            (channel) => channel.categoryId === category.id,
        );

        thisCategoryChannels.sort((a, b) => a.id.localeCompare(b.id));
        return { ...category, channels: thisCategoryChannels };
    });

    // Add a "No category" category
    const uncategorizedChannels = server.channels.filter(
        (channel) =>
            channel.categoryId === "00000000-0000-0000-0000-000000000000",
    );

    // TEMP FIX TO SORT CATEGORIES
    channelsByCategory.sort((a, b) => a.id.localeCompare(b.id));

    // TODO: Add Open/Close feature

    const { userId } = useAuth();
    const isAdmin = userId === server.ownerId;

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
