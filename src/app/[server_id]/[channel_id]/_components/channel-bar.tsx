import { type Channel } from "~/app/_types/channel";

interface Props {
    channel: Channel;
}

export default function ChannelBar({ channel }: Props) {
    return (
        <div className="mt-4 flex justify-between rounded-lg bg-stone-300">
            <h2 className="px-3 py-2">{channel.name}</h2>
        </div>
    );
}
