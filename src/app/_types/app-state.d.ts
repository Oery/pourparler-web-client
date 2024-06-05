import type { Session } from "lucia";
import type { User } from "~/app/_types/user";

export interface AppState {
    user?: User;
    session?: Session;
}
