import { Api } from "./Api";
import { parseLink, getLanguageIconLink } from "./utils";

export const init = async () => {
    const galleryTitleElements = document.querySelectorAll(".glink");
    const galleryIdentifiers: [number, string][] = [];

    // get all request data
    galleryTitleElements.forEach(
        (e: Element): void => {
            while (e.tagName !== "A" && e.parentElement !== null) {
                if (e.parentElement === null) break;
                e = e.parentElement;
            }
            galleryIdentifiers.push(parseLink(e.getAttribute("href")));
        }
    );

    // get all gallery data
    const pending = await Promise.all(Api.get(galleryIdentifiers));
    const gdata = pending.reduce((acc, val) => acc.concat(val), []);

    // add language flag
    for (let i = 0; i < galleryTitleElements.length; i++) {
        const language = gdata[i].tags.language || "japanese";
        const link: string | null = getLanguageIconLink(language);
        if (link) {
            const flagImage = document.createElement("img");
            flagImage.setAttribute("src", link);
            galleryTitleElements[i].prepend(flagImage);
        }
    }

    return gdata;
};
