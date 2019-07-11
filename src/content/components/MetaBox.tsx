import * as React from 'React';

interface MetaBoxProps {
    uploader: string;
    posted: Date;
    filecount: number;
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
                {`${posted.getFullYear()}/${posted.getMonth() + 1}/${posted.getDate()}`}
                <br />
                {`${posted.getHours()}:${posted.getMinutes()}`}
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