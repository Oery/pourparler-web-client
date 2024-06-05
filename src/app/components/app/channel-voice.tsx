import type { Channel, VoiceChannel } from "~/app/_types/channel";
import ChannelContextMenu from "../context-menus/channel-cm";
import MicIcon from "./icon-mic";
import { useDispatch, useSelector } from "react-redux";
import {
    userLeftVoiceChannel,
    userJoinedVoiceChannel,
} from "~/stores/channels";
import { membersSelector } from "~/stores/members";
import { appStateSelector } from "~/stores/app-state";

interface Props {
    channel: Channel;
    isAdmin: boolean;
}

export default function VoiceChannel({ channel, isAdmin }: Props) {
    const styles =
        "flex cursor-pointer items-center gap-3 truncate rounded-md px-4 py-1 text-base font-light transition-all hover:translate-x-2 hover:bg-stone-200";

    const { user } = useSelector(appStateSelector);
    const dispatch = useDispatch();

    const members = useSelector(membersSelector);

    const handleJoin = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        if (!user) return;

        if (channel?.users?.find((userId) => userId === user.id)) {
            console.log("Leaving voice channel");
            dispatch(
                userLeftVoiceChannel({
                    channelId: channel.id,
                    userId: user.id,
                }),
            );
        } else {
            console.log("Joining voice channel");
            dispatch(
                userJoinedVoiceChannel({
                    channelId: channel.id,
                    userId: user.id,
                }),
            );
        }
    };

    return (
        <ChannelContextMenu channel={channel} isAdmin={isAdmin}>
            <div className={styles} onClick={handleJoin}>
                <MicIcon className="inline-block h-4 min-h-4 w-4 min-w-4" />
                {channel.name}
            </div>
            {channel?.users?.map((userId) => {
                const member = members.find((member) => member.id === userId);
                if (!member) return null;
                return (
                    <div
                        key={userId}
                        className="flex items-center gap-2 truncate"
                    >
                        <img
                            className="h-10 min-w-10 rounded-full"
                            src={member.avatarUrl}
                            alt={member.displayName}
                            width={10}
                            height={10}
                        />
                        <div>{member.displayName}</div>
                    </div>
                );
            })}
        </ChannelContextMenu>
    );
}
