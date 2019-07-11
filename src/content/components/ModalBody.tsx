import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTag, fas } from '@fortawesome/free-solid-svg-icons';

import ImageLoader from './ImageLoader';
import MetaBox from './MetaBox';
import LanguageTag from './LanguageTag';
import PageButton from './PageButton';

import { Category } from '../Category';

import { Gdata } from "../Gdata";

library.add(fas, faTag);

interface ModalBodyProps {
    gallery: Gdata;
    index: number;
    total: number;
    onPageChange: (index: number) => void;
}

const renderTags = (key: string, gallery: Gdata): JSX.Element => {
    const currentTags = gallery.tags[key];
    if (key === 'translated' || key === 'language') {
        return <noscript></noscript>;
    } else if (currentTags.length > 0) {
        return (
            <div key={key} className="modal__item__tags">
                <h1 className={"tag_type " + key}>{key}</h1>
                <div className="tag_box">
                    {gallery.tags[key].map((tag: string) => {
                        return (
                            <a className="tag" key={tag} href={`https://${location.host}/tag/${key}:${tag}`} target="_blank">
                                <FontAwesomeIcon icon={['fas', 'tag']} size="xs" /> {tag}
                            </a>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
}

const renderPageButton = (page: number, total: number, symbol: string, handler: (index: number) => void): JSX.Element => {
    if (page >= 0 && page <= total - 1) {
        return (
            <PageButton handler={() => handler(page)}  enable={true} symbol={symbol}></PageButton>
        )
    } else {
        return <PageButton  enable={false} symbol={symbol}></PageButton>
    }
}

export default ({ gallery, index, total, onPageChange }: ModalBodyProps): JSX.Element => {
    const language = gallery.tags.language || 'japanese';
    return (
        <div className="modal__container" style={{ backgroundColor: Category[gallery.category].l }}>
            {renderPageButton(index - 1, total, "❬", onPageChange)}
            <div className="modal__item" style={{ maxWidth: "200px" }}>
                <ImageLoader src={gallery.thumb} />
                <MetaBox uploader={gallery.uploader} filecount={gallery.filecount} posted={gallery.posted} />
            </div>
            <div className="modal__item" style={{ flex: 1 }}>
                <div className="modal__item__tags">
                    <h1 className={"tag_type language"}>language</h1>
                    <div className="tag_box">
                        <LanguageTag language={language} />
                        {gallery.tags.translated ? <span className="tag"><span style={{ color: "blue", fontWeight: "bold" }}>&#10003;</span> translated</span> : ""}
                    </div>
                </div>
                {Object.keys(gallery.tags).map((key: string): JSX.Element => renderTags(key, gallery))}
            </div>
            {renderPageButton(index + 1, total, "❭", onPageChange)}
        </div>
    );
}