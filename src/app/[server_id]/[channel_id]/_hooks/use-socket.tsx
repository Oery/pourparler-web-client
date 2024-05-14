"use client";

import { createContext, useContext, useMemo } from "react";
import { io, type Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socket = useMemo(() => io("127.0.0.1:8000"), []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
