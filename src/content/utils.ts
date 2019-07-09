export const parseLink = (link: string): [number, string] => {
    const gid = parseInt(link.split("/")[4]);
    const token = link.split("/")[5];
    return [gid, token];
};
