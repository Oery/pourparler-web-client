import whitelist from "./whitelist.json";

export function isWhitelisted(userId: string) {
    return Object.values(whitelist).includes(userId);
}
