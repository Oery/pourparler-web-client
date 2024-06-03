"use client";

export function removeUselessNewlines(message: string) {
    return message.replace(/^\n+|\n+$/g, "");
}
