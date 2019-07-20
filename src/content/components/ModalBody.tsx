import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import ImageLoader from './ImageLoader';
import MetaBox from './MetaBox';
import LanguageTag from './LanguageTag';
import PageButton from './PageButton';
import TagBox from './TagBox';
import TagNamespaceIcon from './TagNamespaceIcon';

import { Category } from '../Category';

import { Gdata } from "../Gdata";
import { TagSetting } from '../../TagSetting';

interface ModalBodyProps {
    gallery: Gdata;
    index: number;
    total: number;
    onPageChange: (index: number) => void;
}

interface TagSettings {
    upVote: TagSetting,
    downVote: TagSetting
}

export default ({ gallery, index, total, onPageChange }: ModalBodyProps) => {
    const [tagSettings, setTagSettings] = useState<TagSettings | null>(null);

    useEffect(() => {
        chrome.storage.sync.get(null, (list): void => {
            const upVote: TagSetting = list.upVote;
            const downVote: TagSetting = list.downVote;
            setTagSettings({ upVote, downVote });
        });
    }, []);

    const renderTagBox = useCallback(([namespace, tags]: [string, string[]]): JSX.Element | null => {
        if (tagSettings !== null) {
            return <TagBox namespace={namespace} tags={tags} setting={tagSettings} />
        } else return null;
    }, [tagSettings])

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