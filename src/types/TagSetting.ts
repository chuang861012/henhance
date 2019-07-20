export interface TagSettings{
    upVote: TagSetting | undefined;
    downVote: TagSetting | undefined;
}

export interface TagSetting{
    artist: string[],
    character: string[],
    group: string[],
    male: string[],
    language: string[],
    parody: string[],
    reclass: string[],
    misc: string[],
    female: string[]
}
