import SideNav from "~/app/components/app/sidenav";
import { SocketProvider } from "~/app/context/use-socket";

interface Props {
    children: React.ReactNode;
    params: { server_id: string };
}

export default function ChannelLayout({ children, params }: Props) {
    return (
        <div className="flex flex-row bg-stone-300">
            <SocketProvider>
                <SideNav serverId={params.server_id} />
                <main className="flex grow flex-col rounded-tl-lg bg-stone-200 px-4">
                    {children}
                </main>
            </SocketProvider>
        </div>
    );
}
