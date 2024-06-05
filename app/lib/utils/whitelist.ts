import whitelist from "@data/whitelist.json";

export function isWhitelisted(userId: string) {
    return whitelist.includes(userId);
}
