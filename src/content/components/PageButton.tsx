import * as React from 'react';

interface PageButtonProps {
    page: number;
    total: number;
    symbol: string;
    handler: (index: number) => void;
}

export default ({ page, total, handler, symbol }: PageButtonProps): JSX.Element => {
    if (page >= 0 && page <= total - 1) {
        return (
            <div className="page_button" onClick={() => { handler(page) }}>{symbol}</div>
        )
    } else {
        return <div className="page_button disable">{symbol}</div>
    }
}