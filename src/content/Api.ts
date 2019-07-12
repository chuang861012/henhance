import { ResponseGdata, Gdata, Tag } from "./Gdata";

export class Api {
    static get(data: [number, string][]): Promise<Gdata[]>[] {
        const pending: Promise<Gdata[]>[] = [];

        while (data.length > 0) {
            const reqData = data.splice(0, 25);
            const requestBody = {
                method: "gdata",
                gidlist: reqData,
                namespace: 1
            };

            pending.push(this.fetch(JSON.stringify(requestBody)));
        }

        return pending;
    }

    private static parseTags(tags: string[]): Tag {
        const tag: Tag = {
            translated: false,
            language: null,
            parody: [],
            character: [],
            group: [],
            artist: [],
            female: [],
            male: [],
            misc: [],
            reclass: []
        };

        tags.forEach(
            (item: string): void => {
                const tagArr = item.split(":");
                if (tagArr.length === 1) {
                    tag.misc.push(tagArr[0]);
                } else if (tagArr.length === 2) {
                    if (tagArr[0] === "language") {
                        if (tagArr[1] === "translated") {
                            tag.translated = true;
                        } else {
                            tag.language = tagArr[1];
                        }
                    } else {
                        tag[tagArr[0]].push(tagArr[1]);
                    }
                }
            }
        );

        return tag;
    }

    private static async fetch(requestBody: string): Promise<Gdata[]> {
        return fetch("https://api.e-hentai.org/api.php", {
            method: "post",
            body: requestBody
        })
            .then((res: Response): Promise<{ gmetadata: ResponseGdata[] }> => res.json())
            .then((res: { gmetadata: ResponseGdata[] }): ResponseGdata[] => res.gmetadata)
            .then(
                (res: ResponseGdata[]): Gdata[] => {
                    return res.map(
                        (data: ResponseGdata): Gdata => {
                            const postedDate = new Date(parseInt(data.posted) * 1000);
                            const temp = {
                                posted: postedDate,
                                filecount: parseInt(data.filecount),
                                rating: parseFloat(data.rating),
                                tags: this.parseTags(data.tags)
                            };
                            return Object.assign({}, data, temp);
                        }
                    );
                }
            );
    }
}
