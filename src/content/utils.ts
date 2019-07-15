enum languages {
    japanese = "",
    korean = "",
    chinese = "",
    english = "",
    dutch = "",
    french = "",
    german = "",
    hungarian = "",
    italian = "",
    polish = "",
    portuguese = "",
    russian = "",
    spanish = "",
    thai = "",
    vietnamese = ""
}

export const parseLink = (link: string): [number, string] => {
    const gid = parseInt(link.split("/")[4]);
    const token = link.split("/")[5];
    return [gid, token];
};

export const addLoader = (): void => {
    const template = document
        .createRange()
        .createContextualFragment(
            `<div class='loader' id='loader'><p>henhance loading...</p><div class='loader__spinner'></div></div>`
        );
    document.body.appendChild(template);
};

export const getLanguageIconLink = (key: string): string | null => {
    if (key in languages) {
        return `chrome-extension://${chrome.runtime.id}/lanIcon/${key}.png`;
    }
    return null;
};
