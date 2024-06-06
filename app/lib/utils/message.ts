'use client';

export function formatMessage(message: string) {
    let content = replaceImageURLs(message);
    content = removeUselessNewlines(content);

    return content;
}

export function removeUselessNewlines(message: string) {
    return message.replace(/^\n+|\n+$/g, '');
}

function replaceImageURLs(message: string) {
    return message.replace(
        /\bhttps?:\/\/\S+\.(png|jpg|jpeg|gif|webp)\b/gi,
        (url) => `![](${url})`,
    );
}
