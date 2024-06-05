'use client';

import type { Category } from '@lib/types/category';
import { channelsSelector } from '@stores/channels';
import CreateChannelModal from '@ui/modals/create-channel';
import TextChannel from '@ui/sidenav/channel-text';
import VoiceChannel from '@ui/sidenav/channel-voice';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface Props {
    category: Category;
    isAdmin: boolean;
}

const channelTypeMap = {
    text: TextChannel,
    voice: VoiceChannel,
} as const;

export default function CategoryComponent({ category, isAdmin }: Props) {
    const [showChannels, setShowChannels] = useState(true);

    const channels = useSelector(channelsSelector).filter(
        (channel) => channel.categoryId === category.id,
    );

    return (
        <div className='flex select-none flex-col gap-2 pt-2'>
            <div className='flex justify-between text-xs'>
                <div
                    onClick={() => setShowChannels(!showChannels)}
                    className='cursor-pointer transition-all hover:text-stone-500'
                >
                    {category.name.toUpperCase()}
                </div>

                {isAdmin && <CreateChannelModal category={category} />}
            </div>

            {showChannels &&
                channels.map((channel) =>
                    channelTypeMap[channel.type]({
                        channel,
                        isAdmin,
                    }),
                )}
        </div>
    );
}
