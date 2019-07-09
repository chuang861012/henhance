export const parseLink = (link: string): [number, string] => {
    const gid = parseInt(link.split("/")[4]);
    const token = link.split("/")[5];
    return [gid, token];
};

export const addLoader = ()=>{
    const template = document.createRange().createContextualFragment(`<div class='load' id='load'><p>henhance loading...</p><div class='loader'></div></div>`);
    document.body.appendChild(template);
}