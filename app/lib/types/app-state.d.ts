import type { User } from '@lib/types/user';
import type { Session } from 'lucia';

export interface AppState {
    user?: User;
    session?: Session;
}
