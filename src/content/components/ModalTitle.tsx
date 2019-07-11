import * as React from 'react';

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
            <span>{title}</span>
            <Rating rating={rating} />
        </h1>
    );
}