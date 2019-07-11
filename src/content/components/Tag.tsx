import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTag, fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faTag);

interface TagProps {
    namespace: string;
    content: string;
}

export default ({ namespace, content }: TagProps): JSX.Element => {
    return (
        <a className="tag" href={`https://${location.host}/tag/${namespace}:${content}`} target="_blank">
            <FontAwesomeIcon icon={['fas', 'tag']} size="xs" /> {content}
        </a>
    )
}