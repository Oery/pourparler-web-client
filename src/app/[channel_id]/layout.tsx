interface Props {
    children: React.ReactNode;
}

export default function ChannelLayout({ children }: Props) {
    return (
        <div className="flex h-screen w-screen flex-row overflow-y-hidden bg-stone-300">
            {children}
        </div>
    );
}
