import * as React from 'React'

export default ({ uploader, posted, filecount }) => {

    return (
        <div className="meta__box">
            <div className="meta__title">
                Uploader
            </div>
            <div className="meta__content">
                <a href={`https://exhentai.org/uploader/${uploader}`} target="_blank">{uploader}</a>
            </div>
            <div className="meta__title">
                Upload time
            </div>
            <div className="meta__content">
                {`${posted.getFullYear()}/${posted.getMonth() + 1}/${posted.getDate()}`}
                <br />
                {`${posted.getHours()}:${posted.getMinutes()}`}
            </div>
            <div className="meta__title">
                Number of pages
            </div>
            <div className="meta__content">
                {filecount}
            </div>
        </div>
    )
};