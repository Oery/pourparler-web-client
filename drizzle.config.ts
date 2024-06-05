import { env } from './app/env';
import { type Config } from 'drizzle-kit';

export default {
    schema: '@lib/db/schema',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.POSTGRES_URL,
    },
    tablesFilter: ['pourparler_*'],
} satisfies Config;
