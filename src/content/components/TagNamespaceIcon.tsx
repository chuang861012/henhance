import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faLanguage, faEdit, faUser, faUsers, faMars, faVenus, faPaintBrush, faNetworkWired, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

library.add(fas, faLanguage, faEdit, faUser, faUsers, faMars, faVenus, faPaintBrush, faNetworkWired, faEllipsisH);

enum NamespaceIcons {
    artist = 'user',
    character = 'edit',
    group = 'users',
    male = 'mars',
    female = 'venus',
    language = 'language',
    parody = 'paint-brush',
    reclass = 'network-wired',
    misc = 'ellipsis-h'
}

interface TagNamespaceIconProps {
    namespace: string;
}

export default ({ namespace }: TagNamespaceIconProps): JSX.Element => {
    return <FontAwesomeIcon icon={['fas', NamespaceIcons[namespace]]} size="lg" style={{ marginRight: '0.5rem', width: '3rem' }} />;
}