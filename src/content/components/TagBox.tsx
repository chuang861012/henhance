import * as React from 'react';

import Tag from './Tag';
import TagNamespaceIcon from './TagNamespaceIcon';
import { TagSetting } from '../../TagSetting';

interface TagBoxProps {
    namespace: string;
    tags: string[];
    setting: { upVote: TagSetting, downVote: TagSetting };
}

const renderTags = (namespace: string, tags: string[], setting: { upVote: TagSetting, downVote: TagSetting }) => {
    return tags.map((tag: string) => {
        return <Tag namespace={namespace} content={tag} setting={setting} />
    });
}

export default ({ namespace, tags, setting }: TagBoxProps): JSX.Element | null => {
    if (namespace === 'translated' || namespace === 'language') {
        return null;
    } else if (tags.length > 0) {
        return (
            <div key={namespace} className="modal__item__tags">
                <h1 className="modal__item__tags--type ">
                    <TagNamespaceIcon namespace={namespace} />
                    {namespace}
                </h1>
                <div className="modal__item__tags--box">
                    {renderTags(namespace, tags, setting)}
                </div>
            </div>
        );
    } else {
        return null;
    }
}