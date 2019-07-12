import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTag, fas, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

import { TagSetting } from '../../TagSetting';

library.add(fas, faTag, faThumbsUp, faThumbsDown);

interface TagProps {
    namespace: string;
    content: string;
    setting: { upVote: TagSetting, downVote: TagSetting };
}

const renderTagIcon = (namespace: string, content: string, setting: { upVote: TagSetting, downVote: TagSetting }): JSX.Element => {
    if (setting.upVote[namespace].includes(content)) return <FontAwesomeIcon icon={['fas', 'thumbs-up']} size="xs" style={{ color: 'blue' }} />;
    else if (setting.downVote[namespace].includes(content)) return <FontAwesomeIcon icon={['fas', 'thumbs-down']} size="xs" style={{ color: 'red' }} />;
    else return <FontAwesomeIcon icon={['fas', 'tag']} size="xs" />;
}

export default ({ namespace, content, setting }: TagProps): JSX.Element => {
    return (
        <a className="tag" href={`https://${location.host}/tag/${namespace}:${content}`} target="_blank">
            {renderTagIcon(namespace, content, setting)} {content}
        </a>
    )
}