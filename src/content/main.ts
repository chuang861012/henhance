import { Api } from "./Api";
import { lanIcon } from "./lanIcon";

(async () => {
    const galleryTitleElements = document.querySelectorAll(".glink");

    const galleryIdentifiers: [number, string][] = [];

    galleryTitleElements.forEach((e: Element) => {
        while(e.tagName !== 'A'){
            e = e.parentElement;
        }
        const parsedLinkArr = e.getAttribute("href").split("/");
        galleryIdentifiers.push([parseInt(parsedLinkArr[4]), parsedLinkArr[5]]);
    });

    const pending = await Promise.all(Api.get(galleryIdentifiers));
    const gdata = pending.reduce((acc, val) => acc.concat(val), []);

    for (let i = 0; i < galleryTitleElements.length; i++) {
        const flagImage = document.createElement("img");
        const language = gdata[i].tags.language || 'jp';
        flagImage.setAttribute("src", lanIcon[language]);
        galleryTitleElements[i].prepend(flagImage);
    }

    console.log(gdata);
})();
