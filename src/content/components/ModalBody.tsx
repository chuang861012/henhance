import * as React from 'react';

import ImageLoader from './ImageLoader';
import MetaBox from './MetaBox';
import LanguageTag from './LanguageTag';
import PageButton from './PageButton';
import Tag from './Tag';

import { Category } from '../Category';

import { Gdata } from "../Gdata";

interface ModalBodyProps {
    gallery: Gdata;
    index: number;
    total: number;
    onPageChange: (index: number) => void;
}

const renderTags = (namespace: string, tags: string[]) => {
    return tags.map((tag: string) => {
        return <Tag namespace={namespace} content={tag} />
    });
}

const renderTagBox = ([namespace, tags]: [string, string[]]): JSX.Element | null => {
    if (namespace === 'translated' || namespace === 'language') {
        return null;
    } else if (tags.length > 0) {
        return (
            <div key={namespace} className="modal__item__tags">
                <h1 className={"tag_type " + namespace}>{namespace}</h1>
                <div className="tag_box">
                    {renderTags(namespace, tags)}
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default ({ gallery, index, total, onPageChange }: ModalBodyProps): JSX.Element => {
    const language = gallery.tags.language || 'japanese';
    return (
        <div className="modal__container" style={{ backgroundColor: Category[gallery.category].l }}>
            <PageButton page={index - 1} total={total} symbol="❬" handler={onPageChange} />
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
                {Object.entries(gallery.tags).map(renderTagBox)}
            </div>
            <PageButton page={index + 1} total={total} symbol="❭" handler={onPageChange} />
        </div>
    );
}