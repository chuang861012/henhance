import * as React from 'react';
import { useContext } from 'react';

import TagSettingsContext from '../contexts/TagSettings';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTag, fas, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faTag, faThumbsUp, faThumbsDown);

interface TagProps {
    namespace: string;
    content: string;
}

const renderTagIcon = (namespace: string, content: string): JSX.Element => {
    const tagSettings = useContext(TagSettingsContext);
    if (tagSettings.upVote && tagSettings.downVote) {
        if (tagSettings.upVote[namespace].includes(content)) return <FontAwesomeIcon icon={['fas', 'thumbs-up']} size="xs" style={{ color: 'blue' }} />;
        else if (tagSettings.downVote[namespace].includes(content)) return <FontAwesomeIcon icon={['fas', 'thumbs-down']} size="xs" style={{ color: 'red' }} />;
    }
    return <FontAwesomeIcon icon={['fas', 'tag']} size="xs" />;
}

export default ({ namespace, content }: TagProps): JSX.Element => {
    return (
        <a className="tag" href={`https://${location.host}/tag/${namespace}:${content}`} target="_blank">
            {renderTagIcon(namespace, content)} {content}
        </a>
    )
}