import * as React from 'React';

interface MetaBoxProps {
    uploader: string;
    posted: Date;
    filecount: number;
}

const generateDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year} / ${month} / ${day}`;
}

const generateTimeString = (date: Date): string => {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
}

export default ({ uploader, posted, filecount }: MetaBoxProps): JSX.Element => {

    return (
        <div className="meta__box">
            <div className="meta__box__title">
                Uploader
            </div>
            <div className="meta__box__content">
                <a href={`https://exhentai.org/uploader/${uploader}`} target="_blank">{uploader}</a>
            </div>
            <div className="meta__box__title">
                Upload time
            </div>
            <div className="meta__box__content">
                {generateDateString(posted)}
                <br />
                {generateTimeString(posted)}
            </div>
            <div className="meta__box__title">
                Number of pages
            </div>
            <div className="meta__box__content">
                {filecount}
            </div>
        </div>
    )
};