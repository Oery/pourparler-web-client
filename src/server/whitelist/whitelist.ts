import whitelist from "./whitelist.json";

export function isWhitelisted(userId: string) {
    return whitelist.includes(userId);
}
