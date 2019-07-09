import { Api } from "./Api";
import { lanIcon } from "./lanIcon";
import { parseLink } from "./utils";

export const init = async () => {
    const galleryTitleElements = document.querySelectorAll(".glink");
    const galleryIdentifiers: [number, string][] = [];

    // get all request data
    galleryTitleElements.forEach((e: Element) => {
        while (e.tagName !== "A" && e.parentElement !== null) {
            if (e.parentElement === null) break;
            e = e.parentElement;
        }
        galleryIdentifiers.push(parseLink(e.getAttribute("href")));
    });

    // get all gallery data
    const pending = await Promise.all(Api.get(galleryIdentifiers));
    const gdata = pending.reduce((acc, val) => acc.concat(val), []);

    // add language flag
    for (let i = 0; i < galleryTitleElements.length; i++) {
        const language = gdata[i].tags.language || "japanese";
        const flag = lanIcon[language];
        if (flag) {
            const flagImage = document.createElement("img");
            flagImage.setAttribute("src", lanIcon[language]);
            galleryTitleElements[i].prepend(flagImage);
        }
    }

    return gdata;
};
