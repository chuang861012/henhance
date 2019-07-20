import * as React from 'react';

import ImageLoader from './ImageLoader';
import MetaBox from './MetaBox';
import LanguageTag from './LanguageTag';
import PageButton from './PageButton';
import TagBox from './TagBox';
import TagNamespaceIcon from './TagNamespaceIcon';

import { Category } from '../Category';

import { Gdata } from "../../types/Gdata";

interface ModalBodyProps {
    gallery: Gdata;
    index: number;
    total: number;
    onPageChange: (index: number) => void;
}

export default ({ gallery, index, total, onPageChange }: ModalBodyProps) => {
    const renderTagBox = ([namespace, tags]: [string, string[]]): JSX.Element | null => {
        return <TagBox namespace={namespace} tags={tags} />
    }

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
                    <h1 className="modal__item__tags--type">
                        <TagNamespaceIcon namespace="language" />
                        language
                        </h1>
                    <div className="modal__item__tags--box">
                        <LanguageTag language={language} />
                        {gallery.tags.translated ? <span className="tag"><span style={{ color: "blue", fontWeight: "bold" }}>&#10003;</span> translated</span> : ""}
                    </div>
                </div>
                {Object.entries(gallery.tags).map(renderTagBox)}
            </div>

            <PageButton page={index + 1} total={total} symbol="❭" handler={onPageChange} />

        </div>
    );
};