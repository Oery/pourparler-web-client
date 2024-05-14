import SideNav from "./_components/sidenav";
import { SocketProvider } from "./_hooks/use-socket";

interface Props {
    children: React.ReactNode;
    params: { server_id: string };
}

export default function ChannelLayout({ children, params }: Props) {
    return (
        <div className="flex h-screen w-screen flex-row overflow-y-hidden bg-stone-300">
            <SocketProvider>
                <SideNav serverId={params.server_id} />
                <main className="flex w-full flex-1 flex-col">
                    <div className="flex w-full grow flex-col rounded-tl-lg bg-stone-200 px-4">
                        {children}
                    </div>
                </main>
            </SocketProvider>
        </div>
    );
}
