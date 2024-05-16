import type { Server } from "~/app/_types/server";

// export default function isAdmin(server: Server, userId: string) {
//     const { ownerId } = server;
//     return ownerId === userId;
// }

export default function isAdmin() {
    return true;
}
