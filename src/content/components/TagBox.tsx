import * as React from 'react';

import Tag from './Tag';

interface TagBoxProps {
    namespace: string;
    tags: string[];
}

const renderTags = (namespace: string, tags: string[]) => {
    return tags.map((tag: string) => {
        return <Tag namespace={namespace} content={tag} />
    });
}

export default ({ namespace, tags }: TagBoxProps): JSX.Element | null => {
    if (namespace === 'translated' || namespace === 'language') {
        return null;
    } else if (tags.length > 0) {
        return (
            <div key={namespace} className="modal__item__tags">
                <h1 className={"modal__item__tags--type " + namespace}>{namespace}</h1>
                <div className="modal__item__tags--box">
                    {renderTags(namespace, tags)}
                </div>
            </div>
        );
    } else {
        return null;
    }
}