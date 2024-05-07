import HashIcon from "./icon-hash";
import MicIcon from "./icon-mic";

interface Props {
    channel: {
        id: number;
        name: string;
        type: "text" | "voice";
    };
}

export default function Channel({ channel }: Props) {
    return (
        <div className="flex cursor-pointer items-center gap-3 truncate rounded-md px-4 py-1 text-base font-light transition-all hover:translate-x-2 hover:bg-stone-200">
            {channel.type === "voice" ? (
                <MicIcon className="inline-block h-4 min-h-4 w-4 min-w-4" />
            ) : (
                <HashIcon className="inline-block h-4 min-h-4 w-4 min-w-4" />
            )}
            {channel.name}
        </div>
    );
}
