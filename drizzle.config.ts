import { env } from './app/env';
import { type Config } from 'drizzle-kit';

export default {
    schema: './app/lib/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.POSTGRES_URL,
    },
    tablesFilter: ['pourparler_*'],
} satisfies Config;
