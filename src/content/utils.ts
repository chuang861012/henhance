const lanIcon = {
    japanese: `chrome-extension://${chrome.runtime.id}/lanIcon/jp.png`,
    korean: `chrome-extension://${chrome.runtime.id}/lanIcon/kr.png`,
    chinese: `chrome-extension://${chrome.runtime.id}/lanIcon/cn.png`,
    english: `chrome-extension://${chrome.runtime.id}/lanIcon/en.png`,
    dutch: `chrome-extension://${chrome.runtime.id}/lanIcon/netherlands.png`,
    french: `chrome-extension://${chrome.runtime.id}/lanIcon/france.png`,
    german: `chrome-extension://${chrome.runtime.id}/lanIcon/germany.png`,
    hungarian: `chrome-extension://${chrome.runtime.id}/lanIcon/hungary.png`,
    italian: `chrome-extension://${chrome.runtime.id}/lanIcon/italy.png`,
    polish: `chrome-extension://${chrome.runtime.id}/lanIcon/poland.png`,
    portuguese: `chrome-extension://${chrome.runtime.id}/lanIcon/portugal.png`,
    russian: `chrome-extension://${chrome.runtime.id}/lanIcon/russia.png`,
    spanish: `chrome-extension://${chrome.runtime.id}/lanIcon/spain.png`,
    thai: `chrome-extension://${chrome.runtime.id}/lanIcon/thai.png`,
    vietnamese: `chrome-extension://${chrome.runtime.id}/lanIcon/vietnam.png`
};

export const parseLink = (link: string): [number, string] => {
    const gid = parseInt(link.split("/")[4]);
    const token = link.split("/")[5];
    return [gid, token];
};

export const addLoader = (): void => {
    const template = document
        .createRange()
        .createContextualFragment(
            `<div class='load' id='load'><p>henhance loading...</p><div class='loader'></div></div>`
        );
    document.body.appendChild(template);
};

export const getLanguageIconLink = (key: string): string | null => lanIcon[key] || null;
