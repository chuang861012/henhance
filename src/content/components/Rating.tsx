import * as React from 'React'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faStar, fas } from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating';

library.add(far, fas, faStar);

export default ({ rating }) => {
    let color = '#ffe234';
    if (rating < 1) {
        color = '#ff4545';
    } else if (rating < 2) {
        color = '#ffa534';
    } else if (rating < 3) {
        color = '#ffe234';
    } else if (rating < 4) {
        color = '#b7dd29';
    } else {
        color = '#57e32c';
    }

    return (
        <div className="rater">
            <h3>{rating.toFixed(2)}</h3>
            <Rating initialRating={rating} readonly
                emptySymbol={<FontAwesomeIcon icon={['far', 'star']} color={color} size="xs" />}
                fullSymbol={<FontAwesomeIcon icon={['fas', 'star']} color={color} size="xs" />}
            />
        </div>

    )
};