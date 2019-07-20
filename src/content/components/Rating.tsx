import * as React from 'React'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faStar, fas } from '@fortawesome/free-solid-svg-icons';
import Rating from 'react-rating';

library.add(far, fas, faStar);

interface RatingProps {
    rating: number;
}

const colors = ['#ff4545', '#ffa534', '#ffe234', '#b7dd29', '#57e32c', '#57e32c'];

export default ({ rating }: RatingProps): JSX.Element => {
    let color = colors[Math.floor(rating)];

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