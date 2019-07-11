import * as React from 'react';

interface PageButtonProps {
    enable: boolean;
    symbol: string;
    handler?: React.EventHandler<React.MouseEvent>
}

export default ({ enable, handler, symbol }: PageButtonProps): JSX.Element => {
    const classNameString = enable ? "page_button" : "page_button disable";
    return <div className={classNameString} onClick={handler}>{symbol}</div>
}