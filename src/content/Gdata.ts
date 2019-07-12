export interface ResponseGdata {
    gid: number;
    token: string;
    title: string;
    title_jpn: string;
    uploader: string;
    posted: string;
    category: string;
    expunged: boolean;
    filecount: string;
    filesize: number;
    rating: string;
    thumb: string;
    tags: string[];
}

export interface Gdata {
    gid: number;
    token: string;
    title: string;
    title_jpn: string;
    uploader: string;
    posted: Date;
    category: string;
    expunged: boolean;
    filecount: number;
    filesize: number;
    rating: number;
    thumb: string;
    tags: Tag;
}

export interface Tag {
    translated: boolean;
    language: string | null;
    parody: string[];
    character: string[];
    group: string[];
    artist: string[];
    female: string[];
    male: string[];
    misc: string[];
    reclass: string[];
}
