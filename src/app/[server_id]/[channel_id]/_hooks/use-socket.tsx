"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react";
import { useDispatch } from "react-redux";
import { io, type Socket } from "socket.io-client";
import type { Channel, ChannelDelete } from "~/app/_types/channel";
import { addChannel, removeChannel } from "~/stores/servers";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socket = useMemo(() => io("127.0.0.1:8000"), []);
    const dispatch = useDispatch();

    const handleChannelDelete = useCallback(
        (data: ChannelDelete) => {
            console.log("received delete event:", data);
            dispatch(removeChannel(data));
        },
        [dispatch],
    );

    const handleChannelCreate = useCallback(
        (data: Channel) => {
            dispatch(addChannel(data));
        },
        [dispatch],
    );

    useEffect(() => {
        socket?.on("channel:create", handleChannelCreate);
        socket?.on("channel:delete", handleChannelDelete);

        return () => {
            socket?.off("channel:create");
            socket?.off("channel:delete");
        };
    }, [handleChannelCreate, handleChannelDelete, socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
