import * as React from 'react';

import he from 'he';

import { Category } from '../Category';

import Rating from './Rating';

interface ModalTitleProps {
    title: string;
    rating: number;
    category: string;
}

export default ({ title, rating, category }: ModalTitleProps): JSX.Element => {
    return (
        <h1 className="modal__title" style={{ backgroundColor: Category[category].d }}>
            <span className="modal__title--text">{he.decode(title)}</span>
            <Rating rating={rating} />
        </h1>
    );
}