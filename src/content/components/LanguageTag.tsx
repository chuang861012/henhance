import * as React from 'React'
import { getLanguageIconLink } from '../utils';

interface LanguageTagProps {
    language: string;
}

export default ({ language }: LanguageTagProps): JSX.Element => {
    const imgLink = getLanguageIconLink(language);
    if (imgLink) {
        return <span className="tag"><img src={imgLink} alt="language" /> {language}</span>
    } else {
        return <noscript></noscript>
    }
}